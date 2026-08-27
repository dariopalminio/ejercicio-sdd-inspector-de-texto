import { LimitStatusValue } from '../../utils/limitStatus';

interface LimitProgressProps {
  percentage: number;
  status: LimitStatusValue;
}

// Barra de progreso + mensaje de estado (FR-021/FR-022); el texto nunca depende solo del color (SC-012).
export function LimitProgress({ percentage, status }: LimitProgressProps) {
  const visualWidth = Math.min(percentage, 100);
  const isOver = status === 'over';

  return (
    <div className="flex flex-col gap-2">
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-800"
      >
        <div
          style={{ width: `${visualWidth}%` }}
          className={`h-full rounded-full ${isOver ? 'bg-amber-500' : 'bg-accent-500'}`}
        />
      </div>
      <p className={`text-sm font-medium ${isOver ? 'text-amber-400' : 'text-accent-400'}`}>
        {isOver ? 'Por encima del máximo' : 'Dentro del límite'} ({percentage}%)
      </p>
    </div>
  );
}
