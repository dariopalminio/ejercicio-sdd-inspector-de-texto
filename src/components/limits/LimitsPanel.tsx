import { useLimitConfig } from '../../hooks/useLimitConfig';
import { TextMetrics } from '../../utils/textMetrics';
import { calculateLimitStatus } from '../../utils/limitStatus';
import { LimitTypeSelector } from './LimitTypeSelector';
import { MaxLimitInput } from './MaxLimitInput';
import { LimitProgress } from './LimitProgress';

interface LimitsPanelProps {
  metrics: TextMetrics;
}

// Panel "Control de Límites" del SIDEBAR (FR-018 a FR-024, FR-026).
export function LimitsPanel({ metrics }: LimitsPanelProps) {
  const { limitType, maxValue, setLimitType, setMaxValue } = useLimitConfig();
  const currentValue = metrics[limitType];
  const { percentage, status } = calculateLimitStatus({ value: currentValue, max: maxValue });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Control de Límites
      </h2>
      <LimitTypeSelector value={limitType} onChange={setLimitType} />
      <MaxLimitInput value={maxValue} onChange={setMaxValue} />
      <LimitProgress percentage={percentage} status={status} />
    </div>
  );
}
