# Phase 0 Research: Panel de Control de Límites (REQ-03)

La única ambigüedad relevante del spec (formato numérico junto a la barra de progreso) ya se resolvió en
`/speckit.clarify`. Esta fase documenta las decisiones técnicas concretas para implementar el panel.

## Cálculo del estado del límite

- **Decision**: Extraer una función pura `calculateLimitStatus({ value, max }: { value: number; max: number })`
  en `src/utils/limitStatus.ts` que devuelva `{ percentage: number; status: 'within' | 'over' }`, donde
  `percentage = max <= 0 ? (value > 0 ? 100 : 0) : Math.round((value / max) * 100)` y
  `status = value <= max ? 'within' : 'over'`.
- **Rationale**: Reutiliza el mismo patrón de función pura + hook ya validado en REQ-02
  (`calculateTextMetrics`/`useTextMetrics`), cumple FR-026 (igual al máximo = "within") y el edge case de
  `max = 0` documentado en `spec.md`. El redondeo al entero más cercano fue confirmado en `/speckit.clarify`.
- **Alternatives considered**: Calcular el estado directamente dentro del componente `LimitProgress` —
  rechazado por el Principio V de la constitución (extraer lógica de cálculo a utilidades tipadas).

## Reutilización de las métricas de REQ-02

- **Decision**: Elevar (`lift state up`) las llamadas a `useTextDocument()` y `useTextMetrics(content)` desde
  `MainContent` hacia `InspectorPage`, pasando `content`/`onChange`/`onClear` y el objeto `metrics` como props
  a `MainContent`, y `metrics` como prop a `LimitsPanel` (vía `Sidebar`).
- **Rationale**: FR-024 exige reutilizar el valor ya calculado sin duplicar la lógica de conteo. Elevar el
  estado evita instanciar `useTextMetrics` dos veces (una en MAIN CONTENT y otra en SIDEBAR) con posibles
  desincronizaciones de debounce.
- **Alternatives considered**: Duplicar la llamada a `useTextMetrics(content)` dentro de `LimitsPanel` —
  rechazado porque introduce dos temporizadores de debounce independientes que podrían mostrar valores
  transitoriamente distintos entre MAIN CONTENT y SIDEBAR, violando la intención de FR-024.

## Configuración del límite (selector + valor máximo)

- **Decision**: Crear un hook `useLimitConfig()` en `src/hooks/useLimitConfig.ts` con estado
  `{ limitType: 'words' | 'characters' | 'lines'; maxValue: number }`, valores por defecto
  `{ limitType: 'words', maxValue: 500 }` (per Assumptions de `spec.md`), y una función
  `setMaxValue(rawInput: string)` que solo actualiza `maxValue` si `rawInput` es un entero positivo válido,
  ignorando la entrada inválida (FR-025) sin lanzar errores.
- **Rationale**: Igual que `useTextDocument`, encapsula el estado de configuración en un hook reutilizable y
  testeable de forma aislada, separado de los componentes de UI (Principio V).
- **Alternatives considered**: Validar la entrada directamente en el componente `MaxLimitInput` — rechazado
  por duplicar potencialmente la regla de validación si se necesita en más de un lugar.

## Control de tipo de límite: radio buttons vs. menú desplegable

- **Decision**: Implementar `LimitTypeSelector` como un grupo de botones de opción (`<input type="radio">`)
  con las tres opciones (Palabras, Caracteres, Líneas) visibles simultáneamente, en vez de un `<select>`.
- **Rationale**: Confirmado explícitamente por el usuario del proyecto; con solo tres opciones, los radio
  buttons exponen todas las alternativas de un vistazo sin requerir un paso adicional de apertura del menú,
  mejorando la claridad (Principio II) para un conjunto pequeño y fijo de opciones.
- **Alternatives considered**: `<select>` nativo (implementación original) — funcionalmente válido y accesible,
  pero requiere abrir el menú para ver las opciones; se descarta en favor de la preferencia explícita por
  radio buttons.

## Layout: Sidebar y AppLayout responsivo

- **Decision**: Extender `AppLayout` para aceptar un prop opcional `sidebar?: ReactNode`, renderizando un
  contenedor `flex flex-col md:flex-row` que coloca `children` (MAIN CONTENT) y `sidebar` (SIDEBAR) en fila en
  pantallas medianas/anchas, y apilados en columna en móviles, conforme a NFR-05.
- **Rationale**: Reutiliza el mismo componente de layout ya introducido en REQ-02 en vez de crear un layout
  paralelo; mantiene el Topbar/Footer sin cambios.
- **Alternatives considered**: Crear un nuevo componente de layout específico para páginas con Sidebar —
  rechazado por duplicar la estructura de Topbar/Footer ya resuelta en `AppLayout`.

## Pruebas

- **Decision**: Reutilizar Jest + React Testing Library + `@testing-library/user-event` v13 (ya configurados),
  agregando pruebas unitarias puras para `calculateLimitStatus` y `useLimitConfig`, y pruebas de componente
  para `LimitTypeSelector`, `MaxLimitInput`, `LimitProgress`, `LimitsPanel` y `Sidebar`.
- **Rationale**: Consistencia con el enfoque de REQ-01/REQ-02.
- **Alternatives considered**: Ninguna — mismo enfoque validado.

**Output**: Todas las decisiones de Fase 0 quedan resueltas; no quedan `NEEDS CLARIFICATION` pendientes.
