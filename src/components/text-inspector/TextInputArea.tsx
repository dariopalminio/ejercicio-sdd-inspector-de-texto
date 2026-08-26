import { forwardRef } from 'react';

interface TextInputAreaProps {
  value: string;
  onChange: (next: string) => void;
  label?: string;
}

// Textarea controlado y accesible para el documento de entrada (FR-001/FR-002).
export const TextInputArea = forwardRef<HTMLTextAreaElement, TextInputAreaProps>(
  ({ value, onChange, label = 'Documento de entrada' }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full min-h-[16rem] w-full flex-1 resize-none rounded-lg border border-slate-700 bg-surface-950 p-4 text-slate-100 placeholder-slate-500 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
        placeholder="Escribe o pega tu texto aquí..."
      />
    );
  }
);

TextInputArea.displayName = 'TextInputArea';
