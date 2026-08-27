# UI Contract: Panel de Control de Límites y Sidebar (REQ-03)

Sin API externa ni backend; el "contrato" relevante es la interfaz pública de los nuevos componentes/hooks y
las props que cambian en componentes existentes.

## Utilidad pura `calculateLimitStatus`

```ts
function calculateLimitStatus(input: { value: number; max: number }): {
  percentage: number; // entero, redondeado
  status: 'within' | 'over';
};
```

Sin efectos secundarios; determinista (ver reglas en [data-model.md](./../data-model.md)).

## Hook `useLimitConfig()`

Devuelve:

```ts
{
  limitType: 'words' | 'characters' | 'lines';
  maxValue: number;
  setLimitType: (next: 'words' | 'characters' | 'lines') => void;
  setMaxValue: (rawInput: string) => void; // ignora entradas inválidas (FR-025)
}
```

## `<LimitTypeSelector />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `value` | `'words' \| 'characters' \| 'lines'` | Sí | Tipo de límite actualmente seleccionado |
| `onChange` | `(next: 'words' \| 'characters' \| 'lines') => void` | Sí | Notifica el cambio de selección |

Renderiza un grupo de botones de opción (radio buttons, `role="radiogroup"`) accesible con las tres opciones
(Palabras, Caracteres, Líneas) visibles simultáneamente.

## `<MaxLimitInput />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `value` | `number` | Sí | Valor máximo actual |
| `onChange` | `(rawInput: string) => void` | Sí | Notifica cada cambio del campo (la validación ocurre en `useLimitConfig`) |

Renderiza un `<input type="number">` accesible, asociado a una etiqueta descriptiva.

## `<LimitProgress />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `percentage` | `number` | Sí | Porcentaje redondeado a mostrar (0–100+, visualmente capado a 100% en la barra) |
| `status` | `'within' \| 'over'` | Sí | Determina el mensaje y el color del indicador de estado |

Renderiza una barra de progreso (capada visualmente al 100%) y un mensaje de texto ("Dentro del
límite"/"Por encima del máximo") junto al porcentaje numérico, con color diferenciado por `status`.

## `<LimitsPanel />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `metrics` | `{ words: number; characters: number; lines: number }` | Sí | Métricas actuales del documento de entrada (de `useTextMetrics`, REQ-02) |

Compone internamente `useLimitConfig()`, `LimitTypeSelector`, `MaxLimitInput`, y `LimitProgress` (usando
`calculateLimitStatus` sobre el valor de `metrics` correspondiente al `limitType` seleccionado).

## `<Sidebar />`

Sin props requeridas en esta especificación más allá de `children: ReactNode`. Renderiza la región SIDEBAR
(landmark `<aside>`) que aloja `LimitsPanel`.

## `<AppLayout />` (props extendidas)

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | Sí | Contenido de MAIN CONTENT (sin cambios respecto a REQ-02) |
| `sidebar` | `React.ReactNode` | No | Contenido de SIDEBAR (nuevo); si se omite, no se renderiza `<aside>` |

## `<MainContent />` (props nuevas, antes sin props)

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `content` | `string` | Sí | Documento de entrada actual (elevado desde `InspectorPage`) |
| `onChange` | `(next: string) => void` | Sí | Actualiza el documento de entrada |
| `onClear` | `() => void` | Sí | Vacía el documento de entrada |
| `metrics` | `{ words: number; characters: number; lines: number }` | Sí | Métricas ya calculadas (evita recalcular con un segundo `useTextMetrics`) |
