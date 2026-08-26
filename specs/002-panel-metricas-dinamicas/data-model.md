# Phase 1 Data Model: Panel de Métricas Dinámicas (FR-02)

## Entidad: Métricas de texto

Valor derivado, calculado en memoria a partir del `content` expuesto por `useTextDocument()` (FR-01). No se
persiste ni se envía a ningún servicio externo (RNF-02).

| Campo | Tipo | Descripción | Reglas de cálculo |
|-------|------|-------------|--------------------|
| `words` | `number` | Total de palabras del documento de entrada | Cuenta las secuencias continuas de caracteres no separadas por espacios en blanco (espacio, tabulación, salto de línea); espacios consecutivos no generan palabras adicionales; texto vacío = 0 |
| `characters` | `number` | Total de caracteres del documento de entrada, incluyendo espacios en blanco | Igual a la longitud del string `content` (`content.length`) |
| `lines` | `number` | Total de líneas del documento de entrada | Texto vacío = 0; en otro caso, número de segmentos resultantes de dividir `content` por `\n`, sin contar una línea vacía adicional por un salto de línea final (ver Clarifications de `spec.md`) |

### Relación con el Documento de entrada (FR-01)

`Métricas de texto` es un valor **derivado** de `Documento de entrada.content` (ver
`specs/001-entrada-gestion-texto/data-model.md`); no introduce un nuevo campo de estado independiente, solo una
transformación pura de solo lectura. Se recalcula automáticamente cada vez que `content` cambia (incluyendo al
vaciar, donde `content === ''` produce `{ words: 0, characters: 0, lines: 0 }`).

### Estados / transiciones

No es una entidad con estado propio ni persistencia; se recalcula íntegramente en cada cambio de `content`
tras el debounce de ~150ms. No existen transiciones parciales o intermedias observables por el usuario más
allá del valor final mostrado.

## Contrato de estado (hook)

`useTextMetrics(content: string)` expone:

- `words: number`
- `characters: number`
- `lines: number`

Internamente aplica debounce (~150ms) sobre `calculateTextMetrics(content)` (función pura en
`src/utils/textMetrics.ts`) antes de actualizar los valores expuestos.
