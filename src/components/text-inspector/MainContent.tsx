import { useRef } from 'react';
import { useTextDocument } from '../../hooks/useTextDocument';
import { TextInputArea } from './TextInputArea';
import { ClearTextButton } from './ClearTextButton';

// Región MAIN CONTENT: compone el área de texto y la acción de vaciar (FR-006, FR-007, FR-008).
export function MainContent() {
  const { content, setContent, clear } = useTextDocument();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleClear() {
    clear();
    textAreaRef.current?.focus();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-4 bg-surface-900 p-4 text-slate-100 sm:p-6 md:p-8">
      <h1 className="text-lg font-semibold text-slate-100 sm:text-xl">Documento de entrada</h1>
      <TextInputArea ref={textAreaRef} value={content} onChange={setContent} />
      <div className="flex justify-end">
        <ClearTextButton onClear={handleClear} />
      </div>
    </main>
  );
}
