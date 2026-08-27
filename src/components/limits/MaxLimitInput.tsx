interface MaxLimitInputProps {
  value: number;
  onChange: (rawInput: string) => void;
}

// Campo de valor m\u00e1ximo objetivo (FR-020); la validaci\u00f3n ocurre en useLimitConfig (FR-025).
export function MaxLimitInput({ value, onChange }: MaxLimitInputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-300">
      <span>Máx.</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-700 bg-surface-950 px-3 py-2 text-slate-100 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
      />
    </label>
  );
}
