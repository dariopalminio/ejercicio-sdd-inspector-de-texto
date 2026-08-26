import { useTextMetrics } from '../../hooks/useTextMetrics';
import { MetricCard } from './MetricCard';

interface MetricsPanelProps {
  content: string;
}

// Panel de métricas dinámicas dentro de MAIN CONTENT (FR-010 a FR-014).
export function MetricsPanel({ content }: MetricsPanelProps) {
  const { words, characters, lines } = useTextMetrics(content);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <MetricCard label="Palabras" value={words} />
      <MetricCard label="Caracteres" value={characters} />
      <MetricCard label="Líneas" value={lines} />
    </div>
  );
}
