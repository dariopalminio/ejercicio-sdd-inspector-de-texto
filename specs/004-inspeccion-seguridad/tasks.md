---

description: "Task list template for feature implementation"
---

# Tasks: Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

**Input**: Design documents from `/specs/004-inspeccion-seguridad/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required for user stories), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Test tasks are included per the project constitution (Principle III: Test-First Verification).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single frontend project (CRA), same as REQ-01/REQ-02/REQ-03. Source under `src/`, tests colocated with the
code they cover (`*.test.ts`/`*.test.tsx`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new directory needed for this feature's code.

- [X] T001 [P] Create empty directory `src/components/security/` for the Inspector de Seguridad panel component

**Checkpoint**: Target folder exists.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core hidden-character detection needed by every user story in this feature. No user story can be
completed without this.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T002 [P] Write unit tests for the pure detection function in `src/utils/hiddenCharacters.test.ts` covering: empty string → `{ count: 0, status: 'safe' }`, text with only printable characters → `{ count: 0, status: 'safe' }`, text containing zero-width spaces (`\u200B`) counted individually, text containing a BOM (`\uFEFF`), text containing ASCII control characters (e.g. `\u0000`, `\u001F`), text with tab/newline/carriage-return NOT counted, repeated occurrences of the same artifact each counted separately, and mixed artifacts summed correctly (per [data-model.md](./data-model.md))
- [X] T003 Implement `detectHiddenCharacters(content: string)` in `src/utils/hiddenCharacters.ts` returning `{ count, status }` per the regex and rules in [research.md](./research.md) and [data-model.md](./data-model.md)
- [X] T004 [P] Write unit tests for the security-report hook in `src/hooks/useSecurityReport.test.ts` covering: returns `{ count: 0, status: 'safe' }` for empty content, and recalculates (after the debounce) when content changes, using fake timers to verify the ~150ms debounce
- [X] T005 Implement `useSecurityReport(content: string)` hook in `src/hooks/useSecurityReport.ts` that debounces (~150ms) calls to `detectHiddenCharacters` and exposes `{ count, status }` (per [contracts/ui-contract.md](./contracts/ui-contract.md))

**Checkpoint**: `detectHiddenCharacters` and `useSecurityReport` are implemented, tested, and pass
`npm test -- --watch=false`. User story implementation can now begin.

---

## Phase 3: User Story 1 - Detectar caracteres ocultos en tiempo real (Priority: P1) 🎯 MVP

**Goal**: Escanear continuamente el documento de entrada y reportar el conteo exacto de caracteres
ocultos/artefactos detectados (FR-027, FR-028, FR-033).

**Independent Test**: Pegar texto con caracteres invisibles conocidos (zero-width space, BOM, control ASCII)
y verificar que el conteo detectado coincide exactamente con la cantidad insertada, incluyendo tras vaciar el
área de texto.

### Tests for User Story 1

- [X] T006 [P] [US1] Write component tests for `SecurityPanel` in `src/components/security/SecurityPanel.test.tsx` covering: shows 0 detected characters for empty content, shows the exact count for text containing zero-width spaces/BOM/control characters, and shows 0 again after content is cleared (Acceptance Scenarios 1–5 of US1)

### Implementation for User Story 1

- [X] T007 [US1] Implement `SecurityPanel` component in `src/components/security/SecurityPanel.tsx` accepting a `content` prop, using `useSecurityReport(content)`, and rendering the detected artifact count with a heading "Inspector de Seguridad"
- [X] T008 [US1] Wire `SecurityPanel` into `InspectorPage` (`src/pages/InspectorPage.tsx`) as a second child of the existing `Sidebar`, alongside `LimitsPanel`, passing the shared `content`

**Checkpoint**: User Story 1 is independently functional — the exact count of hidden characters updates in
real time and resets to 0 on clear. `npm test -- --watch=false` passes for this story's tests.

---

## Phase 4: User Story 2 - Ver el estado de seguridad del texto de un vistazo (Priority: P2)

**Goal**: Mostrar un indicador de estado claro ("Texto seguro" vs. alerta con conteo exacto), sin depender
únicamente del color (FR-029 a FR-031).

**Independent Test**: Alternar entre texto sin caracteres ocultos y texto con caracteres ocultos conocidos,
verificando que el indicador cambia entre el estado "seguro" y un estado de alerta con la cantidad exacta.

### Tests for User Story 2

- [X] T009 [P] [US2] Extend `SecurityPanel` tests in `src/components/security/SecurityPanel.test.tsx` covering: shows a "Texto seguro" message when `status: 'safe'`, shows an alert message including the exact count when `status: 'alert'`, and the message text differs between the two states (not relying on color alone) (Acceptance Scenarios 1–2 of US2)

### Implementation for User Story 2

- [X] T010 [US2] Update `SecurityPanel` (`src/components/security/SecurityPanel.tsx`) to render a distinct status message/style for `'safe'` vs `'alert'`, always including explicit text (never color-only) per FR-031/[contracts/ui-contract.md](./contracts/ui-contract.md)

**Checkpoint**: User Stories 1 AND 2 both work independently — the count and the safe/alert status both
update in real time and are always communicated via text.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and end-to-end validation across all user stories.

- [X] T011 Run `npm test -- --watch=false` and confirm all tests across Phases 2–4 pass
- [X] T012 Run `npm run build` and confirm the production build compiles without TypeScript or CRA errors
- [X] T013 Execute the manual validation scenarios in [quickstart.md](./quickstart.md) and confirm all steps pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–4)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational — no dependency on User Story 2
  - User Story 2 (P2): Depends on `SecurityPanel` scaffolding from User Story 1 (T007), since it extends the same component
- **Polish (Phase 5)**: Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Foundational only — MVP scope for this feature
- User Story 2 (P2): Builds on the `SecurityPanel` scaffold created in User Story 1

### Parallel Opportunities

- T002 and T004 (foundational tests) can be written in parallel (different files)
- T006 (US1 test) and later T009 (US2 test extension) both touch the same test file, so they proceed
  sequentially within `SecurityPanel.test.tsx`, but T001 (setup) has no dependents blocking it

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (`detectHiddenCharacters`, `useSecurityReport`)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (exact count updates and resets on clear)
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → MVP delivered (conteo de caracteres ocultos en tiempo real)
3. Add User Story 2 → test independently → deploy/demo (indicador de estado seguro/alerta)
4. Polish phase → final cleanup and full validation
5. Each story adds value without breaking previous stories
