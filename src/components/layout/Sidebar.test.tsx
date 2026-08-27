import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders a complementary landmark wrapping its children', () => {
    render(
      <Sidebar>
        <p>Contenido lateral</p>
      </Sidebar>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByText('Contenido lateral')).toBeInTheDocument();
  });
});
