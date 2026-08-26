---

description: "Task list template for feature implementation"
---

# Tasks: Panel de Métricas Dinámicas (FR-02)

**Input**: Design documents from `/specs/002-panel-metricas-dinamicas/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required for user stories), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Test tasks are included per the project constitution (Principle III: Test-First Verification).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single frontend project (CRA), same as FR-01. Source under `src/`, tests colocated with the code they cover
(`*.test.ts`/`*.test.tsx`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new directories needed for this feature's code.

- [X] T001 [P] Create empty directory `src/components/layout/` for the shared Topbar/Footer/AppLayout components
- [X] T002 [P] Create empty directory `src/utils/` for the pure text-metrics calculation utility

**Checkpoint**: Target folders exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core metrics calculation and shared page layout scaffold needed by every user story in this
feature. No user story can be completed without this.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T003 [P] Write unit tests for the pure metrics function in `src/utils/textMetrics.test.ts` covering: empty string → `{words: 0, characters: 0, lines: 0}`, single word, multiple words separated by single/multiple spaces, characters count including whitespace, multiline text, and a trailing newline not adding an extra line (per [data-model.md](./data-model.md))
- [X] T004 Implement `calculateTextMetrics(content: string)` in `src/utils/textMetrics.ts` returning `{ words, characters, lines }` per the rules in [data-model.md](./data-model.md)
- [X] T005 [P] Write unit tests for the metrics hook in `src/hooks/useTextMetrics.test.ts` covering: returns zeroed metrics for empty content, and recalculates (after the debounce) when content changes, using fake timers to verify the ~150ms debounce
- [X] T006 Implement `useTextMetrics(content: string)` hook in `src/hooks/useTextMetrics.ts` that debounces (~150ms) calls to `calculateTextMetrics` and exposes `{ words, characters, lines }` (per [contracts/ui-contract.md](./contracts/ui-contract.md))
- [X] T007 [P] Write tests for the layout scaffold in `src/components/layout/AppLayout.test.tsx` covering: renders a `header` landmark, a `footer` landmark, and renders its `children` between them
- [X] T008 Implement `AppLayout` component in `src/components/layout/AppLayout.tsx` rendering `<header>` + `{children}` + `<footer>` landmarks (Topbar/Footer content added in later phases), accepting a `children` prop per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T009 Wire `AppLayout` into `InspectorPage` (`src/pages/InspectorPage.tsx`), wrapping the existing `MainContent` as its `children`

**Checkpoint**: `calculateTextMetrics`, `useTextMetrics`, and the `AppLayout` scaffold are implemented, tested,
and pass `npm test -- --watch=false`. User story implementation can now begin.

---

## Phase 3: User Story 1 - Ver métricas de texto en tiempo real (Priority: P1) 🎯 MVP

**Goal**: Mostrar tres cuadros de métricas (palabras, caracteres, líneas) dentro de MAIN CONTENT que se
recalculan en tiempo real a partir del documento de entrada (FR-010 a FR-014).

**Independent Test**: Escribir/pegar texto de longitud conocida en el área principal y verificar que los tres
cuadros muestran los valores correctos y vuelven a 0 al vaciar el área.

### Tests for User Story 1

- [X] T010 [P] [US1] Write component tests for `MetricCard` in `src/components/text-inspector/MetricCard.test.tsx` covering: renders the given label and numeric value
- [X] T011 [P] [US1] Write component tests for `MetricsPanel` in `src/components/text-inspector/MetricsPanel.test.tsx` covering: shows 0/0/0 for empty content, shows correct word/character/line counts for representative inputs (Acceptance Scenarios 1–4 of US1)

### Implementation for User Story 1

- [X] T012 [US1] Implement `MetricCard` component in `src/components/text-inspector/MetricCard.tsx` rendering a labeled numeric result box, accepting `label` and `value` props per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T013 [US1] Implement `MetricsPanel` component in `src/components/text-inspector/MetricsPanel.tsx` accepting a `content` prop, using `useTextMetrics(content)`, and rendering three `MetricCard`s (Palabras, Caracteres, Líneas)
- [X] T014 [US1] Integrate `MetricsPanel` into `MainContent` (`src/components/text-inspector/MainContent.tsx`), passing the existing `content` from `useTextDocument()`, so metrics reset to 0 when the user clears the text area (Acceptance Scenario 5 of US1)

**Checkpoint**: User Story 1 is independently functional — metrics update in real time and reset to 0 on clear.
`npm test -- --watch=false` passes for this story's tests.

---

## Phase 4: User Story 2 - Identificar la aplicación desde el encabezado (Priority: P2)

**Goal**: Mostrar el nombre de la aplicación en un TOPBAR/HEADER visible, alineado a la izquierda (FR-015,
FR-017).

**Independent Test**: Cargar la página y verificar que el encabezado muestra "Inspector de Texto" alineado a
la izquierda, sin cambiar su contenido al modificar el texto o las métricas.

### Tests for User Story 2

- [X] T015 [P] [US2] Write component tests for `Topbar` in `src/components/layout/Topbar.test.tsx` covering: renders the application name "Inspector de Texto" within a `header` landmark

### Implementation for User Story 2

- [X] T016 [US2] Implement `Topbar` component in `src/components/layout/Topbar.tsx` rendering the application name "Inspector de Texto" left-aligned per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T017 [US2] Render `Topbar` inside the `<header>` region of `AppLayout` (`src/components/layout/AppLayout.tsx`)

**Checkpoint**: User Stories 1 AND 2 both work independently — metrics update correctly and the header displays
the application name consistently.

---

## Phase 5: User Story 3 - Confirmar la codificación del texto desde el pie de página (Priority: P3)

**Goal**: Mostrar la información de codificación de texto (UTF-8 por defecto) en un FOOTER visible (FR-016,
FR-017).

**Independent Test**: Cargar la página y verificar que el pie de página muestra "Codificación UTF-8", sin
cambiar su contenido al modificar el texto o las métricas.

### Tests for User Story 3

- [X] T018 [P] [US3] Write component tests for `Footer` in `src/components/layout/Footer.test.tsx` covering: renders the text-encoding information ("UTF-8") within a `footer` landmark

### Implementation for User Story 3

- [X] T019 [US3] Implement `Footer` component in `src/components/layout/Footer.tsx` rendering the text-encoding information ("Codificación UTF-8") per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T020 [US3] Render `Footer` inside the `<footer>` region of `AppLayout` (`src/components/layout/AppLayout.tsx`)

**Checkpoint**: All three user stories work together — metrics, header, and footer are all functional and
consistent with `spec.md`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and end-to-end validation across all user stories.

- [X] T021 Run `npm test -- --watch=false` and confirm all tests across Phases 2–5 pass
- [X] T022 Run `npm run build` and confirm the production build compiles without TypeScript or CRA errors
- [X] T023 Execute the manual validation scenarios in [quickstart.md](./quickstart.md) and confirm all steps pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational — no dependency on other stories
  - User Story 2 (P2): Depends on `AppLayout`'s `<header>` scaffold from Foundational, not on User Story 1
  - User Story 3 (P3): Depends on `AppLayout`'s `<footer>` scaffold from Foundational, not on User Story 1 or 2
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Foundational only — MVP scope for this feature
- User Story 2 (P2): Builds on the `AppLayout` scaffold created in Foundational, independent of US1
- User Story 3 (P3): Builds on the `AppLayout` scaffold created in Foundational, independent of US1 and US2

### Parallel Opportunities

- T001 and T002 (Phase 1) can run in parallel
- T003, T005, T007 (foundational tests) can be written in parallel (different files), each followed by its own implementation task
- T010 and T011 (US1 tests), T015 (US2 test), and T018 (US3 test) are each `[P]` within their own phase (different test files)
- Once Foundational is complete, User Stories 2 and 3 can be implemented in parallel with each other and with User Story 1, since they touch different files (`Topbar.tsx`/`Footer.tsx` vs. `MetricsPanel.tsx`/`MetricCard.tsx`) and only converge on `AppLayout.tsx` for wiring (T017, T020)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (`calculateTextMetrics`, `useTextMetrics`, `AppLayout` scaffold)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (metrics update and reset correctly)
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → MVP delivered (panel de métricas dinámicas)
3. Add User Story 2 → test independently → deploy/demo (agrega identidad de la app en el header)
4. Add User Story 3 → test independently → deploy/demo (agrega transparencia de codificación en el footer)
5. Polish phase → final cleanup and full validation
6. Each story adds value without breaking previous stories
