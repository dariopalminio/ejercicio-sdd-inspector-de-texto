# Feature Specification: Panel de Métricas Dinámicas

**Feature Branch**: `002-panel-metricas-dinamicas`

**Created**: 2026-08-26

**Status**: Completed

**Input**: User description: "Panel de Métricas Dinámicas: El sistema debe calcular y mostrar en tiempo real las siguientes métricas del texto ingresado: Número total de palabras, Número total de caracteres, Número total de líneas. Se agrega el panel de métricas dentro del MAIN CONTENT con tres cuadros de resultados (uno por cada métrica). El cálculo de caracteres se hace incluyendo espacios en blanco. Agrega el TOPBAR / HEADER y el FOOTER de la página. En el TOPBAR / HEADER coloca del lado izquierdo el nombre de la aplicación. En el FOOTER coloca información de codificación del texto (UTF-8 por defecto)."

## Clarifications

### Session 2026-08-26

- Q: ¿Cómo debe contarse el número de líneas cuando el texto está vacío o termina en un salto de línea? → A: Vacío = 0 líneas; un salto de línea final no agrega una línea vacía adicional (p. ej. "a\nb\n" = 2 líneas, no 3).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver métricas de texto en tiempo real (Priority: P1)

Como usuario del Inspector de Texto, quiero ver de inmediato cuántas palabras, caracteres y líneas tiene el texto que estoy escribiendo o pegando, para poder evaluar el tamaño de mi contenido sin tener que contarlo manualmente.

**Why this priority**: Es el valor central de esta especificación (FR-02); sin las métricas visibles, el usuario no obtiene ningún beneficio del panel. Depende del área de texto ya entregada en FR-01.

**Independent Test**: Puede probarse de forma aislada escribiendo o pegando texto de longitud conocida en el área principal y verificando que los tres cuadros de resultados (palabras, caracteres, líneas) muestran los valores correctos y se actualizan al seguir editando.

**Acceptance Scenarios**:

1. **Given** el área de texto está vacía, **When** la página carga, **Then** los tres cuadros de métricas muestran 0 palabras, 0 caracteres y 0 líneas.
2. **Given** el usuario escribe una frase con varias palabras, **When** termina de escribir, **Then** el cuadro de "Palabras" refleja el número correcto de palabras separadas por espacios.
3. **Given** el usuario escribe o pega texto que incluye espacios en blanco, **When** se calcula el total de caracteres, **Then** el cuadro de "Caracteres" incluye los espacios en blanco dentro del conteo.
4. **Given** el usuario pega texto con varias líneas (separadas por saltos de línea), **When** se calcula el total de líneas, **Then** el cuadro de "Líneas" refleja el número correcto de líneas.
5. **Given** el usuario vacía el área de texto (acción "Vaciar" de FR-01), **When** el área queda vacía, **Then** los tres cuadros de métricas vuelven a mostrar 0.

---

### User Story 2 - Identificar la aplicación desde el encabezado (Priority: P2)

Como usuario, quiero ver el nombre de la aplicación en la parte superior de la página, para confirmar en todo momento en qué herramienta estoy trabajando.

**Why this priority**: Aporta contexto y confianza, pero no bloquea el uso funcional del panel de métricas (User Story 1).

**Independent Test**: Puede probarse de forma aislada cargando la página y verificando que el encabezado (TOPBAR/HEADER) muestra el nombre de la aplicación alineado del lado izquierdo, visible en cualquier momento independientemente del contenido del área de texto.

**Acceptance Scenarios**:

1. **Given** un usuario carga la página, **When** observa la parte superior, **Then** ve un encabezado (TOPBAR/HEADER) con el nombre de la aplicación ubicado del lado izquierdo.
2. **Given** el usuario interactúa con el área de texto o el panel de métricas, **When** el contenido cambia, **Then** el encabezado permanece visible y sin alterar su contenido.

---

### User Story 3 - Confirmar la codificación del texto desde el pie de página (Priority: P3)

Como usuario, quiero ver información sobre la codificación de texto utilizada por la aplicación en el pie de página, para tener la certeza de que mi contenido se procesa con una codificación estándar y predecible.

**Why this priority**: Es información de transparencia técnica que refuerza la confianza del usuario, pero tiene el menor impacto funcional inmediato de las tres historias.

**Independent Test**: Puede probarse de forma aislada cargando la página y verificando que el pie de página (FOOTER) muestra la información de codificación de texto (UTF-8 por defecto), visible independientemente del contenido del área de texto.

**Acceptance Scenarios**:

1. **Given** un usuario carga la página, **When** observa la parte inferior, **Then** ve un pie de página (FOOTER) que indica la codificación de texto utilizada (UTF-8 por defecto).
2. **Given** el usuario interactúa con el área de texto o el panel de métricas, **When** el contenido cambia, **Then** el pie de página permanece visible y su información de codificación no cambia.

---

### Edge Cases

- ¿Qué ocurre si el usuario pega texto que contiene solo espacios en blanco o saltos de línea? El conteo de palabras debe ser 0 (no hay secuencias de caracteres no blancos), el conteo de caracteres debe incluir esos espacios/saltos, y el conteo de líneas debe reflejar el número de líneas presentes.
- ¿Qué ocurre si el texto termina con un salto de línea final? El conteo de líneas NO debe agregar una línea vacía adicional por ese salto de línea final (p. ej. "a\nb\n" cuenta como 2 líneas, no 3); ver Clarifications.
- ¿Qué ocurre si el usuario pega un bloque de texto extremadamente largo? Las métricas deben seguir calculándose y actualizándose sin bloquear la interacción del usuario (ver NFR de rendimiento en Assumptions).
- ¿Qué ocurre si el usuario escribe múltiples espacios consecutivos entre palabras? El conteo de palabras no debe contar espacios adicionales como palabras extra.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-010**: El sistema DEBE calcular y mostrar en tiempo real el número total de palabras del texto ingresado, contando como palabra cada secuencia de caracteres no separada por espacios en blanco.
- **FR-011**: El sistema DEBE calcular y mostrar en tiempo real el número total de caracteres del texto ingresado, incluyendo los espacios en blanco dentro del conteo.
- **FR-012**: El sistema DEBE calcular y mostrar en tiempo real el número total de líneas del texto ingresado.
- **FR-013**: El sistema DEBE presentar las tres métricas (palabras, caracteres, líneas) dentro de la región MAIN CONTENT, en tres cuadros de resultados independientes, cada uno claramente etiquetado con su métrica correspondiente.
- **FR-014**: Las métricas DEBEN actualizarse automáticamente cada vez que el contenido del área de texto cambia, incluyendo cuando el usuario usa la acción "Vaciar" (las tres métricas deben volver a 0).
- **FR-015**: El sistema DEBE mostrar un encabezado (TOPBAR/HEADER) visible en la parte superior de la página, con el nombre de la aplicación ubicado del lado izquierdo.
- **FR-016**: El sistema DEBE mostrar un pie de página (FOOTER) visible en la parte inferior de la página, con información sobre la codificación de texto utilizada, mostrando "UTF-8" como valor por defecto.
- **FR-017**: El encabezado y el pie de página DEBEN permanecer visibles y sin cambios de contenido independientemente de las modificaciones al texto de trabajo o a las métricas.

### Key Entities

- **Métricas de texto**: Conjunto derivado del "Documento de entrada" (definido en FR-01) compuesto por tres valores numéricos: total de palabras, total de caracteres (incluyendo espacios) y total de líneas. Se recalcula automáticamente a partir del contenido actual del documento de entrada; no se persiste ni se envía a ningún servicio externo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-005**: Un usuario puede ver las tres métricas (palabras, caracteres, líneas) actualizadas en menos de 1 segundo después de escribir o pegar texto.
- **SC-006**: El 100% de los cálculos de métricas coinciden con un conteo manual de referencia para al menos 10 casos de prueba representativos (texto vacío, una palabra, múltiples líneas, espacios múltiples, texto extenso).
- **SC-007**: Un usuario puede identificar el nombre de la aplicación en menos de 2 segundos de haber cargado la página, sin necesidad de scroll.
- **SC-008**: Un usuario puede encontrar la información de codificación de texto en el pie de página sin necesidad de buscarla fuera de la vista inicial de la página en un dispositivo de escritorio estándar.

## Assumptions

- Esta especificación se apoya en el "Documento de entrada" y la acción "Vaciar" ya entregados por FR-01 (`specs/001-entrada-gestion-texto/spec.md`); no se redefine su comportamiento de entrada, solo se deriva información a partir de su contenido.
- Definición de "palabra": una secuencia continua de caracteres no separada por espacios en blanco (espacio, tabulación, salto de línea). Los espacios en blanco consecutivos no generan palabras adicionales. Esta es la definición estándar usada por la mayoría de los procesadores de texto.
- Definición de "línea": el número de segmentos de texto separados por saltos de línea. Un texto vacío cuenta como 0 líneas; un texto sin saltos de línea cuenta como 1 línea; un salto de línea final no agrega una línea vacía adicional al conteo (se sigue la convención común de editores de texto).
- El TOPBAR/HEADER y el FOOTER agregados en esta especificación son elementos de layout compartidos a nivel de página (no exclusivos de MAIN CONTENT); su alcance aquí se limita a mostrar el nombre de la aplicación (header) y la información de codificación UTF-8 (footer), sin agregar navegación adicional, menús u otras funcionalidades no solicitadas.
- El nombre de la aplicación a mostrar en el encabezado es "Inspector de Texto", conforme a `docs/product-requirements.md`.
- Por rendimiento, el recálculo de métricas ante cada cambio de texto sigue la pauta de la constitución del proyecto de aplicar un debounce de aproximadamente 150ms para evitar bloqueos de la interfaz ante pegados extensos.
- El diseño visual del encabezado, el panel de métricas y el pie de página sigue los lineamientos generales de tema oscuro premium de `docs/product-requirements.md`, sin definir en esta especificación detalles visuales más allá de su estructura, contenido y accesibilidad.
