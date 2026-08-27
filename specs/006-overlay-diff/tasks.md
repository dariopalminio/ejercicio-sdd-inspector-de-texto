# Tasks: Visualizador Overlay/Diff de Caracteres Ocultos

**Input**: Design documents from `/specs/006-overlay-diff/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Incluidos porque la constitución exige pruebas de comportamiento y la spec define escenarios observables.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo con tareas del mismo bloque cuando trabaja en otro archivo y no depende de una tarea incompleta.
- **[Story]**: Historia de usuario asociada; las tareas de setup, fundamentos y polish no llevan esta etiqueta.
- Todas las tareas incluyen la ruta exacta del archivo afectado.

## Path Conventions

- **Single project**: `src/` en la raíz del repositorio.
- **Feature documentation**: `specs/006-overlay-diff/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar la superficie de archivos y confirmar las convenciones existentes sin añadir dependencias.

- [X] T001 Revisar las props y los puntos de composición actuales de `src/pages/InspectorPage.tsx` y `src/components/text-inspector/MainContent.tsx` para fijar el contrato de integración del overlay.
- [ ] T002 [P] Documentar en `specs/006-overlay-diff/tasks.md` la trazabilidad FR-043 a FR-055, SC-019 a SC-024 y los artefactos de diseño usados para la implementación.
- [X] T003 [P] Confirmar en `package.json` y `src/setupTests.ts` que React Testing Library, Jest y el entorno de pruebas existentes cubren la feature, sin instalar dependencias nuevas.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Crear la representación derivada y la fuente única de clasificación antes de construir cualquier flujo de UI.

**Checkpoint**: El helper de segmentación debe poder convertir cualquier texto del alcance de REQ-04 en segmentos deterministas sin mutar la entrada.

- [X] T004 [P] [US1] Añadir tipos `ArtifactType` y `AnnotatedSegment` en `src/utils/annotatedText.ts` según `specs/006-overlay-diff/data-model.md`.
- [X] T005 [P] [US1] Exponer una clasificación reutilizable para ZWS, BOM y controles ASCII en `src/utils/hiddenCharacters.ts`, conservando el regex y el conteo actuales.
- [X] T006 [US1] Implementar `annotateText(content)` en `src/utils/annotatedText.ts`, preservando el orden, espacios y saltos de línea, con una insignia por ocurrencia y sin modificar `content`.
- [X] T007 [P] [US1] Crear pruebas unitarias para `annotateText` en `src/utils/annotatedText.test.ts`, cubriendo ZWS, BOM, controles, duplicados, mezcla de tipos y caracteres excluidos.
- [X] T008 [US1] Ejecutar las pruebas de `src/utils/annotatedText.test.ts` y corregir cualquier discrepancia entre segmentación, `detectHiddenCharacters` y `removeHiddenCharacters` antes de continuar.

---

## Phase 3: User Story 1 - Localizar caracteres ocultos (Priority: P1) 🎯 MVP

**Goal**: Mostrar una insignia textual por cada artefacto en su posición relativa, sin alterar el texto fuente.

**Independent Test**: Con texto que contenga ZWS, BOM y controles en posiciones conocidas, la vista activa presenta `[ZWS]`, `[BOM]` y `[CTRL]` una vez por ocurrencia y conserva el resto del texto en orden.

### Tests for User Story 1

- [X] T009 [P] [US1] Crear pruebas de contrato del componente en `src/components/text-inspector/ProblemOverlay.test.tsx` para las etiquetas `[ZWS]`, `[BOM]`, `[CTRL]`, el orden de segmentos y el estado `Sin problemas`.
- [ ] T010 [P] [US1] Añadir pruebas de integración en `src/pages/InspectorPage.test.tsx` para activar la vista con texto mixto y comprobar que el valor del textarea y el reporte de seguridad no cambian.

### Implementation for User Story 1

- [X] T011 [US1] Implementar `ProblemOverlay` en `src/components/text-inspector/ProblemOverlay.tsx` como representación de solo lectura derivada de `content` y con una insignia visible por segmento de artefacto.
- [X] T012 [US1] Aplicar en `src/components/text-inspector/ProblemOverlay.tsx` etiquetas textuales y estilos de alerta rojo/ámbar con contraste suficiente, sin depender solo del color.
- [X] T013 [US1] Integrar la capa visual en `src/components/text-inspector/MainContent.tsx` usando un contenedor compartido con el textarea, manteniendo el textarea como única superficie editable.
- [X] T014 [US1] Conectar `ProblemOverlay` con los segmentos derivados en `src/components/text-inspector/MainContent.tsx` sin duplicar la lógica de detección ni modificar `content`.
- [X] T015 [US1] Ejecutar las pruebas de `src/utils/annotatedText.test.ts` y `src/components/text-inspector/ProblemOverlay.test.tsx`, y ajustar la implementación hasta que la historia MVP sea independiente y verde.

**Checkpoint**: US1 permite localizar cada artefacto conocido y mantiene intactos el documento, el conteo y el reporte.

---

## Phase 4: User Story 2 - Alternar la inspección sin alterar el documento (Priority: P1)

**Goal**: Mostrar y ocultar la capa de forma reversible, manteniendo el documento fuente como único valor operativo.

**Independent Test**: Alternar la vista repetidamente sobre texto con artefactos cambia solo la visibilidad de la capa; editar o vaciar el textarea actualiza el overlay sin etiquetas obsoletas.

### Tests for User Story 2

- [ ] T016 [P] [US2] Añadir pruebas de alternancia y estado semántico en `src/components/text-inspector/ProblemOverlay.test.tsx`, cubriendo `Mostrar problemas`, `Ocultar problemas`, `aria-pressed` y el estado limpio.
- [ ] T017 [P] [US2] Ampliar las pruebas de integración en `src/pages/InspectorPage.test.tsx` para edición, vaciado, texto vacío y preservación de métricas, límites y reporte durante la alternancia.

### Implementation for User Story 2

- [X] T018 [US2] Añadir el estado `problemViewVisible` y su alternancia en `src/pages/InspectorPage.tsx` o en el propietario de estado definido por la composición actual, iniciándolo oculto.
- [X] T019 [US2] Añadir el control textual `Mostrar problemas`/`Ocultar problemas` en `src/components/text-inspector/MainContent.tsx`, con estado semántico, foco visible y operación de teclado nativa.
- [X] T020 [US2] Renderizar `Sin problemas` sin insignias cuando no haya artefactos en `src/components/text-inspector/ProblemOverlay.tsx`.
- [X] T021 [US2] Asegurar que la capa se derive siempre del `content` actual y no escriba en el textarea, métricas, límites, `useSecurityReport` ni `useSanitizeAndCopy` mediante `src/components/text-inspector/MainContent.tsx` y `src/pages/InspectorPage.tsx`.
- [ ] T022 [US2] Ejecutar las pruebas de integración de `src/pages/InspectorPage.test.tsx` y corregir estados obsoletos o efectos de alternancia hasta cubrir SC-021.

**Checkpoint**: US1 y US2 funcionan por separado; la vista es reversible y no muta ningún valor de negocio.

---

## Phase 5: User Story 3 - Interpretar las alertas visuales (Priority: P2)

**Goal**: Hacer que las insignias y estados sean comprensibles, accesibles y utilizables en layouts móviles y de escritorio.

**Independent Test**: Navegar al control mediante teclado comunica el estado; el overlay conserva alineación, saltos de línea y desplazamiento en texto largo sin depender de color.

### Tests for User Story 3

- [ ] T023 [P] [US3] Añadir pruebas de accesibilidad del control y las insignias en `src/components/text-inspector/ProblemOverlay.test.tsx`, cubriendo nombres accesibles, estado visible/oculto, foco y ausencia de interacción de la capa.
- [ ] T024 [P] [US3] Añadir pruebas de multilinea, espacios, caracteres adyacentes y estado limpio en `src/utils/annotatedText.test.ts` y `src/components/text-inspector/ProblemOverlay.test.tsx`.
- [ ] T025 [P] [US3] Ampliar `src/pages/InspectorPage.test.tsx` para comprobar que una edición durante la vista activa refresca las insignias tras el debounce existente.

### Implementation for User Story 3

- [ ] T026 [US3] Sincronizar estilos de tipografía, espacios, saltos de línea, wrapping y desplazamiento entre la capa y el textarea en `src/components/text-inspector/MainContent.tsx` y `src/components/text-inspector/ProblemOverlay.tsx`.
- [ ] T027 [US3] Marcar la capa como no interactiva y preservar el foco/entrada del textarea en `src/components/text-inspector/ProblemOverlay.tsx`, manteniendo el control fuera de la capa.
- [ ] T028 [US3] Añadir información complementaria del código Unicode sin sustituir `[CTRL]` en `src/components/text-inspector/ProblemOverlay.tsx`, siempre que sea accesible y no interfiera con el texto editable.
- [ ] T029 [US3] Revisar clases responsive y contraste de alertas en `src/components/text-inspector/MainContent.tsx` y `src/components/text-inspector/ProblemOverlay.tsx` conforme a `docs/product-requirements.md`.
- [ ] T030 [US3] Ejecutar las pruebas enfocadas de US3 y corregir problemas de accesibilidad, alineación o stale data hasta cubrir SC-022 y SC-023.

**Checkpoint**: Todas las historias son funcionales; el overlay es legible, accesible y coherente en móvil y escritorio.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validar la feature completa, regresiones y documentación operativa.

- [ ] T031 [P] Actualizar los comentarios de trazabilidad en `src/utils/hiddenCharacters.ts`, `src/utils/annotatedText.ts` y `src/components/text-inspector/ProblemOverlay.tsx` para referenciar FR-043 a FR-055 sin añadir lógica duplicada.
- [X] T032 [P] Revisar `src/components/text-inspector/MainContent.tsx` y `src/pages/InspectorPage.tsx` para eliminar duplicación, estados innecesarios y cualquier mutación accidental del texto fuente.
- [ ] T033 [P] Ejecutar el escenario manual de `specs/006-overlay-diff/quickstart.md` en escritorio y viewport móvil, documentando cualquier desviación en `specs/006-overlay-diff/quickstart.md`.
- [X] T034 Ejecutar la suite completa con `npm test -- --watch=false` y corregir únicamente regresiones causadas por la feature en los archivos de `src/`.
- [X] T035 Ejecutar `npm run build` con CI habilitado y resolver errores de TypeScript, ESLint o estilos introducidos por la feature.
- [ ] T036 Ejecutar la revisión final de `specs/006-overlay-diff/contracts/ui-contract.md` y `specs/006-overlay-diff/data-model.md` contra el comportamiento implementado, dejando cualquier discrepancia documentada antes de cerrar la feature.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias; confirma la superficie existente.
- **Foundational (Phase 2)**: Depende de Setup y bloquea la UI; crea la segmentación y su contrato determinista.
- **User Story 1 (Phase 3)**: Depende de Phase 2 y constituye el MVP.
- **User Story 2 (Phase 4)**: Depende de la representación de US1 para alternarla, pero preserva el valor fuente y puede probarse de forma independiente una vez disponible la utilidad.
- **User Story 3 (Phase 5)**: Depende de US1 y US2 para pulir accesibilidad, alineación y sincronización.
- **Polish (Phase 6)**: Depende de todas las historias que se decida entregar.

### User Story Dependencies

- **US1 (P1)**: Depende de Phase 2; no depende de otras historias.
- **US2 (P1)**: Depende de la representación de US1; su comportamiento de estado se prueba de forma independiente sobre esa superficie.
- **US3 (P2)**: Depende de US1 y US2 porque mejora la capa y su control ya integrados.

### Parallel Opportunities

- T004, T005 y T007 pueden avanzar en paralelo porque afectan archivos distintos; T006 espera los tipos y la clasificación.
- T009 y T010 pueden escribirse en paralelo antes de T011.
- T016 y T017 pueden escribirse en paralelo antes de T018-T021.
- T023, T024 y T025 pueden escribirse en paralelo antes de las tareas de implementación de US3.
- T031, T032 y T033 son paralelizables al finalizar las historias.

## Parallel Example: User Story 1

```text
Task: T009 [P] [US1] Crear pruebas de contrato en src/components/text-inspector/ProblemOverlay.test.tsx
Task: T010 [P] [US1] Añadir pruebas de integración en src/pages/InspectorPage.test.tsx

After tests are red:
Task: T011 [US1] Implementar ProblemOverlay en src/components/text-inspector/ProblemOverlay.tsx
Task: T013 [US1] Integrar la capa en src/components/text-inspector/MainContent.tsx
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Setup y Foundational.
2. Escribir T009/T010 y confirmar que fallan por la ausencia del overlay.
3. Implementar T011-T014.
4. Ejecutar T015 y validar localización, tipos y preservación del documento.
5. Detenerse en el checkpoint de US1 para una demo del valor principal.

### Incremental Delivery

1. Entregar US1 como MVP de localización.
2. Añadir US2 para alternancia e inmutabilidad.
3. Añadir US3 para accesibilidad, responsive y sincronización.
4. Ejecutar Phase 6 con suite y build completos.

## Notes

- Las tareas de prueba preceden a la implementación de cada historia y deben comenzar en estado fallido cuando sea posible.
- No se añade backend, almacenamiento, dependencia de red ni nueva ruta.
- La implementación debe preservar el debounce de aproximadamente 150 ms de `useSecurityReport` para evitar etiquetas obsoletas durante edición rápida.
- No crear ni marcar automáticamente checklists de requisitos; su estado pertenece al revisor.
