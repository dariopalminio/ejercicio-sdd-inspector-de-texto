# Phase 0 Research: Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

La única ambigüedad relevante (alcance exacto de detección) ya se resolvió en `/speckit.clarify`. Esta fase
documenta las decisiones técnicas concretas para implementar el panel.

## Expresión regular de detección

- **Decision**: Definir una única expresión regular global
  `/[\u200B\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F]/g` que capture: zero-width space (`\u200B`), BOM
  (`\uFEFF`), y el rango de control ASCII `U+0000–U+001F` **excluyendo** tabulación (`\u0009`), salto de línea
  (`\u000A`) y retorno de carro (`\u000D`) — confirmado en `/speckit.clarify`.
- **Rationale**: Una única regex con la bandera global permite contar todas las ocurrencias con
  `(content.match(regex) ?? []).length`, cumpliendo FR-027/FR-028 sin lógica adicional de iteración manual.
- **Alternatives considered**: Tres expresiones regulares separadas (una por tipo de artefacto) sumando sus
  conteos — rechazado por ser más verboso sin aportar beneficio, ya que el requisito solo pide un conteo total
  combinado, no un desglose por tipo.

## Cálculo del reporte de seguridad

- **Decision**: Extraer una función pura `detectHiddenCharacters(content: string)` en
  `src/utils/hiddenCharacters.ts` que devuelva `{ count: number; status: 'safe' | 'alert' }`, donde
  `status = count === 0 ? 'safe' : 'alert'`.
- **Rationale**: Mismo patrón de función pura ya validado en REQ-02 (`calculateTextMetrics`) y REQ-03
  (`calculateLimitStatus`); mantiene la lógica de detección fuera de los componentes de UI (Principio V).
- **Alternatives considered**: Calcular el conteo directamente dentro de `SecurityPanel` — rechazado por el
  mismo motivo que en specs anteriores (Principio V).

## Debounce del recálculo

- **Decision**: Envolver `detectHiddenCharacters` en un hook `useSecurityReport(content: string)` que aplica
  un debounce de ~150ms (mismo mecanismo que `useTextMetrics`), reutilizando el patrón de `useEffect` +
  `setTimeout`/`clearTimeout`.
- **Rationale**: NFR-03 exige debounce para el escaneo de seguridad explícitamente (no solo para métricas);
  mantiene consistencia con `useTextMetrics` ya implementado.
- **Alternatives considered**: Reutilizar directamente `useTextMetrics` con una función de cálculo
  parametrizada — rechazado por mezclar dos dominios de datos distintos (métricas vs. seguridad) en un mismo
  hook genérico, lo que reduciría la claridad y trazabilidad de cada requisito funcional.

## Ubicación e integración en el Sidebar

- **Decision**: Agregar `SecurityPanel` como un segundo hijo dentro del mismo `<Sidebar>` que ya renderiza
  `LimitsPanel` en `InspectorPage`, sin crear un segundo `<aside>` ni modificar `Sidebar.tsx`.
- **Rationale**: FR-032 pide que el panel de seguridad viva en la región SIDEBAR ya introducida por REQ-03,
  independiente del panel de Control de Límites; ambos paneles pueden coexistir como hijos separados del mismo
  landmark `<aside>`.
- **Alternatives considered**: Crear una segunda región de layout específica para el panel de seguridad —
  rechazado por duplicar innecesariamente la estructura de Sidebar ya resuelta.

## Pruebas

- **Decision**: Reutilizar Jest + React Testing Library + `@testing-library/user-event` v13 (ya configurados),
  agregando pruebas unitarias puras para `detectHiddenCharacters` (cubriendo cada tipo de artefacto y los
  caracteres de formato excluidos) y pruebas de componente/hook para `useSecurityReport` y `SecurityPanel`.
- **Rationale**: Consistencia con el enfoque de REQ-01/REQ-02/REQ-03.
- **Alternatives considered**: Ninguna — mismo enfoque validado.

**Output**: Todas las decisiones de Fase 0 quedan resueltas; no quedan `NEEDS CLARIFICATION` pendientes.
