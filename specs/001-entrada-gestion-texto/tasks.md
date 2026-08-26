---

description: "Task list template for feature implementation"
---

# Tasks: Entrada y Gestión de Texto (FR-01)

**Input**: Design documents from `/specs/001-entrada-gestion-texto/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required for user stories), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Test tasks are included per the project constitution (Principle III: Test-First Verification), which requires behavioral changes to be driven by tests exercising real user-visible outcomes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single frontend project (CRA). Source under `src/`, tests colocated with the code they cover
(`*.test.ts`/`*.test.tsx`), per `AGENTS.md` and `plan.md`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization needed before any user story can be implemented.

- [X] T001 Install Tailwind CSS and its build tooling (`tailwindcss`, `postcss`, `autoprefixer`) as dev dependencies and generate `tailwind.config.js` / `postcss.config.js` at the repository root
- [X] T002 Configure `tailwind.config.js` `content` globs for `src/**/*.{ts,tsx}` and define the dark premium palette tokens (`slate-900`/`slate-950` backgrounds, `emerald-400`/`emerald-500` accents) per `docs/product-requirements.md` RNF-04
- [X] T003 [P] Add Tailwind `@tailwind base; @tailwind components; @tailwind utilities;` directives to `src/index.css`
- [X] T004 [P] Create empty directories `src/components/text-inspector/` and `src/hooks/` for the feature's components and hook

**Checkpoint**: Tailwind builds successfully (`npm start` renders without CSS errors) and target folders exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state management shared by every user story in this feature. No user story can be
completed without this.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T005 [P] Write unit tests for the text-document hook in `src/hooks/useTextDocument.test.ts`, covering: initial empty state, `setContent` updates, and `clear()` resetting to an empty string (per [data-model.md](./data-model.md))
- [X] T006 Implement `useTextDocument()` hook in `src/hooks/useTextDocument.ts` exposing `content: string`, `setContent(next: string): void`, and `clear(): void` (per [data-model.md](./data-model.md) and [contracts/ui-contract.md](./contracts/ui-contract.md))

**Checkpoint**: `useTextDocument` hook is implemented, tested, and passes `npm test -- --watch=false`. User story implementation can now begin.

---

## Phase 3: User Story 1 - Ingresar o pegar texto libre (Priority: P1) 🎯 MVP

**Goal**: Permitir al usuario escribir o pegar texto libre en un área de trabajo principal y ver el contenido
reflejado en tiempo real (FR-001, FR-002).

**Independent Test**: Escribir texto directamente y pegar texto multilínea copiado desde otra fuente en el
área principal; verificar que el contenido aparece completo y sin pérdida.

### Tests for User Story 1

- [X] T007 [P] [US1] Write component tests for `TextInputArea` in `src/components/text-inspector/TextInputArea.test.tsx` covering: typing renders the typed value, pasting multiline content inserts it with line breaks preserved, and existing content is preserved when more text is added (Acceptance Scenarios 1–3 of US1)

### Implementation for User Story 1

- [X] T008 [US1] Implement `TextInputArea` component in `src/components/text-inspector/TextInputArea.tsx`: controlled `<textarea>` accepting `value`, `onChange`, and optional `label` props, with an accessible label per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T009 [US1] Implement `MainContent` component in `src/components/text-inspector/MainContent.tsx` that renders a `<main>` landmark, instantiates `useTextDocument()`, and renders `TextInputArea` wired to `content`/`setContent`
- [X] T010 [US1] Create `InspectorPage` in `src/pages/InspectorPage.tsx` that renders `MainContent`, and mount `InspectorPage` from `src/App.tsx` (replacing the default CRA scaffold markup)

**Checkpoint**: User Story 1 is independently functional — a user can type or paste text and see it reflected
in the main text area. `npm test -- --watch=false` passes for this story's tests.

---

## Phase 4: User Story 2 - Vaciar el área de trabajo rápidamente (Priority: P2)

**Goal**: Proveer una acción explícita que vacíe de inmediato el contenido del área de texto (FR-003, FR-004,
FR-005).

**Independent Test**: Con contenido en el área de texto, activar la acción "Vaciar" con mouse y con teclado; y
repetir con el área ya vacía, verificando ausencia de errores.

### Tests for User Story 2

- [X] T011 [P] [US2] Write component tests for `ClearTextButton` in `src/components/text-inspector/ClearTextButton.test.tsx` covering: clicking calls `onClear`, activating via keyboard (Enter/Space while focused) calls `onClear`, and invoking `onClear` when already empty produces no error (Acceptance Scenarios 1–3 of US2)

### Implementation for User Story 2

- [X] T012 [US2] Implement `ClearTextButton` component in `src/components/text-inspector/ClearTextButton.tsx`: native `<button type="button">` with visible "Vaciar" label, accepting `onClear` and optional `disabled` props per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T013 [US2] Wire `ClearTextButton` into `MainContent` (`src/components/text-inspector/MainContent.tsx`), connecting `onClear` to the `clear()` function from `useTextDocument()`

**Checkpoint**: User Stories 1 AND 2 both work independently — a user can enter text and clear it in one
action via mouse or keyboard.

---

## Phase 5: User Story 3 - Layout accesible del contenido principal (Priority: P3)

**Goal**: Asegurar que el área de texto y la acción de vaciar se presenten en una estructura de página clara,
responsiva y accesible por teclado/lector de pantalla (FR-006, FR-007, FR-008).

**Independent Test**: Navegar la página solo con teclado verificando orden lógico de foco; enfocar los
controles con un lector de pantalla verificando anuncios claros; redimensionar la ventana verificando ausencia
de solapamientos.

### Tests for User Story 3

- [X] T014 [P] [US3] Write tests in `src/components/text-inspector/MainContent.test.tsx` covering: `TextInputArea` and `ClearTextButton` are both reachable via `Tab` in a logical order, and both expose an accessible name/role (Acceptance Scenarios 1–2 of US3)

### Implementation for User Story 3

- [X] T015 [US3] Apply Tailwind layout/responsive classes to `MainContent` (`src/components/text-inspector/MainContent.tsx`) so the text area and clear action stack cleanly on narrow viewports and align side-by-side/below on wide viewports, per FR-007/SC-004
- [X] T016 [US3] Apply dark premium Tailwind styling (palette from RNF-04) and finalize semantic markup (`<main>` landmark, associated `<label>`/`aria-label`) across `MainContent.tsx` and `TextInputArea.tsx` per FR-006/FR-008
- [X] T017 [US3] Ensure focus returns to `TextInputArea` after `ClearTextButton` is activated, in `src/components/text-inspector/MainContent.tsx`

**Checkpoint**: All three user stories work together — the MAIN CONTENT region is fully functional,
responsive, and accessible.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and end-to-end validation across all user stories.

- [X] T018 [P] Remove unused default CRA scaffold assets/styles no longer referenced (e.g., `src/logo.svg` usage) from `src/App.tsx` and `src/App.css`
- [X] T019 Run `npm test -- --watch=false` and confirm all tests across Phases 2–5 pass
- [X] T020 Run `npm run build` and confirm the production build compiles without TypeScript or CRA errors
- [X] T021 Execute the manual validation scenarios in [quickstart.md](./quickstart.md) and confirm all steps pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational — no dependency on other stories
  - User Story 2 (P2): Depends on `MainContent` existing from User Story 1 (T009) since it edits the same file, but does not depend on US1's internal logic being "done" beyond that scaffold
  - User Story 3 (P3): Depends on `MainContent`/`TextInputArea` existing from US1 and `ClearTextButton` existing from US2 (styles/layout/focus wrap both)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Foundational only — MVP scope
- User Story 2 (P2): Builds on the `MainContent` scaffold created in US1
- User Story 3 (P3): Builds on components from US1 and US2 (layout/accessibility wraps both)

### Parallel Opportunities

- T003 and T004 (Phase 1) can run in parallel
- T005 (foundational test) can be written in parallel with early Setup tasks, though it should be implemented against T006 following test-first order
- T007 (US1 tests), T011 (US2 tests), and T014 (US3 tests) are each `[P]` within their own phase (different test files) but should follow the checkpoint order across phases since later phases build on earlier components

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (`useTextDocument`)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (type/paste text, see it reflected)
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → MVP delivered (entrada y pegado de texto)
3. Add User Story 2 → test independently → deploy/demo (agrega vaciar rápido)
4. Add User Story 3 → test independently → deploy/demo (layout accesible y responsivo completo)
5. Polish phase → final cleanup and full validation
6. Each story adds value without breaking previous stories
