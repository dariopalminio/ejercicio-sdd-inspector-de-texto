# Data Model: Visualizador Overlay/Diff

## Overview

La feature no introduce datos persistentes. Trabaja con valores derivados en memoria a partir del contenido
actual del Documento de entrada y del reporte de seguridad existente.

## Entities

### AnnotatedSegment

Representa una unidad ordenada de la vista anotada.

| Field | Type | Required | Description |
|---|---|---:|---|
| `kind` | `text` o `artifact` | Sí | Distingue texto visible de una insignia. |
| `value` | string | Sí | Texto visible o etiqueta de la insignia. |
| `source` | string | Solo artifact | Carácter oculto original, no editable ni mostrado obligatoriamente. |
| `codePoint` | string | Solo artifact | Código Unicode complementario de la ocurrencia. |
| `index` | number | Solo artifact | Posición de la ocurrencia en el texto fuente. |
| `artifactType` | `zws`, `bom` o `ctrl` | Solo artifact | Clasificación canónica alineada con REQ-04. |

### ProblemBadge

Marcador visual derivado de un `AnnotatedSegment` de tipo `artifact`.

- `zws` produce la etiqueta visible `[ZWS]`.
- `bom` produce la etiqueta visible `[BOM]`.
- `ctrl` produce la etiqueta visible `[CTRL]`.
- Cada ocurrencia produce exactamente una insignia.
- El código Unicode exacto es información complementaria y nunca reemplaza la etiqueta visible común.

### ProblemViewState

Estado transitorio del overlay.

| Value | Meaning |
|---|---|
| `hidden` | El área editable se muestra sin capa anotada. |
| `visible` | La capa anotada está presente y refleja el texto analizado más reciente. |

## Relationships and invariants

- `AnnotatedSegment[]` conserva el orden completo del texto fuente.
- La concatenación de los segmentos de texto y el `source` de los artefactos reconstruye el contenido original exactamente.
- La vista nunca escribe en `content`; solo lo consume.
- El conjunto de artefactos debe coincidir con `detectHiddenCharacters` y `removeHiddenCharacters`.
- Tabulación, salto de línea, retorno de carro, DEL y otros caracteres fuera de REQ-04 no generan `ProblemBadge`.
- Si no hay artefactos, la vista visible contiene el estado textual `Sin problemas` y una lista de insignias vacía.
- `ProblemViewState` no se persiste y no altera métricas, límites, reporte de seguridad ni sanitización.

## State transitions

```text
hidden -- Mostrar problemas --> visible
visible -- Ocultar problemas --> hidden
visible -- cambio de content --> visible con segmentos recalculados
hidden -- cambio de content --> hidden; segmentos derivados se actualizan cuando corresponda
```
