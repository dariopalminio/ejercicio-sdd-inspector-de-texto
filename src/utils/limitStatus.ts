export type LimitStatusValue = 'within' | 'over';

export interface LimitStatus {
  percentage: number;
  status: LimitStatusValue;
}

// Reglas confirmadas en data-model.md (redondeo entero; igual al máximo = 'within'; max<=0 per Edge Cases).
export function calculateLimitStatus({ value, max }: { value: number; max: number }): LimitStatus {
  const percentage = max <= 0 ? (value > 0 ? 100 : 0) : Math.round((value / max) * 100);
  const status: LimitStatusValue = value <= max ? 'within' : 'over';

  return { percentage, status };
}
