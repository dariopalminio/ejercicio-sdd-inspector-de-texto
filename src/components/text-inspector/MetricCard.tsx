interface MetricCardProps {
  label: string;
  value: number;
}

// Cuadro individual de métrica dentro del panel (FR-013).
export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-slate-700 bg-surface-950 px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
      <span className="text-2xl font-semibold text-accent-400">{value}</span>
    </div>
  );
}
