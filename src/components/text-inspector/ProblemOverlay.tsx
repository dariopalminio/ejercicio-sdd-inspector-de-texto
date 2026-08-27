import { forwardRef } from 'react';
import { annotateText } from '../../utils/annotatedText';

interface ProblemOverlayProps {
  content: string;
  visible: boolean;
}

export const ProblemOverlay = forwardRef<HTMLDivElement, ProblemOverlayProps>(
  ({ content, visible }, ref) => {
    if (!visible) return null;

    const segments = annotateText(content);
    const hasArtifacts = segments.some((segment) => segment.kind === 'artifact');

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-transparent p-4 text-slate-100"
      >
        {!hasArtifacts && (
          <span className="mr-2 rounded border border-accent-400/60 bg-accent-400/10 px-1.5 py-0.5 text-xs font-semibold text-accent-300">
            Sin problemas
          </span>
        )}
        {segments.map((segment, segmentIndex) =>
          segment.kind === 'text' ? (
            <span key={`text-${segmentIndex}`}>{segment.value}</span>
          ) : (
            <span
              key={`artifact-${segment.index}`}
              title={segment.codePoint}
              className={`mx-0.5 inline-block rounded border px-1 py-0.5 align-baseline text-xs font-bold leading-none ${
                segment.artifactType === 'ctrl'
                  ? 'border-amber-400/70 bg-amber-400/20 text-amber-300'
                  : 'border-red-400/70 bg-red-400/20 text-red-300'
              }`}
            >
              {segment.value}
            </span>
          )
        )}
      </div>
    );
  }
);

ProblemOverlay.displayName = 'ProblemOverlay';