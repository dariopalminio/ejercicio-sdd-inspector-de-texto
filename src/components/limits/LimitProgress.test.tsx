import { render, screen } from '@testing-library/react';
import { LimitProgress } from './LimitProgress';

describe('LimitProgress', () => {
  it('shows the rounded percentage and a "Dentro del límite" message when within the limit', () => {
    render(<LimitProgress percentage={40} status="within" />);

    expect(screen.getByText(/dentro del límite/i)).toBeInTheDocument();
    expect(screen.getByText(/40%/)).toBeInTheDocument();
  });

  it('shows a "Por encima del máximo" message when over the limit', () => {
    render(<LimitProgress percentage={150} status="over" />);

    expect(screen.getByText(/por encima del máximo/i)).toBeInTheDocument();
    expect(screen.getByText(/150%/)).toBeInTheDocument();
  });

  it('caps the visual progress bar width at 100% even when the percentage exceeds it', () => {
    render(<LimitProgress percentage={150} status="over" />);

    const bar = screen.getByRole('progressbar');
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill).toHaveStyle({ width: '100%' });
  });
});
