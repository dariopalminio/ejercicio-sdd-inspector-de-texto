import { act, renderHook } from '@testing-library/react';
import { useSanitizeAndCopy } from './useSanitizeAndCopy';

// navigator.clipboard no está implementado en jsdom; se simula por prueba.
function mockClipboard(writeText: jest.Mock) {
  Object.assign(navigator, {
    clipboard: { writeText },
  });
}

describe('useSanitizeAndCopy', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('starts with status "idle"', () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const { result } = renderHook(() => useSanitizeAndCopy('hola', jest.fn()));

    expect(result.current.status).toBe('idle');
  });

  it('calls onSanitized with the sanitized text and writes it to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    const onSanitized = jest.fn();
    const { result } = renderHook(() => useSanitizeAndCopy('a\u200Bb', onSanitized));

    await act(async () => {
      await result.current.sanitizeAndCopy();
    });

    expect(onSanitized).toHaveBeenCalledWith('ab');
    expect(writeText).toHaveBeenCalledWith('ab');
  });

  it('sets status to "success" when the clipboard write resolves', async () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const { result } = renderHook(() => useSanitizeAndCopy('hola', jest.fn()));

    await act(async () => {
      await result.current.sanitizeAndCopy();
    });

    expect(result.current.status).toBe('success');
  });

  it('sets status to "error" when the clipboard write rejects', async () => {
    mockClipboard(jest.fn().mockRejectedValue(new Error('denied')));
    const { result } = renderHook(() => useSanitizeAndCopy('hola', jest.fn()));

    await act(async () => {
      await result.current.sanitizeAndCopy();
    });

    expect(result.current.status).toBe('error');
  });

  it('returns to "idle" after the auto-dismiss delay', async () => {
    mockClipboard(jest.fn().mockResolvedValue(undefined));
    const { result } = renderHook(() => useSanitizeAndCopy('hola', jest.fn()));

    await act(async () => {
      await result.current.sanitizeAndCopy();
    });
    expect(result.current.status).toBe('success');

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(result.current.status).toBe('idle');
  });
});
