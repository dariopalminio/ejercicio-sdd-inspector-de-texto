import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClearTextButton } from './ClearTextButton';

describe('ClearTextButton', () => {
  it('calls onClear when clicked', async () => {
    const onClear = jest.fn();
    render(<ClearTextButton onClear={onClear} />);

    await userEvent.click(screen.getByRole('button', { name: /vaciar/i }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onClear when activated via keyboard (Enter)', async () => {
    const onClear = jest.fn();
    render(<ClearTextButton onClear={onClear} />);

    const button = screen.getByRole('button', { name: /vaciar/i });
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onClear when activated via keyboard (Space)', async () => {
    const onClear = jest.fn();
    render(<ClearTextButton onClear={onClear} />);

    const button = screen.getByRole('button', { name: /vaciar/i });
    button.focus();
    await userEvent.keyboard('[Space]');

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not throw when activated while already empty', async () => {
    const onClear = jest.fn();
    render(<ClearTextButton onClear={onClear} />);

    await userEvent.click(screen.getByRole('button', { name: /vaciar/i }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
