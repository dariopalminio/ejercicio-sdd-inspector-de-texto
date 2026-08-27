import { useCallback, useState } from 'react';

export type LimitType = 'words' | 'characters' | 'lines';

export interface UseLimitConfigResult {
  limitType: LimitType;
  maxValue: number;
  setLimitType: (next: LimitType) => void;
  setMaxValue: (rawInput: string) => void;
}

const DEFAULT_LIMIT_TYPE: LimitType = 'words';
const DEFAULT_MAX_VALUE = 500;

// Estado de la Configuración de límite (ver data-model.md); ignora entradas inválidas (FR-025).
export function useLimitConfig(): UseLimitConfigResult {
  const [limitType, setLimitType] = useState<LimitType>(DEFAULT_LIMIT_TYPE);
  const [maxValue, setMaxValueState] = useState(DEFAULT_MAX_VALUE);

  const setMaxValue = useCallback((rawInput: string) => {
    const parsed = Number(rawInput);
    if (Number.isInteger(parsed) && parsed > 0) {
      setMaxValueState(parsed);
    }
  }, []);

  return { limitType, maxValue, setLimitType, setMaxValue };
}
