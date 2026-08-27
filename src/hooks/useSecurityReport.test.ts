import { act, renderHook } from '@testing-library/react';
import { useSecurityReport } from './useSecurityReport';

describe('useSecurityReport', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns safe/0 for empty content', () => {
    const { result } = renderHook(() => useSecurityReport(''));

    expect(result.current).toEqual({ count: 0, status: 'safe' });
  });

  it('does not update before the debounce delay elapses', () => {
    const { result, rerender } = renderHook(({ content }) => useSecurityReport(content), {
      initialProps: { content: '' },
    });

    rerender({ content: 'a\u200Bb' });

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toEqual({ count: 0, status: 'safe' });
  });

  it('recalculates after the ~150ms debounce delay', () => {
    const { result, rerender } = renderHook(({ content }) => useSecurityReport(content), {
      initialProps: { content: '' },
    });

    rerender({ content: 'a\u200Bb' });

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toEqual({ count: 1, status: 'alert' });
  });
});
