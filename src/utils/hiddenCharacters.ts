export type SecurityStatus = 'safe' | 'alert';

export interface SecurityReport {
  count: number;
  status: SecurityStatus;
}

// Alcance fijo confirmado en spec.md (Clarifications): zero-width space, BOM, y control ASCII
// U+0000-U+001F excluyendo tab/newline/carriage-return.
// eslint-disable-next-line no-control-regex
const HIDDEN_CHARACTERS_REGEX = /[\u200B\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

export function detectHiddenCharacters(content: string): SecurityReport {
  const matches = content.match(HIDDEN_CHARACTERS_REGEX);
  const count = matches ? matches.length : 0;

  return { count, status: count === 0 ? 'safe' : 'alert' };
}
