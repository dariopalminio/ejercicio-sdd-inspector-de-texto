import { renderHook, act } from '@testing-library/react';
import { useTextDocument } from './useTextDocument';

describe('useTextDocument', () => {
  it('starts with empty content', () => {
    const { result } = renderHook(() => useTextDocument());

    expect(result.current.content).toBe('');
  });

  it('updates content via setContent', () => {
    const { result } = renderHook(() => useTextDocument());

    act(() => {
      result.current.setContent('hola mundo');
    });

    expect(result.current.content).toBe('hola mundo');
  });

  it('resets content to empty string via clear', () => {
    const { result } = renderHook(() => useTextDocument());

    act(() => {
      result.current.setContent('algo de texto');
    });
    act(() => {
      result.current.clear();
    });

    expect(result.current.content).toBe('');
  });

  it('clearing an already-empty document does not throw and stays empty', () => {
    const { result } = renderHook(() => useTextDocument());

    expect(() => {
      act(() => {
        result.current.clear();
      });
    }).not.toThrow();
    expect(result.current.content).toBe('');
  });
});
