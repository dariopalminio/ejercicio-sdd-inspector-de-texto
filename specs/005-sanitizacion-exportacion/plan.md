# Implementation Plan: Sanitización y Exportación (REQ-05)

**Branch**: `005-sanitizacion-exportacion` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-sanitizacion-exportacion/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Agregar una acción "Sanitizar y Copiar" junto al área de texto principal (MAIN CONTENT) que remueve del
documento de entrada los mismos caracteres ocultos ya detectados por REQ-04 (zero-width space, BOM, control
ASCII `U+0000–U+001F` excluyendo `\t`/`\n`/`\r`), actualiza el texto visible con la versión saneada, la copia
al portapapeles del sistema operativo mediante la Clipboard API del navegador, y muestra una confirmación
temporal de éxito (o un mensaje de error si la copia falla) que se oculta automáticamente.

## Technical Context

**Language/Version**: TypeScript 4.9 sobre React 19 (create-react-app / react-scripts 5) — mismo stack que
REQ-01 a REQ-04

**Primary Dependencies**: React 19, react-dom 19, Tailwind CSS (ya configurado), Testing Library (React, DOM,
user-event v13), Jest (vía react-scripts test); Clipboard API nativa del navegador (`navigator.clipboard`),
sin dependencias externas nuevas

**Storage**: N/A (el texto saneado reemplaza el `content` existente en memoria; no hay persistencia)

**Testing**: Jest + React Testing Library + `@testing-library/user-event` v13, ejecutados con
`npm test -- --watch=false`; `navigator.clipboard.writeText` se simula (mock) en las pruebas, ya que jsdom no
implementa la Clipboard API real

**Target Platform**: Navegadores web modernos evergreen (desktop y mobile) que soporten la Clipboard API; sin
backend

**Project Type**: Aplicación web de página única (frontend-only), mismo proyecto único que REQ-01 a REQ-04

**Performance Goals**: Confirmación de éxito visible en menos de 1s tras la copia (SC-017); la sanitización
reutiliza la misma regex de REQ-04 (operación síncrona y barata), sin necesidad de debounce adicional ya que
se ejecuta una única vez por clic, no en cada tecla

**Constraints**: 100% procesamiento local del texto (FR-042); la única interacción externa al código de la
aplicación es la propia Clipboard API del sistema operativo del usuario (no una red externa); la confirmación
de éxito/error DEBE desaparecer automáticamente (~2–3s, per Assumptions de `spec.md`)

**Scale/Scope**: Una única acción de saneado+copia por clic, operando sobre el documento de entrada existente
(REQ-01); reutiliza el alcance de detección exacto ya definido en REQ-04 sin ampliarlo

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Privacy by Default** — PASS. El saneado ocurre en el cliente; la única API externa al código es la
  Clipboard API local del navegador, no una llamada de red (FR-042).
- **II. User-Visible Safety and Clarity** — PASS. La confirmación de éxito y el mensaje de error son mensajes
  de texto explícitos, no solo indicadores de color (FR-039/FR-040).
- **III. Test-First Verification** — PASS (planeado). Las tareas de implementación deberán incluir pruebas
  unitarias de `removeHiddenCharacters` y pruebas de componente/hook para el flujo de copia (éxito y fallo,
  usando un mock de `navigator.clipboard.writeText`).
- **IV. Accessibility and Inclusive Design** — PASS. El botón usa un `<button>` nativo; la confirmación/error
  se anuncia mediante texto (y puede exponerse con `aria-live` para lectores de pantalla).
- **V. Simplicity and Maintainability** — PASS. La remoción de caracteres se extrae a una función pura
  `removeHiddenCharacters` (reutilizando la regex ya definida en REQ-04), y el flujo de copia se encapsula en
  un hook `useSanitizeAndCopy`, siguiendo el mismo patrón de REQ-02/REQ-03/REQ-04.

No se detectan violaciones que requieran justificación; la sección "Complexity Tracking" permanece vacía.

## Project Structure

### Documentation (this feature)

```text
specs/005-sanitizacion-exportacion/
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
│   ├── layout/                  # (existente, sin cambios)
│   ├── limits/                  # (existente, sin cambios)
│   ├── security/                # (existente, sin cambios: SecurityPanel de REQ-04)
│   └── text-inspector/
│       ├── MainContent.tsx      # Refactor: agrega `SanitizeAndCopyButton` junto a `ClearTextButton`
│       ├── TextInputArea.tsx    # (existente, sin cambios)
│       ├── ClearTextButton.tsx  # (existente, sin cambios)
│       ├── MetricsPanel.tsx     # (existente, sin cambios)
│       └── SanitizeAndCopyButton.tsx # Nuevo: botón + mensaje de confirmación/error
├── hooks/
│   ├── useTextDocument.ts       # (existente, sin cambios)
│   ├── useTextMetrics.ts        # (existente, sin cambios)
│   ├── useLimitConfig.ts        # (existente, sin cambios)
│   ├── useSecurityReport.ts     # (existente, sin cambios)
│   └── useSanitizeAndCopy.ts    # Nuevo: sanea, actualiza el texto, copia al portapapeles, gestiona estado de éxito/error con auto-dismiss
├── utils/
│   ├── textMetrics.ts           # (existente, sin cambios)
│   ├── limitStatus.ts           # (existente, sin cambios)
│   └── hiddenCharacters.ts      # Extender: agrega `removeHiddenCharacters(content)` junto a `detectHiddenCharacters`
├── pages/
│   └── InspectorPage.tsx        # Sin cambios (MainContent ya recibe `content`/`onChange`)
└── App.tsx                      # Sin cambios estructurales

src/**/__tests__ o *.test.ts(x) colocados junto a cada archivo:
├── hiddenCharacters.test.ts     # Extendido con casos de removeHiddenCharacters
├── useSanitizeAndCopy.test.ts
└── SanitizeAndCopyButton.test.tsx
```

**Structure Decision**: Se reutiliza el mismo proyecto único de frontend de REQ-01 a REQ-04. La función
`removeHiddenCharacters` se agrega junto a `detectHiddenCharacters` en el mismo archivo
`src/utils/hiddenCharacters.ts` (comparten la misma regex de alcance fijo), evitando duplicar la definición
del conjunto de caracteres a detectar/remover. El nuevo botón vive en `text-inspector/` (junto a
`ClearTextButton`) porque, al igual que él, opera directamente sobre el documento de entrada de MAIN CONTENT.

## Complexity Tracking

> No violations to justify — this section is intentionally empty.
