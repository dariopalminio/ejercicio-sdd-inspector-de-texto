import { render, screen } from '@testing-library/react';
import { Topbar } from './Topbar';

describe('Topbar', () => {
  it('renders the application name within a header landmark', () => {
    render(<Topbar />);

    const header = screen.getByRole('banner');
    expect(header).toHaveTextContent('Inspector de Texto');
  });
});
