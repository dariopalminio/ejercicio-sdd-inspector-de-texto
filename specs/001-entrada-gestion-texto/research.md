# Phase 0 Research: Entrada y Gestión de Texto (FR-01)

No quedaron marcadores `NEEDS CLARIFICATION` en el Technical Context del plan; esta fase documenta las
decisiones técnicas concretas necesarias para diseñar el componente MAIN CONTENT.

## Estilo visual / CSS

- **Decision**: Incorporar Tailwind CSS (con PostCSS/autoprefixer) al proyecto CRA existente, siguiendo la
  paleta oscura (`slate-900`/`slate-950` fondos, `emerald-400`/`emerald-500` acentos) descrita en
  `docs/product-requirements.md` (NFR-04).
- **Rationale**: NFR-01 y NFR-04 del producto exigen explícitamente Tailwind CSS y un tema oscuro premium.
  Introducirlo desde esta primera especificación evita reescribir estilos ad hoc que luego haya que migrar.
- **Alternatives considered**: CSS Modules / CSS plano (rechazado: no cumple el stack declarado en NFR-01);
  styled-components (rechazado: agrega una dependencia de runtime no requerida por la especificación).

## Gestión del estado del texto

- **Decision**: Encapsular el texto de trabajo y la acción de vaciar en un hook reutilizable
  `useTextDocument()` (estado local de React vía `useState`), expuesto desde `src/hooks`.
- **Rationale**: La constitución (Principio V) exige lógica extraída a utilidades tipadas en vez de estado
  disperso en componentes de UI. Este hook será la base que consuman las especificaciones futuras (FR-02
  métricas, FR-07 seguridad, FR-08 sanitización) sin duplicar el estado del documento.
- **Alternatives considered**: Librerías de manejo de estado global (Redux, Zustand) — rechazadas por
  sobre-ingeniería para un único documento de texto en memoria sin necesidades de estado compartido complejo
  en esta etapa.

## Pruebas

- **Decision**: Usar Jest + React Testing Library + `@testing-library/user-event` (ya presentes en
  `package.json`), ejecutando `npm test -- --watch=false` en CI/validación local.
- **Rationale**: Ya forman parte del scaffold CRA y son las herramientas mandadas por `AGENTS.md` para
  comportamiento visible por el usuario (escritura, pegado, vaciado, navegación por teclado).
- **Alternatives considered**: Cypress/Playwright end-to-end — innecesario para el alcance de esta
  especificación (un único componente de UI sin flujos multi-página); puede reconsiderarse en specs futuras.

## Accesibilidad y navegación por teclado

- **Decision**: Usar un landmark `<main>` para la región MAIN CONTENT, un `<textarea>` nativo con
  `aria-label`/`<label>` asociado, y un `<button type="button">` nativo para "Vaciar" (foco y activación por
  teclado gratuitos gracias a elementos nativos, sin necesidad de manejar `role`/`tabIndex` manualmente).
- **Rationale**: Los elementos nativos de HTML cumplen FR-005/FR-008 y la User Story 3 sin lógica adicional,
  reduciendo superficie de error de accesibilidad.
- **Alternatives considered**: `div` con `role="textbox"`/`role="button"` y manejo manual de eventos de
  teclado — rechazado por mayor complejidad y riesgo de incumplir accesibilidad respecto a elementos nativos.

## Umbral de rendimiento para pegado extenso

- **Decision**: No fijar un límite numérico de caracteres en esta especificación; confiar en el
  comportamiento nativo del `<textarea>` del navegador (que maneja pegados grandes sin bloquear el hilo
  principal para operaciones de solo texto) y diferir cualquier optimización adicional (debounce, streaming)
  a especificaciones posteriores donde se agregue procesamiento pesado (conteo, escaneo de seguridad).
- **Rationale**: FR-01 solo cubre entrada y vaciado de texto, sin cálculo derivado; el riesgo de bloqueo de UI
  surge en fases posteriores (FR-02/FR-07), donde la constitución ya exige debounce de ~150ms.
- **Alternatives considered**: Definir un límite arbitrario de caracteres en esta spec — rechazado por no
  estar respaldado por un requisito funcional explícito de FR-01.

**Output**: Todas las decisiones de Fase 0 quedan resueltas; no quedan `NEEDS CLARIFICATION` pendientes.
