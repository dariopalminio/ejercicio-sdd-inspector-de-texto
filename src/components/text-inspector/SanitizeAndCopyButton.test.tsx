import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SanitizeAndCopyButton } from './SanitizeAndCopyButton';

function mockClipboard(writeText: jest.Mock) {
  Object.assign(navigator, { clipboard: { writeText } });
}

describe('SanitizeAndCopyButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls onSanitized with the sanitized text when clicked', async () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const onSanitized = jest.fn();
    render(<SanitizeAndCopyButton content={'a\u200Bb'} onSanitized={onSanitized} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });

    expect(onSanitized).toHaveBeenCalledWith('ab');
  });

  it('completes without error for text with no hidden characters', async () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const onSanitized = jest.fn();
    render(<SanitizeAndCopyButton content="hola mundo" onSanitized={onSanitized} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });

    expect(onSanitized).toHaveBeenCalledWith('hola mundo');
  });

  it('completes without error for empty content', async () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const onSanitized = jest.fn();
    render(<SanitizeAndCopyButton content="" onSanitized={onSanitized} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });

    expect(onSanitized).toHaveBeenCalledWith('');
  });

  it('shows a success confirmation after a resolved clipboard write', async () => {
    jest.useFakeTimers();
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    render(<SanitizeAndCopyButton content="hola" onSanitized={jest.fn()} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });

    expect(screen.getByText(/copiado al portapapeles/i)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('shows an error message after a rejected clipboard write', async () => {
    jest.useFakeTimers();
    mockClipboard(jest.fn().mockRejectedValue(new Error('denied')));
    render(<SanitizeAndCopyButton content="hola" onSanitized={jest.fn()} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });

    expect(screen.getByText(/no se pudo copiar/i)).toBeInTheDocument();
    expect(screen.queryByText(/copiado al portapapeles/i)).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('dismisses the confirmation message automatically after the delay', async () => {
    jest.useFakeTimers();
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    render(<SanitizeAndCopyButton content="hola" onSanitized={jest.fn()} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /sanitizar y copiar/i }));
    });
    expect(screen.getByText(/copiado al portapapeles/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(screen.queryByText(/copiado al portapapeles/i)).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
