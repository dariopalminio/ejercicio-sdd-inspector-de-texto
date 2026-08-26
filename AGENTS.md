# AGENTS.md

## Project overview

This repository is a React + TypeScript single-page app for the "Inspector de Texto" exercise. The app analyzes text in-browser, tracks word/character/line limits, detects hidden Unicode characters, and lets users sanitize and copy clean text.

Primary references:
- [README.md](README.md)
- [docs/project-requirements.md](docs/project-requirements.md)
- [docs/enunciado-del-ejercicio.md](docs/enunciado-del-ejercicio.md)
- [docs/plan-de-trabajo.md](docs/plan-de-trabajo.md)

## Stack and constraints

- React 19 + TypeScript
- Create React App with `react-scripts` (the repo is currently in the default CRA starter state)
- Testing Library + Jest
- No backend or network dependency for text analysis; all processing must remain local in the browser
- The project specification calls for a dark, sleek interface and mentions Tailwind CSS, but the repo is still a minimal CRA app until implementation begins
- Keep behavior and UI aligned with the project spec, especially the accessibility and "sleek dark" requirements

## Common commands

```bash
npm install
npm start
npm test -- --watch=false
npm run build
```

## Working conventions

- Prefer small, focused React components and clear state ownership.
- Keep text-processing logic in reusable helper functions or typed utilities instead of embedding it directly in UI components.
- Use TypeScript types for state, props, and derived values.
- Match the functional requirements in [docs/project-requirements.md](docs/project-requirements.md), not the default CRA starter content.
- Preserve the browser-only, zero-data policy: avoid external APIs or server-side processing.
- If implementing performance-sensitive logic, add a debounce of roughly 150 ms for heavy recalculations.
- Keep UI feedback explicit: limit status, progress bar, hidden-character alerts, and sanitizer actions should be easy to understand at a glance.
- Do not treat the current default CRA screen as the final product. The app should evolve toward the inspector functionality described in the docs.

## Expected implementation behaviors

- Input text is editable in a textarea-like field with a clear reset/empty action.
- Live metrics: total words, characters, and lines.
- A selector chooses whether the limit uses words, characters, or lines.
- A visible checkbox allows excluding whitespace when counting characters.
- A progress indicator and status text reflect whether the current value is within or above the configured max.
- Hidden characters such as zero-width space, BOM, and ASCII control chars are detected continuously and counted.
- The "Limpiar y Copiar" action removes hidden characters and copies the sanitized result to the clipboard.

## Testing expectations

- Add or update tests for user-visible behavior, especially text metrics, limit logic, hidden-character detection, and sanitizer actions.
- Prefer Testing Library queries and real DOM behavior over implementation-detail assertions.
- Keep tests deterministic and fast. Avoid unnecessary network or browser-only assumptions.

## Before finishing work

- Run the relevant tests and verify the app builds cleanly when the change affects core behavior.
- If a UI change is added, make sure it remains consistent with the dark premium design described in the requirements.
- Do not duplicate existing docs; link to the project docs instead of re-explaining them in detail.
