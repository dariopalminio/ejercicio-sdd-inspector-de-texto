import { act, renderHook } from '@testing-library/react';
import { useLimitConfig } from './useLimitConfig';

describe('useLimitConfig', () => {
  it('defaults to limitType "words" and maxValue 500', () => {
    const { result } = renderHook(() => useLimitConfig());

    expect(result.current.limitType).toBe('words');
    expect(result.current.maxValue).toBe(500);
  });

  it('updates limitType via setLimitType', () => {
    const { result } = renderHook(() => useLimitConfig());

    act(() => {
      result.current.setLimitType('characters');
    });

    expect(result.current.limitType).toBe('characters');
  });

  it('updates maxValue for a valid positive integer string', () => {
    const { result } = renderHook(() => useLimitConfig());

    act(() => {
      result.current.setMaxValue('10');
    });

    expect(result.current.maxValue).toBe(10);
  });

  it('ignores a negative value and keeps the last valid maxValue', () => {
    const { result } = renderHook(() => useLimitConfig());

    act(() => {
      result.current.setMaxValue('-5');
    });

    expect(result.current.maxValue).toBe(500);
  });

  it('ignores a non-numeric value and keeps the last valid maxValue', () => {
    const { result } = renderHook(() => useLimitConfig());

    act(() => {
      result.current.setMaxValue('abc');
    });

    expect(result.current.maxValue).toBe(500);
  });
});
