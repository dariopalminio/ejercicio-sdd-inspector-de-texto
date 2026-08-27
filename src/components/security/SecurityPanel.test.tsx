import { act, render, screen } from '@testing-library/react';
import { SecurityPanel } from './SecurityPanel';

describe('SecurityPanel', () => {
  it('shows a safe message with no detected characters for empty content', () => {
    render(<SecurityPanel content="" />);

    expect(screen.getByText('Inspector de Seguridad')).toBeInTheDocument();
    expect(screen.getByText(/texto seguro/i)).toBeInTheDocument();
  });

  it('shows the exact count for text containing hidden characters', () => {
    render(<SecurityPanel content={'a\u200Bb\u200Bc\uFEFF'} />);

    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('shows a "Texto seguro" message when there are no hidden characters', () => {
    render(<SecurityPanel content="Hola mundo" />);

    expect(screen.getByText(/texto seguro/i)).toBeInTheDocument();
  });

  it('shows an alert message including the exact count when hidden characters are found', () => {
    render(<SecurityPanel content={'a\u200Bb\u200Bc'} />);

    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.queryByText(/texto seguro/i)).not.toBeInTheDocument();
  });

  it('shows a safe message again after content is cleared', () => {
    jest.useFakeTimers();

    const { rerender } = render(<SecurityPanel content={'a\u200Bb'} />);

    expect(screen.getByText(/1/)).toBeInTheDocument();

    rerender(<SecurityPanel content="" />);
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(screen.getByText(/texto seguro/i)).toBeInTheDocument();

    jest.useRealTimers();
  });
});
