import { calculateTextMetrics } from './textMetrics';

describe('calculateTextMetrics', () => {
  it('returns zeroed metrics for an empty string', () => {
    expect(calculateTextMetrics('')).toEqual({ words: 0, characters: 0, lines: 0 });
  });

  it('counts a single word', () => {
    expect(calculateTextMetrics('hola')).toEqual({ words: 1, characters: 4, lines: 1 });
  });

  it('counts multiple words separated by single spaces', () => {
    expect(calculateTextMetrics('hola mundo desde aqui')).toEqual({
      words: 4,
      characters: 21,
      lines: 1,
    });
  });

  it('does not count extra words for multiple consecutive spaces', () => {
    expect(calculateTextMetrics('hola   mundo')).toEqual({
      words: 2,
      characters: 12,
      lines: 1,
    });
  });

  it('includes whitespace in the character count', () => {
    expect(calculateTextMetrics('ab cd')).toEqual({ words: 2, characters: 5, lines: 1 });
  });

  it('counts multiline text correctly', () => {
    expect(calculateTextMetrics('linea uno\nlinea dos\nlinea tres')).toEqual({
      words: 6,
      characters: 30,
      lines: 3,
    });
  });

  it('does not add an extra line for a trailing newline', () => {
    expect(calculateTextMetrics('a\nb\n')).toEqual({ words: 2, characters: 4, lines: 2 });
  });

  it('counts whitespace-only text as 0 words but includes the characters and lines', () => {
    expect(calculateTextMetrics('   \n  ')).toEqual({ words: 0, characters: 6, lines: 2 });
  });

  it('counts a single trailing space as a character but not a word', () => {
    expect(calculateTextMetrics('hola ')).toEqual({ words: 1, characters: 5, lines: 1 });
  });

  it('counts a single character', () => {
    expect(calculateTextMetrics('a')).toEqual({ words: 1, characters: 1, lines: 1 });
  });

  it('counts a very long single line as one line', () => {
    const longLine = 'palabra '.repeat(500).trim();
    const result = calculateTextMetrics(longLine);
    expect(result.words).toBe(500);
    expect(result.lines).toBe(1);
  });
});
