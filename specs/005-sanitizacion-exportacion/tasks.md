---

description: "Task list template for feature implementation"
---

# Tasks: Sanitización y Exportación (REQ-05)

**Input**: Design documents from `/specs/005-sanitizacion-exportacion/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required for user stories), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Test tasks are included per the project constitution (Principle III: Test-First Verification).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single frontend project (CRA), same as REQ-01 to REQ-04. Source under `src/`, tests colocated with the code
they cover (`*.test.ts`/`*.test.tsx`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No new directories are needed — this feature extends existing `text-inspector/`, `hooks/`, and
`utils/` folders.

- [X] T001 Verify `navigator.clipboard` is mockable in the test environment by adding a shared mock helper (or inline `jest.fn()` setup) convention documented at the top of `src/hooks/useSanitizeAndCopy.test.ts` (created in Phase 2)

**Checkpoint**: Test mocking approach for the Clipboard API is confirmed before writing hook tests.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core sanitization (removal) logic and the sanitize+copy hook needed by every user story in this
feature. No user story can be completed without this.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T002 [P] Write unit tests for the pure removal function in `src/utils/hiddenCharacters.test.ts` (extend existing file) covering: `removeHiddenCharacters` strips zero-width spaces, BOM, and ASCII control characters, leaves tab/newline/carriage-return untouched, returns the input unchanged when there are no artifacts, and returns an empty string for empty input (per [data-model.md](./data-model.md))
- [X] T003 Implement `removeHiddenCharacters(content: string): string` in `src/utils/hiddenCharacters.ts`, reusing the existing detection regex, per [research.md](./research.md)
- [X] T004 [P] Write unit tests for the sanitize-and-copy hook in `src/hooks/useSanitizeAndCopy.test.ts` covering: calling `sanitizeAndCopy()` invokes `onSanitized` with the sanitized text, calls `navigator.clipboard.writeText` with the sanitized text, sets `status` to `'success'` on a resolved mock and to `'error'` on a rejected mock, and `status` returns to `'idle'` after the auto-dismiss delay (use fake timers)
- [X] T005 Implement `useSanitizeAndCopy(content, onSanitized)` hook in `src/hooks/useSanitizeAndCopy.ts` exposing `{ status, sanitizeAndCopy }` per [contracts/ui-contract.md](./contracts/ui-contract.md) and the auto-dismiss (~2500ms) rule in [research.md](./research.md)

**Checkpoint**: `removeHiddenCharacters` and `useSanitizeAndCopy` are implemented, tested, and pass
`npm test -- --watch=false`. User story implementation can now begin.

---

## Phase 3: User Story 1 - Sanear el texto y copiarlo con una sola acción (Priority: P1) 🎯 MVP

**Goal**: Al activar "Sanitizar y Copiar", remover los caracteres ocultos del texto, actualizar el área de
texto visible, y copiar la versión saneada al portapapeles (FR-035 a FR-038, FR-041, FR-042).

**Independent Test**: Pegar texto con caracteres ocultos conocidos, activar "Sanitizar y Copiar", y verificar
que el texto visible y el contenido copiado al portapapeles no contienen esos artefactos.

### Tests for User Story 1

- [X] T006 [P] [US1] Write component tests for `SanitizeAndCopyButton` in `src/components/text-inspector/SanitizeAndCopyButton.test.tsx` (with `navigator.clipboard.writeText` mocked) covering: clicking calls `onSanitized` with the sanitized text, clicking with text containing no hidden characters completes without error and leaves the text unchanged, and clicking with empty content completes without error (Acceptance Scenarios 1, 4, 5 of US1)

### Implementation for User Story 1

- [X] T007 [US1] Implement `SanitizeAndCopyButton` component in `src/components/text-inspector/SanitizeAndCopyButton.tsx`: native `<button type="button">` labeled "Sanitizar y Copiar", accepting `content`/`onSanitized` props, using `useSanitizeAndCopy` per [contracts/ui-contract.md](./contracts/ui-contract.md)
- [X] T008 [US1] Wire `SanitizeAndCopyButton` into `MainContent` (`src/components/text-inspector/MainContent.tsx`), alongside `ClearTextButton`, passing `content` and `onChange` (as `onSanitized`) from the existing props

**Checkpoint**: User Story 1 is independently functional — sanitizing updates the visible text and copies the
clean version to the clipboard. `npm test -- --watch=false` passes for this story's tests.

---

## Phase 4: User Story 2 - Ver confirmación de éxito de la copia (Priority: P2)

**Goal**: Mostrar una confirmación visual temporal de éxito tras copiar, o un mensaje de error si la copia
falla, ambos auto-descartables (FR-039, FR-040).

**Independent Test**: Activar "Sanitizar y Copiar" con una copia exitosa simulada y verificar que aparece un
mensaje de confirmación que desaparece automáticamente; repetir con una copia fallida simulada y verificar que
aparece un mensaje de error en su lugar.

### Tests for User Story 2

- [X] T009 [P] [US2] Extend `SanitizeAndCopyButton` tests in `src/components/text-inspector/SanitizeAndCopyButton.test.tsx` covering: shows a success confirmation message after a resolved clipboard write, shows an error message after a rejected clipboard write (without altering the already-sanitized visible text), and the confirmation/error message disappears automatically after the auto-dismiss delay (use fake timers) (Acceptance Scenarios 1–3 of US2)

### Implementation for User Story 2

- [X] T010 [US2] Update `SanitizeAndCopyButton` (`src/components/text-inspector/SanitizeAndCopyButton.tsx`) to render the success/error text message based on `status` from `useSanitizeAndCopy`, with no message when `status === 'idle'`

**Checkpoint**: User Stories 1 AND 2 both work independently — sanitize+copy works, and the user always sees
explicit success/error feedback that disappears on its own.

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
  - User Story 2 (P2): Depends on `SanitizeAndCopyButton` scaffolding from User Story 1 (T007), since it extends the same component
- **Polish (Phase 5)**: Depends on all desired user stories being complete

### User Story Dependencies

- User Story 1 (P1): Foundational only — MVP scope for this feature
- User Story 2 (P2): Builds on the `SanitizeAndCopyButton` scaffold created in User Story 1

### Parallel Opportunities

- T002 and T004 (foundational tests) can be written in parallel (different files)
- T006 (US1 test) and later T009 (US2 test extension) both touch the same test file, so they proceed
  sequentially within `SanitizeAndCopyButton.test.tsx`

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (`removeHiddenCharacters`, `useSanitizeAndCopy`)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (sanitize + copy works, text updates visibly)
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → MVP delivered (sanear y copiar en una acción)
3. Add User Story 2 → test independently → deploy/demo (confirmación de éxito/error auto-descartable)
4. Polish phase → final cleanup and full validation
5. Each story adds value without breaking previous stories
