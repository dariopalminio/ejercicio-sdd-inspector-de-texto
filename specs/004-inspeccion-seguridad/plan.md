# Implementation Plan: Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

**Branch**: `004-inspeccion-seguridad` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-inspeccion-seguridad/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Agregar un panel "Inspector de Seguridad" en el SIDEBAR (ya introducido por REQ-03), junto al panel de Control
de Límites, que escanea de forma continua y local el "Documento de entrada" (REQ-01) mediante expresiones
regulares para detectar tres tipos exactos de artefactos (zero-width space `\u200B`, BOM `\uFEFF`, y
caracteres de control ASCII `U+0000–U+001F` excluyendo `\t`/`\n`/`\r`), mostrando el conteo exacto y un
indicador de estado ("seguro" vs. alerta) que se recalculan con debounce (~150ms), siguiendo el mismo patrón
de función pura + hook ya usado en REQ-02/REQ-03.

## Technical Context

**Language/Version**: TypeScript 4.9 sobre React 19 (create-react-app / react-scripts 5) — mismo stack que
REQ-01/REQ-02/REQ-03

**Primary Dependencies**: React 19, react-dom 19, Tailwind CSS (ya configurado), Testing Library (React, DOM,
user-event v13), Jest (vía react-scripts test)

**Storage**: N/A (el reporte de seguridad se calcula en memoria a partir del `content` existente, sin
persistencia ni backend)

**Testing**: Jest + React Testing Library + `@testing-library/user-event` v13, ejecutados con
`npm test -- --watch=false`

**Target Platform**: Navegadores web modernos evergreen (desktop y mobile), sin backend

**Project Type**: Aplicación web de página única (frontend-only), mismo proyecto único que REQ-01/REQ-02/REQ-03

**Performance Goals**: Reflejar el conteo y el estado de seguridad en menos de 1s tras un cambio de texto
(SC-013); recalculo con debounce de ~150ms (NFR-03), consistente con `useTextMetrics`/`useLimitConfig`

**Constraints**: 100% procesamiento local sin peticiones de red (FR-034); alcance de detección fijo a los tres
tipos confirmados en `/speckit.clarify` (sin ampliar a otros caracteres invisibles); el indicador de estado
NUNCA debe depender únicamente del color (FR-031, SC-015)

**Scale/Scope**: Un único reporte de seguridad derivado del documento de entrada por sesión; se agrega un
segundo panel al SIDEBAR ya existente (junto al panel de Control de Límites de REQ-03), sin modificar su
comportamiento

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Privacy by Default** — PASS. El escaneo de caracteres ocultos es una función pura ejecutada en el
  cliente; no se agregan llamadas de red (FR-034).
- **II. User-Visible Safety and Clarity** — PASS. El estado "seguro"/"alerta" incluye siempre un mensaje de
  texto explícito junto con el conteo exacto (FR-030/FR-031, SC-015).
- **III. Test-First Verification** — PASS (planeado). Las tareas de implementación deberán incluir pruebas
  unitarias de la función de detección y pruebas de componente para el panel de seguridad.
- **IV. Accessibility and Inclusive Design** — PASS. El indicador de estado usa texto descriptivo además de
  color, y el panel se integra en la región SIDEBAR accesible ya existente.
- **V. Simplicity and Maintainability** — PASS. La detección se extrae a una función pura
  `detectHiddenCharacters` y un hook `useSecurityReport`, siguiendo el mismo patrón que
  `calculateTextMetrics`/`useTextMetrics` y `calculateLimitStatus`/`useLimitConfig` de REQ-02/REQ-03.
- **NFR-03 (Debouncing)** — PASS (planeado). `useSecurityReport` aplicará un debounce de ~150ms antes de
  recalcular, igual que `useTextMetrics`.

No se detectan violaciones que requieran justificación; la sección "Complexity Tracking" permanece vacía.

## Project Structure

### Documentation (this feature)

```text
specs/004-inspeccion-seguridad/
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
│   ├── layout/                  # (existente, sin cambios: AppLayout, Sidebar, Topbar, Footer)
│   ├── limits/                  # (existente, sin cambios: LimitsPanel y componentes de REQ-03)
│   ├── security/
│   │   └── SecurityPanel.tsx    # Nuevo: panel "Inspector de Seguridad", conteo + estado
│   └── text-inspector/          # (existente, sin cambios)
├── hooks/
│   ├── useTextDocument.ts       # (existente, sin cambios)
│   ├── useTextMetrics.ts        # (existente, sin cambios)
│   ├── useLimitConfig.ts        # (existente, sin cambios)
│   └── useSecurityReport.ts     # Nuevo: debounce (~150ms) + detectHiddenCharacters(content)
├── utils/
│   ├── textMetrics.ts           # (existente, sin cambios)
│   ├── limitStatus.ts           # (existente, sin cambios)
│   └── hiddenCharacters.ts      # Nuevo: detectHiddenCharacters(content) -> { count, status }
├── pages/
│   └── InspectorPage.tsx        # Refactor: agrega useSecurityReport(content) y `SecurityPanel` al Sidebar
└── App.tsx                      # Sin cambios estructurales

src/**/__tests__ o *.test.ts(x) colocados junto a cada archivo:
├── hiddenCharacters.test.ts
├── useSecurityReport.test.ts
└── SecurityPanel.test.tsx
```

**Structure Decision**: Se reutiliza el mismo proyecto único de frontend de REQ-01/REQ-02/REQ-03. Se agrega
`src/components/security` (paralelo a `limits/`) para el nuevo panel, sin modificar los componentes existentes
de `limits/` o `text-inspector/`. `InspectorPage` añade una segunda llamada a hook (`useSecurityReport`) junto
a las ya existentes (`useTextDocument`, `useTextMetrics`), y renderiza `SecurityPanel` como un segundo hijo
dentro del mismo `Sidebar` que ya aloja `LimitsPanel`.

## Complexity Tracking

> No violations to justify — this section is intentionally empty.
