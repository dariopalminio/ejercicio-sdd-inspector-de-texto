# Security Requirements Quality Checklist: Visualizador Overlay/Diff de Caracteres Ocultos

**Purpose**: Evaluar si los requisitos de seguridad, privacidad, integridad del documento y límites de detección están completos y son inequívocos.
**Created**: 2026-08-27
**Feature**: [spec.md](../spec.md)

**Note**: Esta checklist valida la calidad de la redacción de requisitos, no la implementación.
**Review Ownership**: Esta checklist pertenece al revisor. `[x]` significa que el criterio de calidad del requisito fue revisado y aprobado; no significa que la implementación esté completa.

## Requirement Completeness

- [ ] CHK001 - ¿La spec define de forma completa qué información puede revelar una insignia sobre cada artefacto detectado? [Completeness, Spec §FR-044–FR-046]
- [ ] CHK002 - ¿Están documentadas las garantías de que el overlay es una vista derivada y no una fuente alternativa de datos? [Completeness, Spec §FR-048, Key Entities]
- [ ] CHK003 - ¿Los requisitos cubren la integridad del documento durante activación, desactivación y edición? [Completeness, Spec §FR-048–FR-049]
- [ ] CHK004 - ¿Están cubiertos los estados de contenido limpio, vacío, muy largo y compuesto exclusivamente por artefactos desde una perspectiva de seguridad? [Completeness, Spec §Edge Cases]
- [ ] CHK005 - ¿Se especifica el comportamiento ante resultados de análisis temporalmente obsoletos durante cambios rápidos de texto? [Completeness, Spec §Edge Cases, §FR-049]

## Requirement Clarity

- [ ] CHK006 - ¿El límite de detección reutilizado desde REQ-04 está definido con suficiente precisión para evitar que el overlay revele o clasifique caracteres fuera de alcance? [Clarity, Spec §FR-055]
- [ ] CHK007 - ¿La distinción entre sustituir visualmente un carácter y modificar el contenido fuente elimina cualquier ambigüedad de integridad? [Clarity, Spec §FR-044, §FR-048]
- [ ] CHK008 - ¿La etiqueta de los controles ASCII está determinada de forma inequívoca, en lugar de depender del supuesto opcional `[CTRL]`? [Ambiguity, Spec §FR-046, Assumptions]
- [ ] CHK009 - ¿Está claro si una insignia puede exponer el código Unicode exacto y qué información mínima debe presentar? [Clarity, Spec §Key Entities, Assumptions]
- [ ] CHK010 - ¿El requisito de no exposición fuera del navegador identifica claramente qué operaciones de inspección y representación quedan incluidas? [Clarity, Spec §FR-054, §SC-024]

## Requirement Consistency

- [ ] CHK011 - ¿Las garantías de privacidad local son consistentes con la dependencia del reporte de seguridad y de los documentos REQ-01 y REQ-04? [Consistency, Spec §FR-054–FR-055, Assumptions]
- [ ] CHK012 - ¿La prohibición de modificar el valor editable es consistente con la actualización de la vista ante cambios de contenido? [Consistency, Spec §FR-048–FR-049]
- [ ] CHK013 - ¿Los requisitos mantienen separadas la inspección, la sanitización, las métricas, los límites y la copia al portapapeles? [Consistency, Spec §FR-048, Assumptions, Scope Boundaries]
- [ ] CHK014 - ¿Las exclusiones de tabulación, salto de línea, retorno de carro, DEL y otros invisibles coinciden entre FR-055, Edge Cases y las dependencias de REQ-04? [Consistency, Spec §FR-055, Edge Cases]

## Acceptance Criteria Quality

- [ ] CHK015 - ¿El criterio de una insignia por ocurrencia permite distinguir objetivamente duplicados, artefactos adyacentes y tipos combinados? [Measurability, Spec §SC-019]
- [ ] CHK016 - ¿El criterio de inmutabilidad define qué valores observables deben permanecer idénticos durante los 100 ciclos de alternancia? [Measurability, Spec §SC-021]
- [ ] CHK017 - ¿El criterio de privacidad permite determinar de forma objetiva qué constituye una exposición prohibida del contenido? [Measurability, Spec §SC-024]
- [ ] CHK018 - ¿El criterio de accesibilidad especifica suficiente evidencia textual y semántica para considerar que una alerta no depende solo del color? [Clarity, Spec §SC-023, §FR-051–FR-052]

## Scenario Coverage

- [ ] CHK019 - ¿Los requisitos contemplan escenarios primarios, alternativos y de excepción sin introducir una ruta que pueda alterar o filtrar el documento? [Coverage, Spec §User Story 1–3]
- [ ] CHK020 - ¿Está cubierta la coexistencia del overlay con la sanitización y copia, incluyendo qué representación se considera fuente de verdad? [Coverage, Spec §Assumptions, Scope Boundaries]
- [ ] CHK021 - ¿Está definido el tratamiento de información obsoleta cuando el contenido cambia antes de que finalice el análisis? [Coverage, Spec §Edge Cases, §FR-049]
- [ ] CHK022 - ¿Se documenta una expectativa de recuperación o comunicación cuando la representación no puede conservar contexto en texto largo o desplazable? [Gap, Spec §FR-053, Edge Cases]

## Edge Case Coverage

- [ ] CHK023 - ¿La spec establece límites de exposición y legibilidad cuando existen muchos artefactos o todos los caracteres son detectados? [Edge Case, Spec §Edge Cases]
- [ ] CHK024 - ¿Está descrita la conducta segura ante artefactos junto a saltos de línea y posiciones que puedan confundirse visualmente? [Edge Case, Spec §Edge Cases, §FR-047]
- [ ] CHK025 - ¿Los requisitos distinguen una ausencia real de artefactos de una vista que no pudo actualizarse? [Gap, Spec §FR-049–FR-050]
- [ ] CHK026 - ¿Está definido qué ocurre con caracteres fuera de alcance que un usuario pueda interpretar erróneamente como vulnerabilidades? [Coverage, Spec §FR-050, §FR-055]

## Non-Functional Requirements

- [ ] CHK027 - ¿La privacidad por defecto está expresada como una restricción aplicable al análisis, a la representación y a cualquier estado transitorio? [Security, Spec §FR-054, §SC-024]
- [ ] CHK028 - ¿Los requisitos de accesibilidad aseguran que las alertas y el estado de visibilidad sean comprensibles sin depender de color, posición o percepción visual? [Accessibility, Spec §FR-051–FR-052, §SC-023]
- [ ] CHK029 - ¿El objetivo de actualización en menos de 1 segundo y el debounce aproximado de 150 ms están definidos de forma que no permitan presentar datos de seguridad obsoletos? [Performance, Spec §SC-022, Assumptions]
- [ ] CHK030 - ¿La especificación evita solicitar persistencia, telemetría o servicios externos para una feature que debe permanecer local y no persistente? [Security, Spec §FR-054, Key Entities]

## Dependencies & Assumptions

- [ ] CHK031 - ¿Las dependencias con REQ-01 y REQ-04 identifican claramente qué contrato de entrada y qué conjunto de detección se heredan? [Dependency, Spec §Assumptions]
- [ ] CHK032 - ¿El supuesto de vista de solo lectura está respaldado por límites de alcance que excluyen edición, historial y comparación externa? [Assumption, Spec §Assumptions, Scope Boundaries]
- [ ] CHK033 - ¿Los supuestos sobre etiquetas de controles ASCII y códigos Unicode están validados o señalados como decisiones que pueden afectar la interpretación de seguridad? [Assumption, Spec §Assumptions]
- [ ] CHK034 - ¿La relación con "Sanitizar y Copiar" deja claro que inspeccionar no implica eliminar ni exportar contenido? [Dependency, Spec §Assumptions, Scope Boundaries]

## Ambiguities & Conflicts

- [ ] CHK035 - ¿La spec resuelve la tensión entre llamar a la vista "Overlay/Diff" y excluir comparaciones con versiones históricas o textos externos? [Conflict, Spec §Assumptions, Scope Boundaries]
- [ ] CHK036 - ¿Está definido si el control debe permanecer disponible cuando no hay artefactos sin crear una señal de seguridad ambigua? [Ambiguity, Spec §FR-043, §FR-050, Assumptions]
- [ ] CHK037 - ¿Están explícitamente delimitados los riesgos que quedan fuera al no detectar caracteres Unicode invisibles distintos de los definidos por REQ-04? [Completeness, Spec §FR-055, Scope Boundaries]

## Notes

- Los 37 ítems permanecen sin marcar hasta que un revisor confirme la calidad de los requisitos.
- Esta checklist cubre el foco solicitado: seguridad. La checklist UX existente se mantiene independiente.
- `/speckit-implement` debe leer el estado de esta checklist, pero no modificar sus marcadores.
