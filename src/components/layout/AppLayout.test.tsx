import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { AppLayout } from './AppLayout';

describe('AppLayout', () => {
  it('renders header and footer landmarks around its children', () => {
    render(
      <AppLayout>
        <p>Contenido de prueba</p>
      </AppLayout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('keeps header and footer content unchanged when the children content changes', async () => {
    function ChangingChildren() {
      const [text, setText] = useState('inicial');
      return (
        <AppLayout>
          <button type="button" onClick={() => setText('cambiado')}>
            {text}
          </button>
        </AppLayout>
      );
    }

    render(<ChangingChildren />);

    const headerTextBefore = screen.getByRole('banner').textContent;
    const footerTextBefore = screen.getByRole('contentinfo').textContent;

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('cambiado');
    expect(screen.getByRole('banner').textContent).toBe(headerTextBefore);
    expect(screen.getByRole('contentinfo').textContent).toBe(footerTextBefore);
  });
});
