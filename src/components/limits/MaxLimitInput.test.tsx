import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MaxLimitInput } from './MaxLimitInput';

describe('MaxLimitInput', () => {
  it('renders the current value', () => {
    render(<MaxLimitInput value={500} onChange={() => {}} />);

    expect(screen.getByRole('spinbutton', { name: /m[aá]x/i })).toHaveValue(500);
  });

  it('calls onChange with the raw input string on edit', async () => {
    const onChange = jest.fn();
    render(<MaxLimitInput value={500} onChange={onChange} />);

    const input = screen.getByRole('spinbutton', { name: /m[aá]x/i });
    await userEvent.clear(input);
    await userEvent.type(input, '10');

    expect(onChange).toHaveBeenLastCalledWith('10');
  });
});
