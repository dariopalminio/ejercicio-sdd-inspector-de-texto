import { useCallback, useEffect, useRef, useState } from 'react';
import { removeHiddenCharacters } from '../utils/hiddenCharacters';

export type SanitizeCopyStatus = 'idle' | 'success' | 'error';

export interface UseSanitizeAndCopyResult {
  status: SanitizeCopyStatus;
  sanitizeAndCopy: () => Promise<void>;
}

const AUTO_DISMISS_MS = 2500;

// Sanea el texto, actualiza el documento visible, copia al portapapeles y auto-descarta el estado (FR-036 a FR-041).
export function useSanitizeAndCopy(
  content: string,
  onSanitized: (next: string) => void
): UseSanitizeAndCopyResult {
  const [status, setStatus] = useState<SanitizeCopyStatus>('idle');
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, []);

  const sanitizeAndCopy = useCallback(async () => {
    const sanitized = removeHiddenCharacters(content);
    onSanitized(sanitized);

    try {
      await navigator.clipboard.writeText(sanitized);
      setStatus('success');
    } catch {
      setStatus('error');
    }

    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }
    dismissTimeoutRef.current = setTimeout(() => {
      setStatus('idle');
    }, AUTO_DISMISS_MS);
  }, [content, onSanitized]);

  return { status, sanitizeAndCopy };
}
