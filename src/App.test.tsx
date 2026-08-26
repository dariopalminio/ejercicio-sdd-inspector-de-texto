import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main text input area', () => {
  render(<App />);
  const textarea = screen.getByRole('textbox', { name: /documento de entrada/i });
  expect(textarea).toBeInTheDocument();
});
