# Implementation Plan: Panel de Control de Límites (REQ-03)

**Branch**: `003-control-limites` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-control-limites/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Agregar un panel "Control de Límites" en una nueva región SIDEBAR (junto a MAIN CONTENT, según el layout de
`docs/product-requirements.md`), que permite elegir la métrica a limitar (Palabras/Caracteres/Líneas),
configurar un valor máximo objetivo, y ver una barra de progreso con porcentaje redondeado y un mensaje de
estado ("Dentro del límite"/"Por encima del máximo") que se recalculan en tiempo real. El panel reutiliza las
métricas ya calculadas por REQ-02 (`useTextMetrics`) sin duplicar la lógica de conteo, lo que requiere elevar
(`lift state up`) el estado del documento y de las métricas desde `MainContent` hacia `InspectorPage` para que
tanto MAIN CONTENT como el nuevo SIDEBAR puedan consumirlos.

## Technical Context

**Language/Version**: TypeScript 4.9 sobre React 19 (create-react-app / react-scripts 5) — mismo stack que
REQ-01/REQ-02

**Primary Dependencies**: React 19, react-dom 19, Tailwind CSS (ya configurado), Testing Library (React, DOM,
user-event v13), Jest (vía react-scripts test)

**Storage**: N/A (la configuración de límite vive en memoria del navegador durante la sesión, sin
persistencia ni backend)

**Testing**: Jest + React Testing Library + `@testing-library/user-event` v13, ejecutados con
`npm test -- --watch=false`

**Target Platform**: Navegadores web modernos evergreen (desktop y mobile), sin backend

**Project Type**: Aplicación web de página única (frontend-only), mismo proyecto único que REQ-01/REQ-02

**Performance Goals**: Reflejar el estado del límite (barra + mensaje) en menos de 1s tras un cambio de texto
o de configuración (SC-010); el cálculo del estado del límite es una función pura y barata, por lo que se
apoya en el mismo debounce de ~150ms ya aplicado por `useTextMetrics` (REQ-02) sin agregar un debounce
adicional

**Constraints**: 100% procesamiento local sin peticiones de red (heredado de REQ-01/REQ-02); el panel debe
vivir en SIDEBAR, visible junto a MAIN CONTENT en pantallas anchas y apilado debajo en móviles (NFR-05); un
valor máximo inválido (negativo o no numérico) NO debe reemplazar el último valor válido (FR-025)

**Scale/Scope**: Una única configuración de límite (tipo + valor máximo) por sesión de navegador; introduce
la región SIDEBAR del layout general, limitada a alojar únicamente el panel de Control de Límites (el panel
de seguridad del Sidebar queda fuera de alcance, ver Assumptions de `spec.md`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Privacy by Default** — PASS. La configuración y el estado del límite se calculan enteramente en el
  cliente; no se agregan llamadas de red.
- **II. User-Visible Safety and Clarity** — PASS. El estado del límite se comunica con un mensaje de texto
  explícito ("Dentro del límite"/"Por encima del máximo") además del color, cumpliendo SC-012.
- **III. Test-First Verification** — PASS (planeado). Las tareas de implementación deberán incluir pruebas
  unitarias de `calculateLimitStatus` y pruebas de componente para el selector, el input de máximo, la barra
  de progreso y el panel completo.
- **IV. Accessibility and Inclusive Design** — PASS. El grupo de botones de opción (radio buttons) y el input
  de máximo usan controles nativos (`<input type="radio">`, `<input type="number">`) con etiquetas asociadas;
  el estado nunca depende solo del color (FR-022, SC-012).
- **V. Simplicity and Maintainability** — PASS. El cálculo del estado del límite se extrae a una función pura
  `calculateLimitStatus` y la configuración a un hook `useLimitConfig`, siguiendo el mismo patrón que
  `calculateTextMetrics`/`useTextMetrics` de REQ-02, en vez de embeber la lógica en componentes de UI.

No se detectan violaciones que requieran justificación; la sección "Complexity Tracking" permanece vacía.

## Project Structure

### Documentation (this feature)

```text
specs/003-control-limites/
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
│   │   ├── AppLayout.tsx        # (existente) se extiende para aceptar un slot `sidebar` opcional y
│   │   │                         # componer MAIN CONTENT + SIDEBAR en fila (desktop) / columna (mobile)
│   │   ├── Sidebar.tsx          # Nuevo: región SIDEBAR, aloja el panel de Control de Límites
│   │   ├── Topbar.tsx           # (existente, sin cambios)
│   │   └── Footer.tsx           # (existente, sin cambios)
│   ├── limits/
│   │   ├── LimitsPanel.tsx      # Compone grupo de radio buttons + input de máximo + barra/estado
│   │   ├── LimitTypeSelector.tsx # Grupo de radio buttons Palabras/Caracteres/Líneas
│   │   ├── MaxLimitInput.tsx    # Input numérico del valor máximo objetivo
│   │   └── LimitProgress.tsx    # Barra de progreso + mensaje de estado
│   └── text-inspector/
│       ├── MainContent.tsx      # Refactor: recibe `content`/`onChange`/`onClear`/`metrics` como props
│       │                         # en vez de llamar useTextDocument/useTextMetrics internamente
│       ├── TextInputArea.tsx    # (existente, sin cambios)
│       ├── ClearTextButton.tsx  # (existente, sin cambios)
│       ├── MetricsPanel.tsx     # Refactor: recibe `metrics` como prop en vez de llamar useTextMetrics
│       └── MetricCard.tsx       # (existente, sin cambios)
├── hooks/
│   ├── useTextDocument.ts       # (existente, sin cambios en su API)
│   ├── useTextMetrics.ts        # (existente, sin cambios en su API)
│   └── useLimitConfig.ts        # Nuevo: estado de {limitType, maxValue} con validación (FR-025)
├── utils/
│   ├── textMetrics.ts           # (existente, sin cambios)
│   └── limitStatus.ts           # Nuevo: calculateLimitStatus({value, max}) -> {percentage, status}
├── pages/
│   └── InspectorPage.tsx        # Refactor: ahora posee useTextDocument()/useTextMetrics(), pasa props
│                                 # a MainContent y a LimitsPanel (vía Sidebar dentro de AppLayout)
└── App.tsx                      # Sin cambios estructurales

src/**/__tests__ o *.test.ts(x) colocados junto a cada archivo:
├── limitStatus.test.ts
├── useLimitConfig.test.ts
├── LimitTypeSelector.test.tsx
├── MaxLimitInput.test.tsx
├── LimitProgress.test.tsx
├── LimitsPanel.test.tsx
└── Sidebar.test.tsx
```

**Structure Decision**: Se reutiliza el mismo proyecto único de frontend de REQ-01/REQ-02. Se agrega
`src/components/limits` para los componentes específicos del panel de Control de Límites (paralelo a
`text-inspector/`), y `src/components/layout/Sidebar.tsx` para la nueva región de layout. El estado de
`useTextDocument`/`useTextMetrics` se eleva a `InspectorPage` para que tanto `MainContent` como `LimitsPanel`
lo consuman sin duplicar cálculos (FR-024), manteniendo la lógica de cálculo del límite en una función pura
(`limitStatus.ts`) y un hook de configuración (`useLimitConfig.ts`), consistente con el patrón ya usado en
REQ-02.

## Complexity Tracking

> No violations to justify — this section is intentionally empty.
