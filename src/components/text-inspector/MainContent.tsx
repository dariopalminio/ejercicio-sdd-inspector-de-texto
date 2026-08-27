import { useRef } from 'react';
import { TextInputArea } from './TextInputArea';
import { ClearTextButton } from './ClearTextButton';
import { MetricsPanel } from './MetricsPanel';
import { SanitizeAndCopyButton } from './SanitizeAndCopyButton';
import { ProblemOverlay } from './ProblemOverlay';
import { TextMetrics } from '../../utils/textMetrics';

interface MainContentProps {
  content: string;
  onChange: (next: string) => void;
  onClear: () => void;
  metrics: TextMetrics;
  problemViewVisible?: boolean;
  onToggleProblemView?: () => void;
}

// Región MAIN CONTENT: compone el área de texto, la acción de vaciar y el panel de métricas (FR-006, FR-013).
export function MainContent({
  content,
  onChange,
  onClear,
  metrics,
  problemViewVisible,
  onToggleProblemView = () => {},
}: MainContentProps) {
  problemViewVisible = problemViewVisible ?? false;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function handleClear() {
    onClear();
    textAreaRef.current?.focus();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-4 text-slate-100 sm:p-6 md:p-8">
      <h1 className="text-lg font-semibold text-slate-100 sm:text-xl">Documento de entrada</h1>
      <div className="relative min-h-[16rem] flex-1">
        <ProblemOverlay ref={overlayRef} content={content} visible={problemViewVisible} />
        <TextInputArea
          ref={textAreaRef}
          value={content}
          onChange={onChange}
          onScroll={() => {
            if (overlayRef.current && textAreaRef.current) {
              overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
              overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
            }
          }}
          className={problemViewVisible ? 'relative z-0 !bg-transparent text-transparent caret-accent-400' : undefined}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SanitizeAndCopyButton content={content} onSanitized={onChange} />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={problemViewVisible}
            onClick={onToggleProblemView}
            className="rounded-lg border border-slate-600 px-4 py-2 font-medium text-slate-200 transition hover:border-accent-400 hover:text-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            {problemViewVisible ? 'Ocultar problemas' : 'Mostrar problemas'}
          </button>
          <ClearTextButton onClear={handleClear} />
        </div>
      </div>
      <MetricsPanel metrics={metrics} />
    </main>
  );
}

