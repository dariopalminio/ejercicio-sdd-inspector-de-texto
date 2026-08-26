import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { TextInputArea } from './TextInputArea';

// Wrapper controlado para probar TextInputArea como componente controlado real.
function ControlledTextInputArea() {
  const [value, setValue] = useState('');
  return <TextInputArea value={value} onChange={setValue} />;
}

describe('TextInputArea', () => {
  it('shows typed characters in real time', async () => {
    render(<ControlledTextInputArea />);

    const textarea = screen.getByRole('textbox', { name: /documento de entrada/i });
    await userEvent.type(textarea, 'Hola mundo');

    expect(textarea).toHaveValue('Hola mundo');
  });

  it('inserts pasted multiline content preserving line breaks', async () => {
    render(<ControlledTextInputArea />);

    const textarea = screen.getByRole('textbox', { name: /documento de entrada/i });
    await userEvent.click(textarea);
    await userEvent.paste(textarea, 'línea uno\nlínea dos');

    expect(textarea).toHaveValue('línea uno\nlínea dos');
  });

  it('appends new content without losing existing text', async () => {
    render(<ControlledTextInputArea />);

    const textarea = screen.getByRole('textbox', { name: /documento de entrada/i });
    await userEvent.type(textarea, 'primero');
    await userEvent.type(textarea, ' segundo');

    expect(textarea).toHaveValue('primero segundo');
  });
});
