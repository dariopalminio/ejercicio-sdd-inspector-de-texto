# Phase 0 Research: Sanitización y Exportación (REQ-05)

No quedan `NEEDS CLARIFICATION` en el Technical Context. Esta fase documenta las decisiones técnicas concretas
para implementar la sanitización y el flujo de copia al portapapeles.

## Remoción de caracteres ocultos

- **Decision**: Agregar `removeHiddenCharacters(content: string): string` en `src/utils/hiddenCharacters.ts`,
  reutilizando la misma constante de regex ya usada por `detectHiddenCharacters` (REQ-04), aplicando
  `content.replace(HIDDEN_CHARACTERS_REGEX, '')`.
- **Rationale**: FR-036 exige remover exactamente el mismo conjunto de artefactos ya detectado por REQ-04; compartir
  la regex garantiza que "lo que se detecta" y "lo que se remueve" nunca diverjan.
- **Alternatives considered**: Definir una regex independiente para la remoción — rechazado por el riesgo de
  que ambas reglas (detección y remoción) se desincronicen con el tiempo.

## Actualización del texto visible

- **Decision**: `useSanitizeAndCopy` recibe `content` y una función `onSanitized: (next: string) => void` (el
  `setContent` de `useTextDocument`, ya expuesto por `InspectorPage`/`MainContent`); al ejecutar la acción,
  calcula el texto saneado y llama a `onSanitized(saneado)` antes de copiarlo, actualizando el documento de
  entrada visible (FR-037, confirmado como asunción en `spec.md`).
- **Rationale**: Reutiliza el mismo mecanismo de actualización de estado ya usado por `TextInputArea`
  (`onChange`) y `ClearTextButton` (`onClear`), sin introducir una fuente de verdad paralela para el texto.
- **Alternatives considered**: Mantener el texto visible sin cambios y solo sanear la copia del portapapeles —
  rechazado porque la especificación (Assumptions) confirma que el usuario debe ver el resultado saneado
  reflejado en el área de texto.

## Copia al portapapeles y manejo de errores

- **Decision**: Usar `navigator.clipboard.writeText(saneado)` (Promise-based). En `.then()` marcar
  `status: 'success'`; en `.catch()` marcar `status: 'error'`. En ambos casos, programar un `setTimeout` de
  ~2500ms que vuelva el estado a `'idle'` (per Assumptions de `spec.md`), limpiando el timeout anterior si la
  acción se repite antes de que expire.
- **Rationale**: Es la API est\u00e1ndar del navegador para escritura en el portapapeles; el manejo expl\u00edcito de
  \u00e9xito/error cumple FR-039/FR-040 sin necesitar l\u00f3gica de reintento (fuera de alcance, per Assumptions).
- **Alternatives considered**: `document.execCommand('copy')` (API obsoleta) — rechazada por estar deprecada y
  requerir un elemento DOM auxiliar; la Clipboard API moderna es el est\u00e1ndar actual soportado por los
  navegadores evergreen objetivo (Technical Context).

## Pruebas con Clipboard API

- **Decision**: En las pruebas, reemplazar `navigator.clipboard` con un mock (`jest.fn()` para `writeText`)
  antes de cada prueba, ya que jsdom no implementa la Clipboard API real. Usar `jest.useFakeTimers()` para
  verificar el auto-dismiss del mensaje de confirmación/error, siguiendo el mismo patrón ya usado para
  `useTextMetrics`/`useSecurityReport`.
- **Rationale**: Es la forma est\u00e1ndar de probar c\u00f3digo que depende de APIs del navegador no implementadas en el
  entorno de pruebas jsdom.
- **Alternatives considered**: Omitir las pruebas de la interacci\u00f3n con el portapapeles — rechazado por el
  Principio III (Test-First Verification) de la constituci\u00f3n, que exige pruebas para el comportamiento
  visible por el usuario, incluyendo \u00e9xito y fallo de la copia.

## Ubicación del botón

- **Decision**: Colocar `SanitizeAndCopyButton` dentro de `MainContent`, junto a `ClearTextButton`, en la misma
  fila de acciones sobre el área de texto (consistente con la maqueta de `docs/product-requirements.md`, que
  muestra el botón "Limpiar y Copiar" bajo el textarea, dentro de MAIN CONTENT).
- **Rationale**: FR-035 pide la acción "junto al área de texto principal (MAIN CONTENT)"; no requiere una
  nueva región de layout.
- **Alternatives considered**: Ubicar el botón en el Sidebar junto a `SecurityPanel` — rechazado porque FR-035
  especifica expl\u00edcitamente MAIN CONTENT, no SIDEBAR.

**Output**: Todas las decisiones de Fase 0 quedan resueltas; no quedan `NEEDS CLARIFICATION` pendientes.
