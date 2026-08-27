import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LimitTypeSelector } from './LimitTypeSelector';

describe('LimitTypeSelector', () => {
  it('renders the three limit type options simultaneously', () => {
    render(<LimitTypeSelector value="words" onChange={() => {}} />);

    expect(screen.getByRole('radio', { name: /palabras/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /caracteres/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /l[ií]neas/i })).toBeInTheDocument();
  });

  it('calls onChange with the selected value when a radio option is chosen', async () => {
    const onChange = jest.fn();
    render(<LimitTypeSelector value="words" onChange={onChange} />);

    await userEvent.click(screen.getByRole('radio', { name: /caracteres/i }));

    expect(onChange).toHaveBeenCalledWith('characters');
  });
});
