import { render, screen } from '@testing-library/react';
import { MainContent } from './MainContent';

const emptyMetrics = { words: 0, characters: 0, lines: 0 };

describe('MainContent accessibility', () => {
  it('renders the text area and clear button reachable in a logical tab order', () => {
    render(
      <MainContent content="" onChange={() => {}} onClear={() => {}} metrics={emptyMetrics} />
    );

    const textarea = screen.getByRole('textbox', { name: /documento de entrada/i });
    const clearButton = screen.getByRole('button', { name: /vaciar/i });

    expect(textarea).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(
      textarea.compareDocumentPosition(clearButton) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('exposes an accessible name for the text area and the clear action', () => {
    render(
      <MainContent content="" onChange={() => {}} onClear={() => {}} metrics={emptyMetrics} />
    );

    expect(screen.getByRole('textbox', { name: /documento de entrada/i })).toHaveAccessibleName();
    expect(screen.getByRole('button', { name: /vaciar/i })).toHaveAccessibleName();
  });

  it('renders inside a main landmark', () => {
    render(
      <MainContent content="" onChange={() => {}} onClear={() => {}} metrics={emptyMetrics} />
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
