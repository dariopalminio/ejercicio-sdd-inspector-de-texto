import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LimitsPanel } from './LimitsPanel';

describe('LimitsPanel', () => {
  it('recalculates the status when the selected metric value changes', () => {
    const { rerender } = render(
      <LimitsPanel metrics={{ words: 10, characters: 50, lines: 1 }} />
    );

    expect(screen.getByText(/dentro del límite/i)).toBeInTheDocument();

    rerender(<LimitsPanel metrics={{ words: 600, characters: 50, lines: 1 }} />);

    expect(screen.getByText(/por encima del máximo/i)).toBeInTheDocument();
  });

  it('recalculates the status when the limit type changes', async () => {
    render(<LimitsPanel metrics={{ words: 10, characters: 600, lines: 1 }} />);

    expect(screen.getByText(/dentro del límite/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('radio', { name: /caracteres/i }));

    expect(screen.getByText(/por encima del máximo/i)).toBeInTheDocument();
  });

  it('recalculates the status when the max value changes', async () => {
    render(<LimitsPanel metrics={{ words: 10, characters: 50, lines: 1 }} />);

    expect(screen.getByText(/dentro del límite/i)).toBeInTheDocument();

    const input = screen.getByRole('spinbutton', { name: /m[aá]x/i });
    await userEvent.clear(input);
    await userEvent.type(input, '5');

    expect(screen.getByText(/por encima del máximo/i)).toBeInTheDocument();
  });
});
