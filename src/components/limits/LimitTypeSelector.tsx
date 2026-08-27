import { LimitType } from '../../hooks/useLimitConfig';

interface LimitTypeSelectorProps {
  value: LimitType;
  onChange: (next: LimitType) => void;
}

const OPTIONS: { value: LimitType; label: string }[] = [
  { value: 'words', label: 'Palabras' },
  { value: 'characters', label: 'Caracteres' },
  { value: 'lines', label: 'Líneas' },
];

// Selector de la métrica a limitar, como grupo de radio buttons (FR-019).
export function LimitTypeSelector({ value, onChange }: LimitTypeSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-1 text-sm text-slate-300">
      <legend>Tipo de límite</legend>
      <div role="radiogroup" aria-label="Tipo de límite" className="flex flex-col gap-2">
        {OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center gap-2 text-slate-100">
            <input
              type="radio"
              name="limit-type"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 accent-accent-500"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
