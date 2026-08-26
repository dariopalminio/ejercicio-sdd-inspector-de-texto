import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders the given label and numeric value', () => {
    render(<MetricCard label="Palabras" value={42} />);

    expect(screen.getByText('Palabras')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
