# Implementation Plan: Entrada y Gestión de Texto (FR-01)

**Branch**: `001-entrada-gestion-texto` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-entrada-gestion-texto/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Proveer, dentro de la región MAIN CONTENT de "Inspector de Texto", un área de texto principal editable para
ingresar o pegar texto libre y una acción explícita "Vaciar" que limpie de inmediato ese contenido. Ambos
controles se implementan como componentes React/TypeScript accesibles (roles/labels, operables por teclado),
con el estado del texto gestionado localmente en el navegador (sin red) mediante un hook reutilizable que
podrá ser consumido por especificaciones futuras (métricas, límites, seguridad). El estilo visual sigue el
tema oscuro premium mandado por `docs/product-requirements.md`, implementado con Tailwind CSS.

## Technical Context

**Language/Version**: TypeScript 4.9 sobre React 19 (create-react-app / react-scripts 5)

**Primary Dependencies**: React 19, react-dom 19, Tailwind CSS (a incorporar para el tema oscuro/paleta de la
especificación), Testing Library (React, DOM, user-event), Jest (vía react-scripts test)

**Storage**: N/A (el texto vive únicamente en memoria del cliente, sin persistencia ni backend)

**Testing**: Jest + React Testing Library + `@testing-library/user-event`, ejecutados con `npm test -- --watch=false`

**Target Platform**: Navegadores web modernos evergreen (desktop y mobile), sin dependencia de un backend

**Project Type**: Aplicación web de página única (frontend-only), estructura de proyecto único (no hay
"backend" ni "frontend" separados: todo vive bajo `src/`)

**Performance Goals**: Reflejar el texto ingresado/pegado en el área de trabajo en menos de 1s (SC-001); sin
bloqueos perceptibles de la interacción del usuario ante pegados de texto extensos (edge case de la spec)

**Constraints**: 100% procesamiento local sin peticiones de red (FR-009); controles totalmente operables por
teclado y compatibles con lectores de pantalla (FR-005, FR-008); diseño responsivo sin solapamientos en
distintos anchos de pantalla (FR-007, SC-004)

**Scale/Scope**: Un único documento de texto de trabajo por sesión de navegador; alcance limitado a la región
MAIN CONTENT (área de texto + botón de vaciar), excluyendo Topbar/Sidebar/Footer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Privacy by Default** — PASS. No se introduce ninguna llamada de red ni telemetría; el texto y su
  gestión permanecen 100% en el navegador (FR-009).
- **II. User-Visible Safety and Clarity** — PASS. La acción de vaciar es explícita y su efecto es inmediato
  y visible (FR-003, FR-004); no hay estados ambiguos.
- **III. Test-First Verification** — PASS (planeado). Las tareas de implementación deberán incluir pruebas de
  Testing Library para escritura, pegado, vaciado y navegación por teclado antes/junto con el código de UI.
- **IV. Accessibility and Inclusive Design** — PASS. FR-005/FR-008 y la User Story 3 exigen roles, etiquetas
  y operabilidad por teclado; el diseño usa landmarks semánticos (`main`) y controles nativos.
- **V. Simplicity and Maintainability** — PASS. Se extrae la gestión del estado del texto a un hook reutilizable
  (`useTextDocument`) en lugar de lógica embebida en componentes, dejando espacio para las especificaciones
  posteriores (métricas, límites, seguridad) sin duplicar estado.

No se detectan violaciones que requieran justificación; la sección "Complexity Tracking" permanece vacía.

## Project Structure

### Documentation (this feature)

```text
specs/001-entrada-gestion-texto/
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
│   └── text-inspector/
│       ├── MainContent.tsx        # Región MAIN CONTENT: compone TextInputArea + ClearTextButton
│       ├── TextInputArea.tsx      # Textarea accesible para ingresar/pegar texto libre
│       └── ClearTextButton.tsx    # Botón explícito "Vaciar" con soporte teclado
├── hooks/
│   └── useTextDocument.ts         # Estado local del texto de trabajo + acción clear() reutilizable
├── pages/
│   └── InspectorPage.tsx          # Página que compone la región MAIN CONTENT dentro del layout
├── App.tsx                        # Rutas y layout base (integra InspectorPage)
└── App.css / index.css            # Estilos base + configuración Tailwind

src/**/__tests__/ (o *.test.tsx colocados junto al componente)
├── TextInputArea.test.tsx
├── ClearTextButton.test.tsx
└── useTextDocument.test.ts
```

**Structure Decision**: Proyecto único de frontend (no hay separación backend/frontend). Se sigue la
estructura ya declarada en `AGENTS.md` (`src/components`, `src/pages`, `src/App.tsx`), agregando `src/hooks`
para la lógica de estado del texto reutilizable entre esta especificación y las futuras (FR-02 a FR-08). Las
pruebas se colocan junto a cada componente/hook siguiendo el patrón estándar de Testing Library/CRA.

## Complexity Tracking

> No violations to justify — this section is intentionally empty.
