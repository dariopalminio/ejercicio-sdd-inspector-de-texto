import { annotateText } from './annotatedText';

describe('annotateText', () => {
  it('creates one labelled segment for every supported artifact', () => {
    expect(annotateText('A\u200BB\uFEFFC\u0001D')).toEqual([
      { kind: 'text', value: 'A' },
      {
        kind: 'artifact',
        value: '[ZWS]',
        source: '\u200B',
        codePoint: 'U+200B',
        index: 1,
        artifactType: 'zws',
      },
      { kind: 'text', value: 'B' },
      {
        kind: 'artifact',
        value: '[BOM]',
        source: '\uFEFF',
        codePoint: 'U+FEFF',
        index: 3,
        artifactType: 'bom',
      },
      { kind: 'text', value: 'C' },
      {
        kind: 'artifact',
        value: '[CTRL]',
        source: '\u0001',
        codePoint: 'U+0001',
        index: 5,
        artifactType: 'ctrl',
      },
      { kind: 'text', value: 'D' },
    ]);
  });

  it('preserves excluded whitespace in text segments', () => {
    expect(annotateText('linea uno\nlinea dos\ttab')).toEqual([
      { kind: 'text', value: 'linea uno\nlinea dos\ttab' },
    ]);
  });
});