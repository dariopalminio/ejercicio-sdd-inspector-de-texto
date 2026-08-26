# Phase 0 Research: Panel de Métricas Dinámicas (REQ-02)

No quedan marcadores `NEEDS CLARIFICATION` en el Technical Context del plan (la única ambigüedad relevante,
el conteo de líneas para texto vacío/con salto final, ya se resolvió en `/speckit.clarify`). Esta fase
documenta las decisiones técnicas concretas necesarias para el panel de métricas y el layout Topbar/Footer.

## Cálculo de métricas

- **Decision**: Extraer una función pura `calculateTextMetrics(content: string)` en `src/utils/textMetrics.ts`
  que devuelva `{ words, characters, lines }`, reutilizando las reglas ya confirmadas en `spec.md`:
  palabras = secuencias no separadas por espacios en blanco; caracteres = `content.length` (incluye espacios);
  líneas = `content === '' ? 0 : content.split('\n').length`.
- **Rationale**: Una función pura y sin estado es trivialmente testeable (Principio III de la constitución) y
  reutilizable tanto por el hook de UI como por pruebas unitarias directas, sin duplicar la lógica de conteo.
- **Alternatives considered**: Calcular las métricas directamente dentro de `MetricsPanel` — rechazado por
  violar el Principio V (Simplicity and Maintainability), que exige extraer lógica de procesamiento a
  utilidades tipadas en vez de embeberla en componentes de UI.

## Debounce del recálculo

- **Decision**: Envolver `calculateTextMetrics` en un hook `useTextMetrics(content: string)` que aplica un
  debounce de ~150ms (usando un `useEffect` + `setTimeout`/`clearTimeout`) antes de exponer las métricas
  recalculadas, tal como lo exige la constitución (RNF-03) para evitar bloqueos ante pegados extensos.
- **Rationale**: RNF-03 de `docs/product-requirements.md` y la constitución del proyecto exigen explícitamente
  un debounce de ~150ms para el cálculo de métricas y el escaneo de seguridad.
- **Alternatives considered**: Recalcular de forma síncrona en cada tecla — rechazado porque no cumple el
  requisito de debounce de la constitución, aunque el cálculo actual sea barato; se prioriza la conformidad
  con RNF-03 desde el inicio para no tener que refactorizar cuando se agregue el escaneo de seguridad (FR-07).

## Layout compartido (Topbar/Footer)

- **Decision**: Crear `AppLayout` en `src/components/layout/AppLayout.tsx` que compone `Topbar` + `children`
  (la región MAIN CONTENT existente) + `Footer`, y usarlo desde `InspectorPage` en vez de renderizar
  `MainContent` directamente.
- **Rationale**: Mantiene `MainContent` enfocado únicamente en el contenido específico del inspector (Principio
  V), y dejará espacio para un futuro `Sidebar` (fuera de alcance de esta especificación) sin reestructurar
  `MainContent`.
- **Alternatives considered**: Agregar el Topbar/Footer directamente dentro de `MainContent.tsx` — rechazado
  porque el spec (FR-017, Assumptions) aclara que son elementos de layout compartidos a nivel de página, no
  exclusivos de MAIN CONTENT.

## Contenido del Topbar y Footer

- **Decision**: El Topbar muestra el texto estático "Inspector de Texto" alineado a la izquierda dentro de un
  landmark `<header>`; el Footer muestra el texto estático "Codificación UTF-8" dentro de un landmark
  `<footer>`. Ambos son de solo lectura, sin estado ni props dinámicas en esta especificación.
- **Rationale**: FR-015/FR-016 piden contenido fijo (nombre de la app, codificación por defecto); no hay
  ningún requisito de detección dinámica de codificación en el alcance de FR-02.
- **Alternatives considered**: Detectar dinámicamente la codificación del navegador — rechazado por no estar
  solicitado y por añadir complejidad no justificada (RNF-02 exige mantener el procesamiento simple y local).

## Pruebas

- **Decision**: Reutilizar Jest + React Testing Library + `@testing-library/user-event` v13 (ya configurados en
  FR-01), agregando pruebas unitarias puras para `calculateTextMetrics` (sin renderizado) y pruebas de
  componente para `MetricsPanel`, `Topbar` y `Footer`.
- **Rationale**: Consistencia con el enfoque de FR-01 y con AGENTS.md (Testing Library + comportamiento real
  del DOM); las funciones puras se prueban directamente sin necesidad de renderizar componentes.
- **Alternatives considered**: Ninguna — mismo enfoque validado en FR-01.

**Output**: Todas las decisiones de Fase 0 quedan resueltas; no quedan `NEEDS CLARIFICATION` pendientes.
