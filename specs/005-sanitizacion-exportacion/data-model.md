# Phase 1 Data Model: Sanitización y Exportación (REQ-05)

## Entidad: Texto saneado

Valor **derivado** de `Documento de entrada.content` (REQ-01), calculado en el momento en que se activa
"Sanitizar y Copiar". No es un estado independiente persistente: reemplaza el `content` existente mediante
`onSanitized` (ver [research.md](./research.md)).

| Campo | Tipo | Descripción | Reglas de cálculo |
|-------|------|-------------|--------------------|
| `sanitized` | `string` | Texto resultante tras remover los artefactos detectados | `removeHiddenCharacters(content)`, usando la misma regex de alcance fijo de REQ-04 |

## Entidad: Estado de la acción de copia

Estado transitorio de UI, gestionado por `useSanitizeAndCopy`. No se persiste; se reinicia automáticamente.

| Campo | Tipo | Descripción | Reglas |
|-------|------|-------------|--------|
| `status` | `'idle' \| 'success' \| 'error'` | Resultado visible de la última activación | `'idle'` por defecto; `'success'` tras una copia exitosa; `'error'` si `navigator.clipboard.writeText` falla; vuelve a `'idle'` automáticamente tras ~2500ms (ver Assumptions de `spec.md`) |

### Relación con REQ-01 y REQ-04

- `Texto saneado` depende de `Documento de entrada.content` (REQ-01) y de la misma regla de detección definida
  en `Reporte de seguridad` (REQ-04); no introduce un nuevo esquema de detección.
- Al aplicarse, `Texto saneado` **reemplaza** `Documento de entrada.content` (vía `onSanitized`/`setContent`),
  por lo que las métricas (REQ-02), el estado del límite (REQ-03), y el reporte de seguridad (REQ-04) se
  recalculan automáticamente a partir del nuevo `content`, sin cambios adicionales en esos módulos.

## Contrato de estado (hook)

`useSanitizeAndCopy(content: string, onSanitized: (next: string) => void)` expone:

- `status: 'idle' | 'success' | 'error'`
- `sanitizeAndCopy(): Promise<void>` — calcula el texto saneado, invoca `onSanitized`, intenta copiarlo al
  portapapeles, y actualiza `status` según el resultado (con auto-dismiss a `'idle'`).
