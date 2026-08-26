# Implementation Plan: Panel de Métricas Dinámicas (FR-02)

**Branch**: `002-panel-metricas-dinamicas` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-panel-metricas-dinamicas/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Agregar, dentro de MAIN CONTENT, un panel de tres cuadros de métricas (palabras, caracteres incluyendo
espacios, líneas) que se recalculan en tiempo real a partir del "Documento de entrada" ya expuesto por
`useTextDocument()` (FR-01), aplicando un debounce de ~150ms para el cálculo. Además, se introduce el layout
compartido de página: un TOPBAR/HEADER con el nombre de la aplicación a la izquierda y un FOOTER con la
información de codificación de texto (UTF-8 por defecto), ambos envolviendo la región MAIN CONTENT existente
sin alterar su comportamiento de FR-01.

## Technical Context

**Language/Version**: TypeScript 4.9 sobre React 19 (create-react-app / react-scripts 5) — mismo stack que FR-01

**Primary Dependencies**: React 19, react-dom 19, Tailwind CSS (ya configurado en FR-01), Testing Library
(React, DOM, user-event v13), Jest (vía react-scripts test)

**Storage**: N/A (las métricas se derivan en memoria del `content` expuesto por `useTextDocument()`, sin
persistencia ni backend)

**Testing**: Jest + React Testing Library + `@testing-library/user-event` v13, ejecutados con
`npm test -- --watch=false`

**Target Platform**: Navegadores web modernos evergreen (desktop y mobile), sin backend

**Project Type**: Aplicación web de página única (frontend-only), mismo proyecto único que FR-01

**Performance Goals**: Reflejar las métricas recalculadas en menos de 1s tras escribir/pegar texto (SC-005);
recalcular con debounce de ~150ms para evitar bloqueos ante pegados extensos (RNF-03 de la constitución)

**Constraints**: 100% procesamiento local sin peticiones de red (heredado de FR-01/RNF-02); TOPBAR y FOOTER
deben permanecer visibles y sin cambios de contenido independientemente del texto (FR-017); los tres cuadros
de métricas deben estar dentro de MAIN CONTENT (FR-013)

**Scale/Scope**: Tres métricas derivadas de un único documento de texto de trabajo por sesión; layout
compartido (Topbar + Footer) a nivel de página, sin Sidebar (fuera de alcance de esta especificación)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Privacy by Default** — PASS. El cálculo de métricas es puramente local (funciones puras sobre
  `content`); no se agregan llamadas de red.
- **II. User-Visible Safety and Clarity** — PASS. Las tres métricas se muestran en cuadros claramente
  etiquetados (FR-013) y se actualizan de forma visible e inmediata (FR-014).
- **III. Test-First Verification** — PASS (planeado). Las tareas de implementación deberán incluir pruebas
  unitarias de la función de cálculo de métricas y pruebas de componente para el panel, Topbar y Footer.
- **IV. Accessibility and Inclusive Design** — PASS. Los cuadros de métricas, el Topbar y el Footer usan
  landmarks semánticos (`header`, `footer`) y texto descriptivo junto a los valores numéricos.
- **V. Simplicity and Maintainability** — PASS. El cálculo de métricas se extrae a una utilidad tipada
  reutilizable (`calculateTextMetrics`) y a un hook (`useTextMetrics`) en vez de embeberse en componentes de
  UI, siguiendo el mismo patrón que `useTextDocument` de FR-01.
- **RNF-03 (Debouncing)** — PASS (planeado). El hook `useTextMetrics` aplicará un debounce de ~150ms antes de
  recalcular, conforme a la constitución y `docs/product-requirements.md`.

No se detectan violaciones que requieran justificación; la sección "Complexity Tracking" permanece vacía.

## Project Structure

### Documentation (this feature)

```text
specs/002-panel-metricas-dinamicas/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx        # Compone Topbar + <slot main content> + Footer
│   │   ├── Topbar.tsx           # TOPBAR/HEADER: nombre de la app a la izquierda
│   │   └── Footer.tsx           # FOOTER: información de codificación (UTF-8 por defecto)
│   └── text-inspector/
│       ├── MainContent.tsx      # (existente, FR-01) ahora también renderiza MetricsPanel
│       ├── TextInputArea.tsx    # (existente, FR-01, sin cambios)
│       ├── ClearTextButton.tsx  # (existente, FR-01, sin cambios)
│       ├── MetricsPanel.tsx     # Contenedor de los tres cuadros de métricas
│       └── MetricCard.tsx       # Cuadro individual reutilizable (etiqueta + valor)
├── hooks/
│   ├── useTextDocument.ts       # (existente, FR-01, sin cambios)
│   └── useTextMetrics.ts        # Deriva métricas de `content` con debounce ~150ms
├── utils/
│   └── textMetrics.ts           # Función pura calculateTextMetrics(content) -> {words, characters, lines}
├── pages/
│   └── InspectorPage.tsx        # Ahora envuelve MainContent con AppLayout (Topbar/Footer)
└── App.tsx                      # Sin cambios estructurales (sigue montando InspectorPage)

src/**/__tests__ o *.test.ts(x) colocados junto a cada archivo:
├── textMetrics.test.ts
├── useTextMetrics.test.ts
├── MetricsPanel.test.tsx
├── Topbar.test.tsx
└── Footer.test.tsx
```

**Structure Decision**: Se reutiliza el mismo proyecto único de frontend de FR-01. Se agrega `src/utils` para
lógica de cálculo pura (siguiendo AGENTS.md: "mantener la lógica de procesamiento de texto en funciones
auxiliares reutilizables"), y `src/components/layout` para los elementos de página compartidos (Topbar/Footer)
que son distintos de los componentes específicos del inspector de texto en `src/components/text-inspector`.
`MainContent.tsx` se extiende (no se reemplaza) para incluir `MetricsPanel`.

## Complexity Tracking

> No violations to justify — this section is intentionally empty.
