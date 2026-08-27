# UI Contract: Visualizador Overlay/Diff

## Surface

The existing `Documento de entrada` area gains a local problem-view control and an optional visual layer.
The source editor remains the only editable surface.

## Control contract

- Visible label: `Mostrar problemas` when the annotated layer is hidden.
- Visible label: `Ocultar problemas` when the annotated layer is visible.
- The control is always available, including when the document is clean.
- Its semantic state communicates whether the annotated layer is visible or hidden.
- It is keyboard operable and has a visible focus state.

## Overlay contract

- The layer is rendered only when the problem view is visible.
- It is visually aligned with the editable area and does not receive pointer or keyboard input.
- It preserves visible characters, spaces, line breaks, wrapping and scroll context.
- Each detected occurrence maps to exactly one textual badge:
  - `U+200B` -> `[ZWS]`
  - `U+FEFF` -> `[BOM]`
  - in-scope ASCII control -> `[CTRL]`
- Badge text and alert treatment remain understandable without color alone.
- A clean document exposes `Sin problemas` and no artifact badges.

## Data integrity contract

- Activating, updating or hiding the layer never changes the editor's source value.
- Metrics, limits, security report and sanitization continue to consume the source value.
- The layer reflects the current content after the existing approximately 150 ms analysis debounce.
- No network request or external service is involved in analysis or rendering.

## Responsive contract

- Desktop and mobile layouts preserve alignment between editor and layer.
- Multiline content remains line-aligned.
- Long content remains reviewable through the same scrolling context as the editor.
