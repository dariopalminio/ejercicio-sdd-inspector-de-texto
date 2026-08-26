# UI Contract: Panel de Métricas y Layout Compartido (FR-02)

Sin API externa ni backend; el "contrato" relevante es la interfaz pública de los nuevos componentes/hooks.

## Utilidad pura `calculateTextMetrics`

```ts
function calculateTextMetrics(content: string): {
  words: number;
  characters: number;
  lines: number;
};
```

Sin efectos secundarios; determinista para el mismo `content` (ver reglas en
[data-model.md](./../data-model.md)).

## Hook `useTextMetrics(content: string)`

Devuelve `{ words: number; characters: number; lines: number }`, recalculado con debounce ~150ms cada vez que
`content` cambia.

## `<MetricsPanel />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `content` | `string` | Sí | Documento de entrada actual (de `useTextDocument()`) sobre el que se derivan las métricas |

Renderiza tres `<MetricCard />` (Palabras, Caracteres, Líneas) dentro de MAIN CONTENT, usando internamente
`useTextMetrics(content)`.

## `<MetricCard />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | Sí | Etiqueta de la métrica (p. ej. "Palabras") |
| `value` | `number` | Sí | Valor numérico actual de la métrica |

## `<Topbar />`

Sin props requeridas en esta especificación. Renderiza un `<header>` con el nombre de la aplicación
("Inspector de Texto") alineado a la izquierda.

## `<Footer />`

Sin props requeridas en esta especificación. Renderiza un `<footer>` con la información de codificación de
texto ("Codificación UTF-8").

## `<AppLayout />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | Sí | Contenido de la región MAIN CONTENT a envolver entre `Topbar` y `Footer` |

Compone `Topbar` + `children` + `Footer`. `InspectorPage` usa `AppLayout` para envolver `MainContent`.
