import { useRef } from 'react';
import { TextInputArea } from './TextInputArea';
import { ClearTextButton } from './ClearTextButton';
import { MetricsPanel } from './MetricsPanel';
import { TextMetrics } from '../../utils/textMetrics';

interface MainContentProps {
  content: string;
  onChange: (next: string) => void;
  onClear: () => void;
  metrics: TextMetrics;
}

// Región MAIN CONTENT: compone el área de texto, la acción de vaciar y el panel de métricas (FR-006, FR-013).
export function MainContent({ content, onChange, onClear, metrics }: MainContentProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleClear() {
    onClear();
    textAreaRef.current?.focus();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-4 text-slate-100 sm:p-6 md:p-8">
      <h1 className="text-lg font-semibold text-slate-100 sm:text-xl">Documento de entrada</h1>
      <TextInputArea ref={textAreaRef} value={content} onChange={onChange} />
      <div className="flex justify-end">
        <ClearTextButton onClear={handleClear} />
      </div>
      <MetricsPanel metrics={metrics} />
    </main>
  );
}

