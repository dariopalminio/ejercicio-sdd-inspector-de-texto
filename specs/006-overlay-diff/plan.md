# Implementation Plan: Visualizador Overlay/Diff de Caracteres Ocultos

**Branch**: `006-overlay-diff` | **Date**: 2026-08-27 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-overlay-diff/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Implementar una vista anotada de solo lectura sobre el área de texto existente. La representación partirá
del mismo texto y del mismo alcance de detección de `hiddenCharacters.ts`, segmentará el contenido en texto
visible e insignias `[ZWS]`, `[BOM]` o `[CTRL]`, y se actualizará con el reporte de seguridad tras el debounce
existente. El `textarea` seguirá siendo la única superficie editable; el estado de alternancia vivirá en la
composición de la página y la capa visual se sincronizará con el desplazamiento y el ajuste de línea.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 4.9, React 19, Create React App 5

**Primary Dependencies**: React, React DOM, Tailwind CSS 3, Testing Library/Jest existentes

**Storage**: N/A; estado transitorio en memoria del navegador

**Testing**: React Testing Library, Jest y pruebas unitarias existentes

**Target Platform**: Navegadores soportados por el `browserslist` del proyecto, escritorio y móvil

**Project Type**: SPA web browser-only

**Performance Goals**: Actualizar la representación en menos de 1 segundo; mantener el debounce aproximado de 150 ms para cambios rápidos; soportar documentos de hasta 10.000 caracteres definidos por la spec.

**Constraints**: Sin red ni telemetría; el overlay no puede modificar el valor del textarea; debe conservar saltos de línea, ajuste y desplazamiento; señales accesibles no dependientes solo del color.

**Scale/Scope**: Una pantalla de inspector, un documento local de hasta 10.000 caracteres, tres familias de artefactos ya definidas por REQ-04.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Privacy by Default: PASS. Todo análisis y segmentación se ejecuta localmente; no se añade integración externa.
- User-Visible Safety and Clarity: PASS. El control, estado "Sin problemas" e insignias textuales comunican la situación sin depender solo del contador o color.
- Test-First Verification: PASS. Se planifican pruebas para segmentación, tipos de insignia, alternancia, sincronización y preservación del valor fuente.
- Accessibility and Inclusive Design: PASS. El control tendrá estado semántico y teclado; las insignias tendrán etiquetas textuales y contraste suficiente.
- Simplicity and Maintainability: PASS. La lógica de segmentación se separa en un helper reutilizable y la UI en un componente enfocado.
- Additional constraints: PASS. Se conserva CRA/React/TypeScript/Tailwind, el debounce existente, el diseño responsive y el alcance fijo de REQ-04.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/
│   └── text-inspector/
│       ├── ProblemOverlay.tsx
│       ├── ProblemOverlay.test.tsx
│       └── MainContent.tsx (integración del control y la capa)
├── pages/
│   └── InspectorPage.tsx (estado de alternancia y props)
└── utils/
  ├── hiddenCharacters.ts (clasificación reutilizada o ampliada)
  └── annotatedText.ts

specs/006-overlay-diff/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/ui-contract.md
```

**Structure Decision**: Se mantiene la SPA existente y su separación actual entre `pages`, componentes de
texto y utilidades. El nuevo helper de segmentación vive junto a `hiddenCharacters.ts`; el overlay y sus
pruebas viven en `src/components/text-inspector/`. No se añade backend, almacenamiento ni nueva ruta.

## Constitution Check - Post-Design

- Privacy by Default: PASS. `research.md`, `data-model.md` y el contrato UI mantienen el procesamiento local y no definen servicios, telemetría ni persistencia.
- User-Visible Safety and Clarity: PASS. El contrato fija etiquetas `[ZWS]`, `[BOM]`, `[CTRL]`, el estado `Sin problemas` y la alternancia textual.
- Test-First Verification: PASS. `quickstart.md` define pruebas enfocadas y validación completa de suite/build para los flujos observables.
- Accessibility and Inclusive Design: PASS. El contrato exige estado semántico, teclado, foco visible y señales textuales independientes del color.
- Simplicity and Maintainability: PASS. El diseño conserva un único valor fuente, un helper puro de segmentación y un componente enfocado.
- No se identifican violaciones constitucionales ni riesgos abiertos que bloqueen la descomposición de tareas.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | La solución usa la estructura y dependencias existentes. |
