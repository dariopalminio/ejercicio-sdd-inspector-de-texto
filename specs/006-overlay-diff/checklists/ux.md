# UX Requirements Quality Checklist: Visualizador Overlay/Diff de Caracteres Ocultos

**Purpose**: Evaluar la calidad, claridad y cobertura de los requisitos de experiencia de usuario del visualizador de problemas.
**Created**: 2026-08-27
**Feature**: [spec.md](../spec.md)

**Note**: Esta checklist valida la redacción de requisitos, no la implementación.
**Review Ownership**: Esta checklist pertenece al revisor. `[x]` significa que el criterio de calidad del requisito fue revisado y aprobado; no significa que la implementación esté completa.

## Requirement Completeness

- [ ] CHK001 - ¿Está definido de forma completa el propósito de la vista anotada y su relación con el contador existente? [Completeness, Spec §User Scenarios & Testing]
- [ ] CHK002 - ¿Los requisitos cubren la identificación de todos los tipos de artefactos incluidos en REQ-04, incluida la categoría de controles ASCII? [Completeness, Spec §FR-043–FR-046]
- [ ] CHK003 - ¿Está especificado el comportamiento de la vista tanto cuando existen artefactos como cuando el documento está limpio o vacío? [Completeness, Spec §FR-050, Edge Cases]
- [ ] CHK004 - ¿Están cubiertos los estados de visibilidad, actualización, ocultación y continuidad de la edición? [Completeness, Spec §FR-048–FR-051]

## Requirement Clarity

- [ ] CHK005 - ¿El término "posición exacta" está definido con criterios observables para texto visible, espacios y saltos de línea? [Clarity, Spec §FR-044, §FR-047]
- [ ] CHK006 - ¿La spec define una etiqueta inequívoca para cada tipo de control ASCII, en lugar de dejar abierta la interpretación de "carácter de control"? [Ambiguity, Spec §FR-046, Assumptions]
- [ ] CHK007 - ¿Está suficientemente claro qué significa que la representación mantenga una "relación visual coherente" con el área de trabajo en distintos tamaños y con desplazamiento? [Clarity, Spec §FR-053]
- [ ] CHK008 - ¿La diferencia entre la vista anotada, el valor editable y el proceso de sanitización está expresada sin solapamientos? [Clarity, Spec §FR-048, Assumptions, Scope Boundaries]

## Requirement Consistency

- [ ] CHK009 - ¿Son consistentes la afirmación de que la vista sustituye visualmente artefactos y la prohibición de modificar el documento fuente? [Consistency, Spec §FR-044, §FR-048]
- [ ] CHK010 - ¿La disponibilidad del control en estado limpio está resuelta de forma consistente entre FR-043, FR-050 y las Assumptions? [Conflict, Spec §FR-043, §FR-050, Assumptions]
- [ ] CHK011 - ¿El alcance de caracteres de FR-055 coincide exactamente con REQ-04 y con los caracteres excluidos en Edge Cases? [Consistency, Spec §FR-055, Edge Cases]
- [ ] CHK012 - ¿La prioridad y el valor independiente de las historias reflejan correctamente que localizar y alternar la vista dependen del reporte de seguridad existente? [Consistency, Spec §User Story 1–2, Assumptions]

## Acceptance Criteria Quality

- [ ] CHK013 - ¿Los criterios de éxito cuantifican de forma verificable la exactitud de una insignia por ocurrencia y por tipo? [Measurability, Spec §SC-019]
- [ ] CHK014 - ¿Los objetivos de tiempo para localizar artefactos y actualizar la vista definen una población o procedimiento de evaluación suficientemente claro? [Measurability, Spec §SC-020, §SC-022]
- [ ] CHK015 - ¿El criterio de 100 ciclos especifica qué invariantes del documento, métricas y reporte deben permanecer iguales? [Clarity, Spec §SC-021]
- [ ] CHK016 - ¿El criterio de accesibilidad identifica de manera suficiente qué controles y estados deben ser interpretables y operables? [Completeness, Spec §SC-023, §FR-051–FR-052]

## Scenario Coverage

- [ ] CHK017 - ¿Las historias y escenarios cubren los flujos primario, alternativo, de texto limpio y de edición mientras la vista permanece activa? [Coverage, Spec §User Story 1–3]
- [ ] CHK018 - ¿Está documentado el comportamiento esperado ante cambios rápidos de contenido y resultados de análisis temporalmente desfasados? [Coverage, Spec §Edge Cases, §FR-049]
- [ ] CHK019 - ¿Está definido el comportamiento de recuperación o comunicación cuando la vista no puede mantener la relación visual con un texto largo o desplazable? [Gap, Spec §FR-053, Edge Cases]

## Edge Case Coverage

- [ ] CHK020 - ¿Los casos de texto vacío, texto compuesto solo por artefactos y artefactos junto a saltos de línea tienen criterios suficientemente concretos? [Edge Case, Spec §Edge Cases]
- [ ] CHK021 - ¿Está explícitamente delimitado el tratamiento de tabulación, retorno de carro, salto de línea, DEL y otros invisibles fuera de REQ-04? [Completeness, Spec §Edge Cases, §FR-055]
- [ ] CHK022 - ¿La spec define qué información conserva una insignia cuando coinciden múltiples artefactos adyacentes? [Gap, Spec §FR-044–FR-047]

## Non-Functional Requirements

- [ ] CHK023 - ¿Los requisitos de accesibilidad cubren nombre, estado y operación por teclado del control, además de la dependencia exclusiva del color? [Accessibility, Spec §FR-051–FR-052, §SC-023]
- [ ] CHK024 - ¿Los requisitos visuales especifican contraste y diferenciación textual suficientes para las alertas rojas y ámbar en la interfaz oscura? [Accessibility, Spec §FR-052, Assumptions]
- [ ] CHK025 - ¿El objetivo de rendimiento y el debounce aproximado de 150 ms están alineados con una experiencia de actualización perceptiblemente oportuna? [Performance, Spec §SC-022, Assumptions]
- [ ] CHK026 - ¿La privacidad local está expresada como una restricción de producto aplicable tanto al análisis como a la representación? [Security, Spec §FR-054, §SC-024]

## Dependencies & Assumptions

- [ ] CHK027 - ¿Las dependencias con REQ-01 y REQ-04 están identificadas con suficiente precisión para evitar redefinir el conjunto de detección o el valor fuente? [Dependency, Spec §Assumptions]
- [ ] CHK028 - ¿El supuesto de que "Overlay/Diff" es una vista de solo lectura excluye explícitamente historial, comparación externa y segundo editor? [Assumption, Spec §Assumptions, Scope Boundaries]
- [ ] CHK029 - ¿La spec resuelve o señala como decisión de diseño la etiqueta de controles ASCII y la disponibilidad del control cuando no hay problemas? [Ambiguity, Spec §Assumptions]

## Notes

- Los ítems permanecen sin marcar hasta que un revisor confirme la calidad de los requisitos.
- La checklist integrada `requirements.md` se mantiene separada y conserva su ciclo de vida propio.
- `/speckit-implement` debe leer el estado de esta checklist, pero no modificar sus marcadores.
