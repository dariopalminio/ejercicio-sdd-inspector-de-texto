# Feature Specification: Panel de Control de Límites

**Feature Branch**: `003-control-limites`

**Created**: 2026-08-26

**Status**: Completed

**Input**: User description: "Panel de Control de Límites: El sistema debe permitir al usuario establecer y gestionar límites para las métricas seleccionadas, asegurando que el contenido del área de texto cumpla con los umbrales configurados. El panel de Control de Límites debe contener: 1. Selector de Tipo de Límite: El sistema debe permitir al usuario elegir qué métrica utilizar para el control de límites mediante un selector radio buttons (Palabras, Caracteres o Líneas). 2. Configuración de Límite Máximo: El sistema debe permitir establecer un valor numérico máximo objetivo. 3. Retroalimentación Visual de Límites: El sistema debe mostrar una barra de progreso porcentual y un indicador de estado visual (colores y mensajes como "Dentro del límite" o "Por encima del máximo") que se actualicen en tiempo real según el umbral configurado."

## Clarifications

### Session 2026-08-26

- Q: ¿Qué formato numérico debe acompañar al indicador de estado junto a la barra de progreso: fracción (valor/máximo), porcentaje, o ambos? → A: Mostrar un porcentaje numérico explícito (p. ej. "Dentro del límite (0.4%)"), redondeado al entero más cercano, junto al mensaje de estado.
- Q: ¿Con qué tipo de control debe presentarse el Selector de Tipo de Límite? → A: Un grupo de botones de opción (radio buttons), con las tres opciones (Palabras, Caracteres, Líneas) visibles simultáneamente, en vez de un menú desplegable.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configurar el límite a controlar (Priority: P1)

Como usuario del Inspector de Texto, quiero elegir qué métrica (palabras, caracteres o líneas) quiero limitar y establecer un valor máximo objetivo, para poder definir el umbral que mi texto debe respetar.

**Why this priority**: Es la base indispensable del panel de Control de Límites; sin poder elegir la métrica y su valor máximo, no hay ningún umbral que verificar. Depende de las métricas ya calculadas por REQ-02.

**Independent Test**: Puede probarse de forma aislada abriendo el panel de Control de Límites, cambiando la selección entre las opciones de tipo de límite (Palabras/Caracteres/Líneas) y modificando el valor máximo, verificando que ambas selecciones quedan reflejadas y persisten mientras el usuario sigue interactuando con el texto.

**Acceptance Scenarios**:

1. **Given** el panel de Control de Límites está visible, **When** el usuario observa el grupo de opciones de tipo de límite, **Then** ve tres botones de opción (radio buttons) visibles simultáneamente: "Palabras", "Caracteres" y "Líneas".
2. **Given** el usuario selecciona una métrica distinta a la actual, **When** confirma la selección, **Then** el panel pasa a evaluar el límite usando esa nueva métrica.
3. **Given** el panel de Control de Límites está visible, **When** el usuario escribe un valor numérico en el campo de límite máximo, **Then** ese valor queda establecido como el objetivo máximo vigente.
4. **Given** el usuario ya configuró un tipo de límite y un valor máximo, **When** continúa escribiendo o editando el texto principal, **Then** la configuración del límite (métrica elegida y valor máximo) permanece sin cambios.

---

### User Story 2 - Ver el estado del límite en tiempo real (Priority: P2)

Como usuario, quiero ver una barra de progreso y un mensaje de estado que me indiquen si mi texto está dentro o por encima del límite configurado, para poder ajustar mi contenido sin tener que calcularlo manualmente.

**Why this priority**: Aporta el valor visible del panel (retroalimentación), pero depende de que ya exista una configuración de límite (User Story 1) para tener sentido.

**Independent Test**: Puede probarse de forma aislada configurando un tipo de límite y un valor máximo conocidos, y luego escribiendo texto de longitud controlada para verificar que la barra de progreso y el mensaje de estado reflejan correctamente si el valor actual está por debajo, en el límite exacto, o por encima del máximo configurado.

**Acceptance Scenarios**:

1. **Given** el valor actual de la métrica seleccionada es menor que el máximo configurado, **When** se recalcula el estado, **Then** la barra de progreso muestra el porcentaje correspondiente y el indicador de estado muestra un mensaje como "Dentro del límite" con un color de estado seguro.
2. **Given** el valor actual de la métrica seleccionada supera el máximo configurado, **When** se recalcula el estado, **Then** el indicador de estado muestra un mensaje como "Por encima del máximo" con un color de alerta, distinto del color usado para el estado seguro.
3. **Given** el usuario modifica el texto del área principal, **When** el valor de la métrica seleccionada cambia, **Then** la barra de progreso y el mensaje de estado se actualizan automáticamente para reflejar el nuevo valor.
4. **Given** el usuario cambia el tipo de límite o el valor máximo (User Story 1), **When** la configuración cambia, **Then** la barra de progreso y el mensaje de estado se recalculan de inmediato según la nueva configuración.

---

### Edge Cases

- ¿Qué ocurre si el usuario establece un valor máximo de 0? El sistema debe seguir mostrando un porcentaje y un estado coherente (0 de contenido = "Dentro del límite"; cualquier contenido mayor a 0 = "Por encima del máximo").
- ¿Qué ocurre si el usuario intenta ingresar un valor máximo negativo o no numérico? El sistema debe evitar establecer un valor máximo inválido y mantener el último valor máximo válido configurado.
- ¿Qué ocurre si el valor actual de la métrica supera ampliamente el máximo configurado (por ejemplo, el doble)? La barra de progreso debe mostrarse visualmente llena (100%) sin desbordar su contenedor, mientras el porcentaje numérico mostrado puede seguir reflejando el valor real (p. ej. "200%") y el mensaje de estado sigue indicando "Por encima del máximo".
- ¿Qué ocurre si el valor actual de la métrica es exactamente igual al máximo configurado? El sistema debe considerar ese caso como "Dentro del límite" (el máximo configurado es un valor permitido, no un valor de exceso).
- ¿Qué ocurre si el usuario cambia el tipo de límite mientras el texto está por encima del máximo para la métrica anterior? El estado debe recalcularse de inmediato usando la nueva métrica seleccionada, sin arrastrar el estado anterior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-018**: El sistema DEBE presentar un panel "Control de Límites" visible junto a la región MAIN CONTENT (SIDEBAR), conforme al diseño de layout de `docs/product-requirements.md`.
- **FR-019**: El sistema DEBE proveer un grupo de botones de opción (radio buttons) que permita elegir la métrica a limitar entre "Palabras", "Caracteres" o "Líneas", con las tres opciones visibles simultáneamente y solo una seleccionable a la vez.
- **FR-020**: El sistema DEBE permitir establecer un valor numérico máximo objetivo para la métrica seleccionada, mediante un campo editable.
- **FR-021**: El sistema DEBE mostrar una barra de progreso porcentual, junto con el porcentaje numérico explícito (redondeado al entero más cercano) que refleje la proporción entre el valor actual de la métrica seleccionada y el valor máximo configurado.
- **FR-022**: El sistema DEBE mostrar un indicador de estado visual (mensaje de texto y color diferenciado) que indique si el valor actual está "Dentro del límite" o "Por encima del máximo".
- **FR-023**: La barra de progreso y el indicador de estado DEBEN actualizarse automáticamente cada vez que cambie el texto del área principal, el tipo de límite seleccionado, o el valor máximo configurado.
- **FR-024**: El sistema DEBE utilizar el valor correspondiente ya calculado (número total de palabras, caracteres o líneas) del panel de métricas de REQ-02, sin recalcular ni duplicar la lógica de conteo.
- **FR-025**: El sistema DEBE evitar establecer un valor máximo negativo o no numérico, conservando el último valor máximo válido configurado ante una entrada inválida.
- **FR-026**: Cuando el valor actual de la métrica sea igual al valor máximo configurado, el sistema DEBE considerarlo "Dentro del límite".

### Key Entities

- **Configuración de límite**: Representa la elección del usuario sobre qué controlar. Compuesta por dos valores: el tipo de límite (Palabras, Caracteres o Líneas) y el valor máximo objetivo (número entero positivo). Vive en memoria del navegador durante la sesión; no se persiste ni se envía a ningún servicio externo.
- **Estado del límite**: Valor derivado de la Configuración de límite y de las Métricas de texto (REQ-02). Compuesto por un porcentaje de progreso (valor actual / valor máximo) y un estado categórico ("Dentro del límite" o "Por encima del máximo"). Se recalcula automáticamente; no se persiste.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-009**: Un usuario puede cambiar el tipo de límite controlado (Palabras/Caracteres/Líneas) en una sola acción de selección.
- **SC-010**: La barra de progreso y el mensaje de estado reflejan un cambio de texto o de configuración del límite en menos de 1 segundo.
- **SC-011**: El 100% de un conjunto de casos de prueba representativos (valor por debajo, igual, y por encima del máximo, para cada una de las tres métricas) muestra el porcentaje y el mensaje de estado correctos.
- **SC-012**: Un usuario puede determinar si su texto cumple el límite configurado leyendo únicamente el mensaje de texto del indicador de estado, sin depender exclusivamente del color.

## Assumptions

- Esta especificación se apoya en las "Métricas de texto" ya entregadas por REQ-02
  (`specs/002-panel-metricas-dinamicas/spec.md`) para obtener el valor actual de palabras, caracteres y
  líneas; no redefine su cálculo.
- Conforme al diseño de layout de `docs/product-requirements.md` (sección "Diseño de Layout"), el panel de
  Control de Límites se ubica en un SIDEBAR junto a MAIN CONTENT. Esta especificación introduce dicha región
  de layout (previamente fuera de alcance en REQ-01/REQ-02) únicamente para alojar este panel; no se agregan
  otros paneles del Sidebar (por ejemplo, el panel de seguridad) en esta especificación.
- El requerimiento de "Excluir espacios (Sin Espacios)" (FR-05 de `docs/product-requirements.md`) queda fuera
  de alcance de esta especificación; se abordará en un requerimiento funcional posterior.
- Valor por defecto al cargar la página: tipo de límite = "Palabras", valor máximo = 500 (consistente con la
  maqueta de referencia de `docs/product-requirements.md`).
- El campo de valor máximo acepta únicamente números enteros positivos; un intento de ingresar un valor
  negativo, cero como entrada directa del usuario, o un valor no numérico no reemplaza el último valor máximo
  válido (ver Edge Cases). El valor 0 sí es válido como configuración inicial/por defecto si el sistema lo
  establece explícitamente, pero no se considera una entrada típica del usuario.
- El diseño visual del panel de Control de Límites (Sidebar, barra de progreso, colores de estado) sigue los
  lineamientos generales de tema oscuro premium de `docs/product-requirements.md` (NFR-04/NFR-05), sin definir
  en esta especificación detalles visuales más allá de su estructura, contenido y accesibilidad.
