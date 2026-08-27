# Feature Specification: Visualizador Overlay/Diff de Caracteres Ocultos

**Feature Branch**: `006-overlay-diff`

**Created**: 2026-08-27

**Status**: Draft

**Input**: User description: "Visualizador tipo Overlay/Diff: Un contador de \"5 vulnerabilidades\" no ayuda al usuario a saber dónde están. Se puede implementar una vista superpuesta, gatillada por un botón de mostrar problemas, que sustituya visualmente los caracteres invisibles por insignias legibles (ej. [ZWS], [BOM]) con fondo rojo/ámbar."

## Clarifications

### Session 2026-08-27

- Q: ¿Debe cada carácter de control ASCII usar una etiqueta común `[CTRL]` o una etiqueta específica que incluya su código, como `[CTRL U+0001]`? → A: Cada carácter de control ASCII usa la etiqueta visible común `[CTRL]`; el código Unicode exacto puede mostrarse como información complementaria.
- Q: ¿Debe el control de problemas permanecer disponible cuando el documento no contiene artefactos, mostrando una vista explícita de "Sin problemas", o debe estar deshabilitado? → A: El control permanece disponible y la vista muestra "Sin problemas", sin insignias.
- Q: ¿Debe la vista anotada aparecer como una capa visual alineada sobre el área de texto editable, o como un panel de lectura separado junto al editor? → A: La vista anotada aparece como una capa visual alineada sobre el área editable; el editor continúa siendo la fuente de interacción.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Localizar caracteres ocultos (Priority: P1)

Como usuario del Inspector de Texto, quiero activar una vista que me muestre exactamente dónde aparecen los caracteres ocultos, para poder revisar el texto sin tener que adivinar la posición a partir de un contador.

**Why this priority**: La localización es el valor principal de la feature y convierte el reporte numérico existente en información accionable.

**Independent Test**: Puede probarse introduciendo un texto con varios caracteres ocultos en posiciones conocidas, activando "Mostrar problemas" y verificando que cada posición se representa con una insignia cuyo texto identifica el tipo de carácter.

**Acceptance Scenarios**:

1. **Given** el texto contiene un espacio de ancho cero, **When** el usuario activa "Mostrar problemas", **Then** la representación visual muestra una insignia `[ZWS]` en la posición exacta de esa ocurrencia.
2. **Given** el texto contiene un BOM, **When** el usuario activa "Mostrar problemas", **Then** la representación visual muestra una insignia `[BOM]` en la posición exacta de esa ocurrencia.
3. **Given** el texto contiene caracteres de control ASCII detectados, **When** el usuario activa "Mostrar problemas", **Then** cada ocurrencia se representa con una insignia legible que identifica que es un carácter de control.
4. **Given** el texto contiene varios tipos o varias ocurrencias del mismo tipo, **When** el usuario activa "Mostrar problemas", **Then** la vista muestra una insignia por ocurrencia, conservando el orden y el contenido visible del resto del texto.

---

### User Story 2 - Alternar la inspección sin alterar el documento (Priority: P1)

Como usuario, quiero mostrar u ocultar la vista de problemas sin que el documento se modifique, para revisar los artefactos y después continuar editando o sanitizando el texto original con confianza.

**Why this priority**: La vista debe ser una ayuda de inspección reversible, no una operación de edición accidental ni una forma alternativa de sanitización.

**Independent Test**: Puede probarse activando y desactivando la vista sobre un texto con artefactos y comparando el valor editable y el reporte de seguridad antes y después de la alternancia.

**Acceptance Scenarios**:

1. **Given** el texto contiene caracteres ocultos y la vista está oculta, **When** el usuario activa "Mostrar problemas", **Then** aparece la representación anotada y el texto fuente conserva exactamente sus caracteres y saltos de línea.
2. **Given** la vista de problemas está visible, **When** el usuario activa el mismo control para ocultarla, **Then** desaparecen las insignias y vuelve a mostrarse la representación normal sin cambiar el documento.
3. **Given** la vista de problemas está visible, **When** el usuario edita el texto, **Then** la vista y el conteo se actualizan para reflejar el contenido actual, sin conservar insignias de posiciones que ya no contienen artefactos.
4. **Given** el texto no contiene caracteres ocultos, **When** el usuario activa "Mostrar problemas", **Then** se muestra un estado explícito de que no hay problemas que localizar y no se inventan insignias.

---

### User Story 3 - Interpretar las alertas visuales (Priority: P2)

Como usuario, quiero distinguir visualmente la severidad o naturaleza de cada artefacto y entender la vista con tecnologías de asistencia, para poder revisar el texto sin depender únicamente del color o de la posición visual.

**Why this priority**: Las etiquetas y los estados visuales deben hacer que el overlay sea comprensible y accesible, especialmente cuando hay varios tipos de caracteres.

**Independent Test**: Puede probarse con una combinación de artefactos y navegación por teclado o lector de pantalla, verificando que las etiquetas exponen su tipo mediante texto y que el control informa si la vista está visible u oculta.

**Acceptance Scenarios**:

1. **Given** hay artefactos detectados, **When** se muestra la vista, **Then** cada insignia contiene una etiqueta textual del tipo y una señal visual de alerta que no depende solo del color.
2. **Given** la vista está visible, **When** el usuario navega con teclado, **Then** puede alcanzar el control para ocultarla y el estado del control comunica que la vista está activa.
3. **Given** el texto cambia mientras la vista está visible, **When** termina la actualización del análisis, **Then** la vista conserva la legibilidad del texto y las insignias reflejan el nuevo conjunto de artefactos.

---

### Edge Cases

- Si el texto está vacío, activar la vista no debe producir insignias ni errores; debe comunicarse que no hay problemas que mostrar.
- Si todos los caracteres del texto son artefactos detectados, la vista debe conservar un orden legible de insignias y no ocultar el contenido representado.
- Si un carácter oculto aparece junto a un salto de línea, la insignia debe permanecer en la línea correcta y no fusionar visualmente líneas distintas.
- Si el texto es suficientemente largo para desplazarse, la representación anotada debe permitir revisar todos los artefactos y mantener una relación coherente con el área de trabajo.
- Si el usuario pega o edita texto rápidamente, la vista no debe mostrar etiquetas obsoletas después de actualizarse el reporte de seguridad.
- Los caracteres no incluidos en el alcance de REQ-04, incluidos tabulación, salto de línea, retorno de carro, DEL y otros invisibles Unicode, no deben recibir insignias.
- La vista no debe reemplazar el valor real usado por métricas, límites, reporte de seguridad o "Sanitizar y Copiar".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-043**: El sistema DEBE ofrecer siempre un control claramente identificado como "Mostrar problemas" junto al área de texto o al Inspector de Seguridad, tanto si el reporte contiene caracteres ocultos como si está limpio.
- **FR-044**: Al activar el control, el sistema DEBE mostrar una capa visual anotada alineada sobre el área de texto editable, sustituyendo visualmente cada ocurrencia detectada por una insignia textual legible en su posición correspondiente.
- **FR-045**: La representación DEBE identificar como `[ZWS]` cada espacio de ancho cero (`U+200B`) y como `[BOM]` cada marca de orden de bytes (`U+FEFF`).
- **FR-046**: La representación DEBE identificar cada carácter de control ASCII incluido en el alcance de REQ-04 mediante una insignia visible `[CTRL]`; cada ocurrencia debe tener su propia insignia y el código Unicode exacto puede mostrarse como información complementaria.
- **FR-047**: La representación DEBE conservar, en el mismo orden, los caracteres visibles, los espacios y los saltos de línea del documento para que el usuario pueda ubicar cada artefacto en contexto.
- **FR-048**: Mostrar u ocultar la vista DEBE ser reversible y NO DEBE modificar el valor editable del Documento de entrada ni eliminar, insertar o sustituir caracteres en el contenido fuente.
- **FR-049**: Mientras la vista esté visible, cualquier cambio en el Documento de entrada DEBE actualizar sus insignias y el contexto mostrado para que correspondan únicamente al texto actual.
- **FR-050**: Cuando el reporte no contenga caracteres ocultos, el control DEBE seguir disponible y la vista DEBE mostrar un estado explícito de "Sin problemas" sin presentar insignias de artefactos.
- **FR-051**: El control de alternancia DEBE comunicar mediante texto y estado semántico si la vista está visible u oculta, y DEBE poder utilizarse mediante teclado.
- **FR-052**: Las insignias DEBEN ser distinguibles mediante su etiqueta textual y no depender únicamente del color; los colores rojo y ámbar pueden reforzar la alerta conforme al diseño del producto.
- **FR-053**: La capa anotada DEBE permanecer alineada con el área de texto editable en dispositivos móviles y de escritorio, incluyendo texto largo, ajuste de línea y desplazamiento; el editor debe seguir siendo la única superficie de interacción con el documento.
- **FR-054**: El análisis y la generación de la representación DEBEN ejecutarse localmente en el navegador, sin enviar el contenido del texto a servicios externos.
- **FR-055**: La vista DEBE reutilizar exactamente el alcance de detección definido por REQ-04: espacio de ancho cero, BOM y controles ASCII `U+0000–U+001F` excepto tabulación, salto de línea y retorno de carro.

### Key Entities *(include if feature involves data)*

- **Representación anotada**: Vista derivada y no editable del Documento de entrada que conserva el texto visible e inserta insignias en las posiciones de los artefactos detectados; existe solo mientras la vista está activa.
- **Insignia de artefacto**: Marcador visual y textual asociado a una ocurrencia concreta detectada, con un identificador legible del tipo de carácter y su posición relativa en el documento.
- **Estado de visualización de problemas**: Estado transitorio que indica si la representación anotada está visible u oculta; no se persiste ni modifica el documento fuente.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-019**: En el 100% de los casos de prueba con artefactos conocidos, cada ocurrencia aparece una sola vez como insignia y la insignia identifica correctamente su tipo.
- **SC-020**: Un usuario puede localizar visualmente cualquier artefacto detectado en un texto de hasta 10.000 caracteres en menos de 10 segundos después de activar "Mostrar problemas".
- **SC-021**: Activar y desactivar la vista en 100 ciclos sobre el mismo texto no cambia el contenido editable, las métricas ni el reporte de seguridad.
- **SC-022**: La vista se actualiza para reflejar cambios de edición o pegado en menos de 1 segundo en al menos el 95% de las interacciones representativas.
- **SC-023**: El 100% de los controles y estados de la vista se puede interpretar mediante texto visible y se puede operar con teclado, sin depender exclusivamente del color.
- **SC-024**: La inspección no produce solicitudes de red ni expone el contenido del documento fuera del navegador.

## Assumptions

- La feature se apoya en el Documento de entrada de REQ-01 y en el Reporte de seguridad de REQ-04; no redefine la edición, el conteo ni el conjunto de caracteres detectados.
- "Overlay/Diff" se interpreta como una capa visual de solo lectura alineada sobre el documento editable, no como un segundo editor, un panel de lectura independiente ni una comparación entre dos versiones históricas.
- La vista se inicia oculta para preservar el flujo normal de edición y se activa explícitamente mediante el control "Mostrar problemas".
- Las insignias de controles ASCII usan `[CTRL]` como etiqueta visible común; el código Unicode exacto es información complementaria y no sustituye a la etiqueta común.
- El control permanece disponible con el texto limpio para permitir que el usuario confirme explícitamente el estado "Sin problemas".
- El texto de origen continúa siendo el único valor utilizado por las métricas, límites, sanitización y copia al portapapeles.
- El estilo visual seguirá la interfaz oscura premium existente, con contraste suficiente y alertas rojas o ámbar acompañadas de texto.
- El análisis conserva la pauta del proyecto de actualizar resultados tras un debounce aproximado de 150 ms cuando el contenido cambia rápidamente.

## Scope Boundaries

- Esta feature cubre la localización y visualización temporal de caracteres ocultos ya detectados.
- No cubre la eliminación de caracteres, la modificación permanente del documento, el historial de versiones, la comparación con un texto externo ni la detección de nuevos tipos de caracteres fuera de REQ-04.
