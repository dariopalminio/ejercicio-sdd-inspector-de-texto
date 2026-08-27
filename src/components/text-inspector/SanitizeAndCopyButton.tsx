import { useSanitizeAndCopy } from '../../hooks/useSanitizeAndCopy';

interface SanitizeAndCopyButtonProps {
  content: string;
  onSanitized: (next: string) => void;
}

// Acción "Sanitizar y Copiar" en MAIN CONTENT (FR-035 a FR-041).
export function SanitizeAndCopyButton({ content, onSanitized }: SanitizeAndCopyButtonProps) {
  const { status, sanitizeAndCopy } = useSanitizeAndCopy(content, onSanitized);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={sanitizeAndCopy}
        className="rounded-lg bg-accent-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
      >
        Sanitizar y Copiar
      </button>
      {status === 'success' && (
        <span className="text-sm font-medium text-accent-400">Copiado al portapapeles</span>
      )}
      {status === 'error' && (
        <span className="text-sm font-medium text-amber-400">
          No se pudo copiar al portapapeles
        </span>
      )}
    </div>
  );
}
