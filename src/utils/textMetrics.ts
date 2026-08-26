export interface TextMetrics {
  words: number;
  characters: number;
  lines: number;
}

// Reglas de conteo confirmadas en spec.md (Clarifications) y data-model.md.
export function calculateTextMetrics(content: string): TextMetrics {
  const words = content.trim().length === 0 ? 0 : content.trim().split(/\s+/).length;
  const characters = content.length;

  let lines = 0;
  if (content !== '') {
    const segments = content.split('\n');
    // Un salto de línea final no agrega una línea vacía adicional (ver Clarifications de spec.md).
    if (segments.length > 1 && segments[segments.length - 1] === '') {
      segments.pop();
    }
    lines = segments.length;
  }

  return { words, characters, lines };
}
