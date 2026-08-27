---

description: "Task list template for feature implementation"
---

# Tasks: Panel de Control de Límites (REQ-03)

**Input**: Design documents from `/specs/003-control-limites/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required for user stories), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Test tasks are included per the project constitution (Principle III: Test-First Verification).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single frontend project (CRA), same as REQ-01/REQ-02. Source under `src/`, tests colocated with the code they
cover (`*.test.ts`/`*.test.tsx`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new directories needed for this feature's code.

- [X] T001 [P] Create empty directory `src/components/limits/` for the Control de Límites panel components

**Checkpoint**: Target folder exists.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core limit-status calculation and the shared state lift-up (so MAIN CONTENT and the new SIDEBAR
both consume the same document/metrics state) needed by every user story in this feature. No user story can
be completed without this.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T002 [P] Write unit tests for the pure limit-status function in `src/utils/limitStatus.test.ts` covering: value below max → `status: 'within'`, value equal to max → `status: 'within'` (FR-026), value above max → `status: 'over'`, percentage rounding to the nearest integer, and `max <= 0` edge cases (per [data-model.md](./data-model.md))
- [X] T003 Implement `calculateLimitStatus({ value, max })` in `src/utils/limitStatus.ts` returning `{ percentage, status }` per the rules in [data-model.md](./data-model.md)
- [X] T004 [P] Write unit tests for the limit-config hook in `src/hooks/useLimitConfig.test.ts` covering: default values (`limitType: 'words'`, `maxValue: 500`), `setLimitType` updates the type, `setMaxValue` accepts a valid positive integer string, and `setMaxValue` ignores negative/non-numeric input while preserving the last valid value (FR-025)
- [X] T005 Implement `useLimitConfig()` hook in `src/hooks/useLimitConfig.ts` exposing `{ limitType, maxValue, setLimitType, setMaxValue }` per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T006 Refactor `InspectorPage` (`src/pages/InspectorPage.tsx`) to call `useTextDocument()` and `useTextMetrics(content)` itself, passing `content`/`onChange`/`onClear`/`metrics` down to `MainContent`
- [X] T007 Refactor `MainContent` (`src/components/text-inspector/MainContent.tsx`) to accept `content`, `onChange`, `onClear`, and `metrics` as props instead of calling `useTextDocument`/`useTextMetrics` internally, passing `metrics` through to `MetricsPanel`
- [X] T008 Refactor `MetricsPanel` (`src/components/text-inspector/MetricsPanel.tsx`) to accept a `metrics: { words, characters, lines }` prop instead of calling `useTextMetrics` internally
- [X] T009 Update existing tests in `src/components/text-inspector/MainContent.test.tsx` and `src/components/text-inspector/MetricsPanel.test.tsx` to pass `content`/`metrics`/`onChange`/`onClear` props directly instead of relying on internal hooks
- [X] T010 [P] Extend `AppLayout` (`src/components/layout/AppLayout.tsx`) to accept an optional `sidebar?: ReactNode` prop, rendering `children` and `sidebar` in a responsive `flex-col md:flex-row` container between `Topbar` and `Footer`
- [X] T011 [P] Update `src/components/layout/AppLayout.test.tsx` to cover: renders `sidebar` content when provided, and still renders correctly when `sidebar` is omitted

**Checkpoint**: `calculateLimitStatus`, `useLimitConfig`, the state lift-up (`InspectorPage`/`MainContent`/
`MetricsPanel`), and the extended `AppLayout` are implemented, tested, and pass `npm test -- --watch=false`.
User story implementation can now begin.

---

## Phase 3: User Story 1 - Configurar el límite a controlar (Priority: P1) 🎯 MVP

**Goal**: Permitir elegir la métrica a limitar (Palabras/Caracteres/Líneas) y establecer un valor máximo
objetivo (FR-018 a FR-020, FR-025).

**Independent Test**: Abrir el panel de Control de Límites, cambiar la selección entre los botones de opción
de las tres métricas y modificar el valor máximo, verificando que ambas selecciones quedan reflejadas y
persisten al seguir editando el texto principal.

### Tests for User Story 1

- [X] T012 [P] [US1] Write component tests for `LimitTypeSelector` in `src/components/limits/LimitTypeSelector.test.tsx` covering: renders the three radio options (Palabras, Caracteres, Líneas) simultaneously and calls `onChange` with the selected value when a radio option is chosen
- [X] T013 [P] [US1] Write component tests for `MaxLimitInput` in `src/components/limits/MaxLimitInput.test.tsx` covering: renders the current value and calls `onChange` with the raw input string on edit
- [X] T014 [P] [US1] Write component tests for `Sidebar` in `src/components/layout/Sidebar.test.tsx` covering: renders an `aside`/complementary landmark and its children

### Implementation for User Story 1

- [X] T015 [US1] Implement `LimitTypeSelector` component in `src/components/limits/LimitTypeSelector.tsx`: accessible radio-button group (`role="radiogroup"`, `<input type="radio">`) with `value`/`onChange` props per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T016 [US1] Implement `MaxLimitInput` component in `src/components/limits/MaxLimitInput.tsx`: accessible `<input type="number">` with an associated label, `value`/`onChange` props per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T017 [US1] Implement `Sidebar` component in `src/components/layout/Sidebar.tsx` rendering an `<aside>` landmark wrapping its `children`
- [X] T018 [US1] Implement `LimitsPanel` component in `src/components/limits/LimitsPanel.tsx` accepting a `metrics` prop, using `useLimitConfig()`, and rendering `LimitTypeSelector` + `MaxLimitInput` (progress/status added in User Story 2)
- [X] T019 [US1] Wire `LimitsPanel` into `InspectorPage` (`src/pages/InspectorPage.tsx`) as the `sidebar` prop of `AppLayout`, passing the shared `metrics` from T006

**Checkpoint**: User Story 1 is independently functional — the user can select a limit type and set a max
value, and the configuration persists while editing the main text. `npm test -- --watch=false` passes for
this story's tests.

---

## Phase 4: User Story 2 - Ver el estado del límite en tiempo real (Priority: P2)

**Goal**: Mostrar una barra de progreso y un mensaje de estado ("Dentro del límite"/"Por encima del máximo")
con el porcentaje redondeado, actualizados en tiempo real (FR-021 a FR-024, FR-026).

**Independent Test**: Configurar un tipo de límite y un valor máximo conocidos, y escribir texto de longitud
controlada para verificar que la barra de progreso y el mensaje de estado reflejan correctamente los casos
por debajo, en el límite exacto, y por encima del máximo.

### Tests for User Story 2

- [X] T020 [P] [US2] Write component tests for `LimitProgress` in `src/components/limits/LimitProgress.test.tsx` covering: shows the rounded percentage and a "Dentro del límite" message with a safe-state style when `status: 'within'`, and a "Por encima del máximo" message with an alert-state style when `status: 'over'` (Acceptance Scenarios 1–2 of US2)
- [X] T021 [P] [US2] Write component tests for `LimitsPanel` in `src/components/limits/LimitsPanel.test.tsx` covering: recalculates the status when the selected metric's value changes, and recalculates when the limit type or max value changes (Acceptance Scenarios 3–4 of US2)

### Implementation for User Story 2

- [X] T022 [US2] Implement `LimitProgress` component in `src/components/limits/LimitProgress.tsx`: renders a progress bar (visually capped at 100%) plus the rounded percentage and status message/color, accepting `percentage`/`status` props per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T023 [US2] Integrate `LimitProgress` into `LimitsPanel` (`src/components/limits/LimitsPanel.tsx`), computing `{ value, max }` from `metrics[limitType]` and `maxValue`, calling `calculateLimitStatus`, and passing the result to `LimitProgress`

**Checkpoint**: User Stories 1 AND 2 both work independently — the limit configuration and the live
progress/status feedback both function correctly and update in real time.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and end-to-end validation across all user stories.

- [X] T024 Run `npm test -- --watch=false` and confirm all tests across Phases 2–4 pass
- [X] T025 Run `npm run build` and confirm the production build compiles without TypeScript or CRA errors
- [X] T026 Execute the manual validation scenarios in [quickstart.md](./quickstart.md) and confirm all steps pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories. Includes the
  state lift-up refactor (T006–T009), which touches existing REQ-01/REQ-02 files and must be validated (all
  existing tests still passing) before any REQ-03-specific UI is built.
- **User Stories (Phase 3–4)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational — no dependency on User Story 2
  - User Story 2 (P2): Depends on `LimitsPanel`/`useLimitConfig` scaffolding from User Story 1 (T018), since it extends the same component
- **Polish (Phase 5)**: Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Foundational only — MVP scope for this feature
- User Story 2 (P2): Builds on the `LimitsPanel` scaffold created in User Story 1

### Parallel Opportunities

- T002 and T004 (foundational tests) can be written in parallel (different files)
- T010/T011 (AppLayout extension) can proceed in parallel with T002–T009 (different files)
- T012, T013, T014 (US1 tests) are each `[P]` within their phase (different test files)
- T020 and T021 (US2 tests) are each `[P]` within their phase (different test files)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (`calculateLimitStatus`, `useLimitConfig`, state lift-up, `AppLayout` sidebar slot)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (selector + max value configuration persists)
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready (existing REQ-01/REQ-02 tests still passing)
2. Add User Story 1 → test independently → MVP delivered (configurar el límite)
3. Add User Story 2 → test independently → deploy/demo (retroalimentación visual en tiempo real)
4. Polish phase → final cleanup and full validation
5. Each story adds value without breaking previous stories
