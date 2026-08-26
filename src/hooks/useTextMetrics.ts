import { useEffect, useState } from 'react';
import { calculateTextMetrics, TextMetrics } from '../utils/textMetrics';

const DEBOUNCE_MS = 150;

// Recalcula las métricas con debounce (~150ms) por RNF-03 de la constitución.
export function useTextMetrics(content: string): TextMetrics {
  const [metrics, setMetrics] = useState<TextMetrics>(() => calculateTextMetrics(content));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMetrics(calculateTextMetrics(content));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [content]);

  return metrics;
}
