import { act, renderHook } from '@testing-library/react';
import { useTextMetrics } from './useTextMetrics';

describe('useTextMetrics', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns zeroed metrics for empty content', () => {
    const { result } = renderHook(() => useTextMetrics(''));

    expect(result.current).toEqual({ words: 0, characters: 0, lines: 0 });
  });

  it('does not update metrics before the debounce delay elapses', () => {
    const { result, rerender } = renderHook(({ content }) => useTextMetrics(content), {
      initialProps: { content: '' },
    });

    rerender({ content: 'hola mundo' });

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toEqual({ words: 0, characters: 0, lines: 0 });
  });

  it('recalculates metrics after the ~150ms debounce delay', () => {
    const { result, rerender } = renderHook(({ content }) => useTextMetrics(content), {
      initialProps: { content: '' },
    });

    rerender({ content: 'hola mundo' });

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toEqual({ words: 2, characters: 10, lines: 1 });
  });
});
