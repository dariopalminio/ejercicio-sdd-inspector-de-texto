# Phase 1 Data Model: Panel de Control de Límites (REQ-03)

## Entidad: Configuración de límite

Estado en memoria del navegador, gestionado por `useLimitConfig()`. No se persiste ni se envía a ningún
servicio externo.

| Campo | Tipo | Descripción | Reglas de validación |
|-------|------|-------------|-----------------------|
| `limitType` | `'words' \| 'characters' \| 'lines'` | Métrica actualmente controlada | Uno de los tres valores; por defecto `'words'` |
| `maxValue` | `number` | Valor máximo objetivo configurado | Entero positivo; una entrada negativa, cero directo del usuario, o no numérica NO reemplaza el último valor válido (FR-025); por defecto `500` |

## Entidad: Estado del límite

Valor **derivado** de `Configuración de límite` y de `Métricas de texto` (ver
`specs/002-panel-metricas-dinamicas/data-model.md`). Recalculado automáticamente; no tiene estado propio ni
persistencia.

| Campo | Tipo | Descripción | Reglas de cálculo |
|-------|------|-------------|--------------------|
| `percentage` | `number` | Porcentaje redondeado del valor actual respecto al máximo | `max <= 0 ? (value > 0 ? 100 : 0) : Math.round((value / max) * 100)` |
| `status` | `'within' \| 'over'` | Estado categórico del límite | `value <= max ? 'within' : 'over'` (FR-026: igual al máximo = `'within'`) |

Donde `value` es el valor de `Métricas de texto` correspondiente al `limitType` seleccionado (`words`,
`characters`, o `lines`).

### Relación con REQ-01 y REQ-02

- `Configuración de límite` es independiente de `Documento de entrada` (FR-01); no cambia cuando el usuario
  escribe o vacía el texto (ver Acceptance Scenario 4 de User Story 1 en `spec.md`).
- `Estado del límite` depende de `Métricas de texto` (REQ-02) y de `Configuración de límite`; se recalcula
  cada vez que cualquiera de los dos cambia.

## Contrato de estado (hook)

`useLimitConfig()` expone:

- `limitType: 'words' | 'characters' | 'lines'`
- `maxValue: number`
- `setLimitType(next: 'words' | 'characters' | 'lines'): void`
- `setMaxValue(rawInput: string): void` — valida internamente antes de actualizar (FR-025)
