import { useCallback, useState } from 'react';

export interface UseTextDocumentResult {
  content: string;
  setContent: (next: string) => void;
  clear: () => void;
}

// Estado local del documento de entrada (texto de trabajo); ver data-model.md.
export function useTextDocument(): UseTextDocumentResult {
  const [content, setContent] = useState('');

  const clear = useCallback(() => {
    setContent('');
  }, []);

  return { content, setContent, clear };
}
