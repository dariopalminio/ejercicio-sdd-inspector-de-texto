import { detectHiddenCharacters, removeHiddenCharacters } from './hiddenCharacters';

describe('detectHiddenCharacters', () => {
  it('returns safe/0 for an empty string', () => {
    expect(detectHiddenCharacters('')).toEqual({ count: 0, status: 'safe' });
  });

  it('returns safe/0 for text with only printable characters', () => {
    expect(detectHiddenCharacters('Hola mundo, este es un texto normal.')).toEqual({
      count: 0,
      status: 'safe',
    });
  });

  it('counts zero-width spaces individually', () => {
    expect(detectHiddenCharacters('a\u200Bb\u200Bc')).toEqual({ count: 2, status: 'alert' });
  });

  it('counts a BOM character', () => {
    expect(detectHiddenCharacters('\uFEFFhola')).toEqual({ count: 1, status: 'alert' });
  });

  it('counts ASCII control characters', () => {
    expect(detectHiddenCharacters('a\u0000b\u001Fc')).toEqual({ count: 2, status: 'alert' });
  });

  it('does not count tab, newline, or carriage return as hidden characters', () => {
    expect(detectHiddenCharacters('linea uno\nlinea dos\ttab\rretorno')).toEqual({
      count: 0,
      status: 'safe',
    });
  });

  it('counts repeated occurrences of the same artifact separately', () => {
    expect(detectHiddenCharacters('\u200B\u200B\u200B')).toEqual({ count: 3, status: 'alert' });
  });

  it('sums mixed artifact types correctly', () => {
    expect(detectHiddenCharacters('\uFEFFa\u200Bb\u0001c')).toEqual({ count: 3, status: 'alert' });
  });
});

describe('removeHiddenCharacters', () => {
  it('strips zero-width spaces, BOM, and ASCII control characters', () => {
    expect(removeHiddenCharacters('\uFEFFa\u200Bb\u0001c')).toBe('abc');
  });

  it('leaves tab, newline, and carriage return untouched', () => {
    const input = 'linea uno\nlinea dos\ttab\rretorno';
    expect(removeHiddenCharacters(input)).toBe(input);
  });

  it('returns the input unchanged when there are no artifacts', () => {
    expect(removeHiddenCharacters('Hola mundo, este es un texto normal.')).toBe(
      'Hola mundo, este es un texto normal.'
    );
  });

  it('returns an empty string for empty input', () => {
    expect(removeHiddenCharacters('')).toBe('');
  });
});
