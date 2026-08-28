<!--
Sync Impact Report
- Version change: none -> 1.0.0
- Modified principles: none (new constitution scaffold)
- Added sections: Core Principles, Additional Constraints, Development Workflow, Governance
- Removed sections: none
- Follow-up TODOs: none
-->

# Inspector de Texto Constitution
<!-- modificar -->
## Core Principles

### I. Privacy by Default
All text inspection and sanitization logic MUST run locally in the browser. No external APIs,
telemetry, or server-side processing are allowed for analysis, counting, or hidden-character
detection. This preserves user trust and keeps the app compliant with the zero-data requirement of
this project.

### II. User-Visible Safety and Clarity
Every feature MUST present clear, immediate feedback on status and risk. Limit indicators, warning
counts, and sanitizer actions MUST be explicit enough that a user can understand whether content is
within tolerance or contains suspicious hidden characters without guesswork. Clear UX is part of
functional correctness.

### III. Test-First Verification
Behavioral changes MUST be driven by tests that exercise real user-visible outcomes: metrics, limit
logic, hidden-character detection, and sanitization actions. The red-green-refactor cycle is required
for any feature or bug fix; no production change is considered complete without passing relevant
verification.

### IV. Accessibility and Inclusive Design
The interface MUST prioritize readable contrast, semantic controls, and understandable state signals.
Keyboard and screen-reader accessible patterns are required where practical, and visual status
indicators MUST remain legible without relying on color alone. The app must remain usable for a wide
range of users and devices.

### V. Simplicity and Maintainability
The implementation MUST favor small, focused components and reusable text-analysis helpers over ad
hoc logic embedded in UI code. Complex behavior must be decomposed into typed utilities, with clear
ownership and minimal duplication. Simplicity reduces defect risk and keeps future changes aligned
with the specification.

## Additional Constraints

- Always read product requirements in `docs/product-requirements.md` as basic context.
- The app MUST remain a browser-only SPA built with React and TypeScript.
- The project MUST continue to honor the requirements for a dark premium interface, responsive
  layout, and accessibility-focused visual feedback.
- Text-processing logic MUST be deterministic and local; hidden-character detection and cleanup MUST
  be based on explicit Unicode control patterns rather than opaque third-party services.
- Performance-sensitive operations MUST use a debounce of roughly 150 ms for repeated calculations
  triggered by input or paste events.
- The default CRA scaffold MUST not be treated as the final product; implementation work MUST advance
  toward the "Inspector de Texto" specification.

## Development Workflow

- Requirements and implementation decisions MUST be traceable to the project specification and docs in
  the repository.
- Changes that affect metrics, limit checks, or hidden-character behavior MUST include or update tests
  covering the affected user flow.
- The app MUST be validated with the relevant test command and, when behavior changes affect the
  product surface, a clean build check before completion.
- Unclear or ambiguous product requirements MUST be resolved against the documented specification before
  implementation proceeds.

## Governance

This Constitution governs all work on the Inspector de Texto exercise. It supersedes ad hoc
interpretation of the project scope and requires alignment with the requirement documents before any
feature is considered complete.

Amendments MUST be documented as a clearly versioned change in the constitution, with a summary of the
rationale, affected principles or sections, and the amendment date. All significant changes MUST be
reviewed against the project specification to confirm they remain consistent with scope, privacy, and
accessibility requirements.

Versioning follows semantic versioning:
- MAJOR: backwards-incompatible governance or principle changes
- MINOR: new principle or materially expanded guidance
- PATCH: wording, clarification, or non-semantic refinements

Compliance review expectations:
- Every change that affects product behavior MUST confirm alignment with the spec and relevant tests.
- Every UI change MUST remain consistent with the dark premium design and accessibility requirements.
- The constitution and implementation MUST stay in sync; unresolved conflicts are resolved in favor of
  the project specification and the governing principle of privacy by default.

**Version**: 1.0.0 | **Ratified**: 2026-08-26 | **Last Amended**: 2026-08-26
