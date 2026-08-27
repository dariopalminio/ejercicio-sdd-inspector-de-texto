import { classifyHiddenCharacter } from './hiddenCharacters';

export type AnnotatedSegment =
  | { kind: 'text'; value: string }
  | {
      kind: 'artifact';
      value: string;
      source: string;
      codePoint: string;
      index: number;
      artifactType: 'zws' | 'bom' | 'ctrl';
    };

export function annotateText(content: string): AnnotatedSegment[] {
  const segments: AnnotatedSegment[] = [];
  let textStart = 0;

  for (let index = 0; index < content.length; index += 1) {
    const source = content[index];
    const artifactType = classifyHiddenCharacter(source);

    if (!artifactType) {
      continue;
    }

    if (index > textStart) {
      segments.push({ kind: 'text', value: content.slice(textStart, index) });
    }

    const codePoint = `U+${source.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`;
    const value = artifactType === 'zws' ? '[ZWS]' : artifactType === 'bom' ? '[BOM]' : '[CTRL]';
    segments.push({ kind: 'artifact', value, source, codePoint, index, artifactType });
    textStart = index + 1;
  }

  if (textStart < content.length) {
    segments.push({ kind: 'text', value: content.slice(textStart) });
  }

  return segments;
}