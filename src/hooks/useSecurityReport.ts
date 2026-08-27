import { useEffect, useState } from 'react';
import { detectHiddenCharacters, SecurityReport } from '../utils/hiddenCharacters';

const DEBOUNCE_MS = 150;

// Recalcula el reporte de seguridad con debounce (~150ms) por NFR-03 de la constitución.
export function useSecurityReport(content: string): SecurityReport {
  const [report, setReport] = useState<SecurityReport>(() => detectHiddenCharacters(content));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setReport(detectHiddenCharacters(content));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [content]);

  return report;
}
