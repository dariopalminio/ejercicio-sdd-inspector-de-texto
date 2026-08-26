import { useRef } from 'react';
import { useTextDocument } from '../../hooks/useTextDocument';
import { TextInputArea } from './TextInputArea';
import { ClearTextButton } from './ClearTextButton';
import { MetricsPanel } from './MetricsPanel';

// Región MAIN CONTENT: compone el área de texto, la acción de vaciar y el panel de métricas (FR-006, FR-013).
export function MainContent() {
  const { content, setContent, clear } = useTextDocument();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleClear() {
    clear();
    textAreaRef.current?.focus();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-4 text-slate-100 sm:p-6 md:p-8">
      <h1 className="text-lg font-semibold text-slate-100 sm:text-xl">Documento de entrada</h1>
      <TextInputArea ref={textAreaRef} value={content} onChange={setContent} />
      <div className="flex justify-end">
        <ClearTextButton onClear={handleClear} />
      </div>
      <MetricsPanel content={content} />
    </main>
  );
}

