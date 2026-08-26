import { render, screen } from '@testing-library/react';
import { MetricsPanel } from './MetricsPanel';

describe('MetricsPanel', () => {
  it('shows 0/0/0 for empty content', () => {
    render(<MetricsPanel content="" />);

    expect(screen.getByText('Palabras')).toBeInTheDocument();
    expect(screen.getByText('Caracteres')).toBeInTheDocument();
    expect(screen.getByText('Líneas')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('shows the correct word, character, and line counts for representative input', () => {
    render(<MetricsPanel content={'hola mundo\ndesde aqui'} />);

    expect(screen.getByText('4')).toBeInTheDocument(); // palabras
    expect(screen.getByText('21')).toBeInTheDocument(); // caracteres
    expect(screen.getByText('2')).toBeInTheDocument(); // líneas
  });
});
