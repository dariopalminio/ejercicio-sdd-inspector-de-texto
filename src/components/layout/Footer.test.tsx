import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the text-encoding information within a footer landmark', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(/UTF-8/i);
  });
});
