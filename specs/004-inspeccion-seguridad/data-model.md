# Phase 1 Data Model: Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

## Entidad: Reporte de seguridad

Valor **derivado** del `content` expuesto por `useTextDocument()` (REQ-01). Calculado en memoria; no se
persiste ni se envía a ningún servicio externo (FR-034).

| Campo | Tipo | Descripción | Reglas de cálculo |
|-------|------|-------------|--------------------|
| `count` | `number` | Número total de ocurrencias de caracteres ocultos/artefactos detectados | Suma de todas las coincidencias de la expresión regular de detección (ver [research.md](./research.md)) sobre `content`; cada ocurrencia individual cuenta por separado (edge case de `spec.md`) |
| `status` | `'safe' \| 'alert'` | Estado categórico del texto | `count === 0 ? 'safe' : 'alert'` (FR-029/FR-030) |

### Alcance de detección (confirmado en Clarifications de `spec.md`)

Se cuentan únicamente:

1. Zero-width space (`U+200B`)
2. BOM (`U+FEFF`)
3. Caracteres de control ASCII en el rango `U+0000–U+001F`, **excluyendo** tabulación (`U+0009`), salto de
   línea (`U+000A`) y retorno de carro (`U+000D`)

Explícitamente fuera de alcance: DEL (`U+007F`) y otros caracteres Unicode invisibles (ZWNJ, ZWJ, word
joiner, etc.).

### Relación con REQ-01

`Reporte de seguridad` depende únicamente de `Documento de entrada.content` (REQ-01); no introduce un nuevo
campo de estado independiente. Se recalcula automáticamente cada vez que `content` cambia (incluyendo al
vaciar, donde `content === ''` produce `{ count: 0, status: 'safe' }`).

### Estados / transiciones

No es una máquina de estados con historial; solo dos condiciones observables:

1. **Seguro** (`status === 'safe'`) — cuando `count === 0`.
2. **Alerta** (`status === 'alert'`) — cuando `count > 0`, mostrando siempre el valor exacto de `count`.

## Contrato de estado (hook)

`useSecurityReport(content: string)` expone:

- `count: number`
- `status: 'safe' | 'alert'`

Internamente aplica debounce (~150ms) sobre `detectHiddenCharacters(content)` (función pura en
`src/utils/hiddenCharacters.ts`) antes de actualizar los valores expuestos.
