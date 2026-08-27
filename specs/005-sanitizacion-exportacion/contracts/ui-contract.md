# UI Contract: Acción "Sanitizar y Copiar" (REQ-05)

Sin API externa ni backend (más allá de la Clipboard API local del navegador); el "contrato" relevante es la
interfaz pública de la nueva función/hook/componente y la extensión de la utilidad existente de REQ-04.

## Utilidad pura `removeHiddenCharacters` (extiende `hiddenCharacters.ts`)

```ts
function removeHiddenCharacters(content: string): string;
```

Sin efectos secundarios; determinista. Usa la misma regex de alcance fijo que `detectHiddenCharacters`
(REQ-04) — ver [data-model.md](./../data-model.md).

## Hook `useSanitizeAndCopy(content, onSanitized)`

```ts
function useSanitizeAndCopy(
  content: string,
  onSanitized: (next: string) => void
): {
  status: 'idle' | 'success' | 'error';
  sanitizeAndCopy: () => Promise<void>;
};
```

**Comportamiento esperado**:

- Calcula `removeHiddenCharacters(content)` y llama a `onSanitized` con el resultado (FR-037).
- Intenta `navigator.clipboard.writeText(saneado)` (FR-038).
- En éxito: `status` pasa a `'success'`; en fallo: `status` pasa a `'error'` (FR-039/FR-040).
- Tras ~2500ms, `status` vuelve automáticamente a `'idle'` (Assumptions de `spec.md`).
- Funciona sin error tanto con texto vacío como con texto sin artefactos (FR-041).

## `<SanitizeAndCopyButton />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `content` | `string` | Sí | Documento de entrada actual sobre el que se sanea y copia |
| `onSanitized` | `(next: string) => void` | Sí | Actualiza el documento de entrada visible con el texto saneado |

**Comportamiento esperado**:

- Renderiza un `<button type="button">` con etiqueta "Sanitizar y Copiar".
- Usa internamente `useSanitizeAndCopy(content, onSanitized)`.
- Muestra un mensaje de texto junto al botón: confirmación de éxito cuando `status === 'success'`, mensaje de
  error cuando `status === 'error'`, y ningún mensaje cuando `status === 'idle'`.
