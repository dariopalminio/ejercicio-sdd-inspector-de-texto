# Feature Specification: Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

**Feature Branch**: `004-inspeccion-seguridad`

**Created**: 2026-08-26

**Status**: Completed

**Input**: User description: "Inspección de Seguridad (Caracteres Ocultos): El sistema debe escanear continuamente el texto mediante expresiones regulares para detectar caracteres Unicode invisibles (ej. zero-width space \u200B, BOM \uFEFF, caracteres de control ASCII). Debe alertar visualmente al usuario indicando la cantidad exacta de vulnerabilidades o artefactos encontrados."

## Clarifications

### Session 2026-08-26

- Q: ¿La detección de caracteres ocultos debe limitarse exactamente a los tres tipos mencionados (zero-width space, BOM, control ASCII) o debe ampliarse a otros caracteres Unicode invisibles similares? → A: Alcance fijo — únicamente zero-width space (`\u200B`), BOM (`\uFEFF`), y caracteres de control ASCII en el rango `U+0000–U+001F` excluyendo tabulación (`\t`), salto de línea (`\n`) y retorno de carro (`\r`). El carácter DEL (`U+007F`) y otros caracteres Unicode invisibles (por ejemplo, ZWNJ, ZWJ, word joiner) quedan fuera de alcance de esta especificación.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Detectar caracteres ocultos en tiempo real (Priority: P1)

Como usuario del Inspector de Texto, quiero que el sistema escanee continuamente mi texto en busca de
caracteres Unicode invisibles o de control, para poder saber si mi contenido contiene artefactos ocultos que
no puedo ver a simple vista.

**Why this priority**: Es el valor central de esta especificación; sin la detección no hay nada que reportar
al usuario. Depende del "Documento de entrada" ya entregado por REQ-01.

**Independent Test**: Puede probarse de forma aislada pegando texto que contenga caracteres invisibles
conocidos (zero-width space, BOM, caracteres de control ASCII) y verificando que el conteo detectado coincide
exactamente con la cantidad de caracteres ocultos insertados.

**Acceptance Scenarios**:

1. **Given** el área de texto está vacía, **When** la página carga, **Then** el sistema reporta 0 caracteres
   ocultos detectados.
2. **Given** el usuario pega texto que contiene uno o más espacios de ancho cero (zero-width space, `\u200B`),
   **When** se escanea el texto, **Then** el conteo detectado incluye exactamente esos caracteres.
3. **Given** el usuario pega texto que contiene una marca de orden de bytes (BOM, `\uFEFF`), **When** se
   escanea el texto, **Then** el conteo detectado incluye ese carácter.
4. **Given** el usuario pega texto que contiene caracteres de control ASCII no imprimibles (por ejemplo,
   `\u0000` o `\u001F`), **When** se escanea el texto, **Then** el conteo detectado incluye esos caracteres.
5. **Given** el usuario continúa escribiendo o pegando más texto, **When** el contenido cambia, **Then** el
   conteo de caracteres ocultos se recalcula automáticamente.

---

### User Story 2 - Ver el estado de seguridad del texto de un vistazo (Priority: P2)

Como usuario, quiero ver un indicador visual claro que me diga si mi texto está "seguro" o si contiene
caracteres ocultos (con la cantidad exacta), para poder decidir rápidamente si necesito revisar o limpiar mi
contenido.

**Why this priority**: Aporta la retroalimentación visible del panel, pero depende de que ya exista la
detección (User Story 1) para tener información que mostrar.

**Independent Test**: Puede probarse de forma aislada alternando entre texto sin caracteres ocultos y texto
con caracteres ocultos conocidos, verificando que el indicador cambia entre un estado "seguro" y un estado de
alerta con la cantidad exacta detectada.

**Acceptance Scenarios**:

1. **Given** el texto actual no contiene caracteres ocultos, **When** se recalcula el estado de seguridad,
   **Then** el sistema muestra un indicador de estado "seguro" (por ejemplo, "Texto seguro"), sin depender
   únicamente del color para comunicarlo.
2. **Given** el texto actual contiene al menos un carácter oculto, **When** se recalcula el estado de
   seguridad, **Then** el sistema muestra un indicador de alerta con un mensaje distinto al estado seguro y la
   cantidad exacta de caracteres ocultos encontrados.
3. **Given** el usuario modifica el texto (agregando o quitando caracteres ocultos), **When** el contenido
   cambia, **Then** el indicador de estado y el conteo se actualizan automáticamente en tiempo real.

---

### Edge Cases

- ¿Qué ocurre con los caracteres de control ASCII considerados de formato normal (tabulación `\t`, salto de
  línea `\n`, retorno de carro `\r`)? El sistema NO debe contarlos como caracteres ocultos/artefactos, ya que
  son parte del formato esperado de un área de texto multilínea.
- ¿Qué ocurre si el texto contiene únicamente caracteres imprimibles normales? El conteo debe ser 0 y el
  estado debe mostrarse como "seguro".
- ¿Qué ocurre si el usuario pega un bloque de texto extremadamente largo que contiene caracteres ocultos
  dispersos? El escaneo debe seguir completándose y actualizando el conteo sin bloquear la interacción del
  usuario.
- ¿Qué ocurre si el usuario vacía el área de texto (acción "Vaciar" de REQ-01)? El conteo de caracteres
  ocultos debe volver a 0 y el estado debe volver a "seguro".
- ¿Qué ocurre si el mismo carácter oculto aparece varias veces en el texto? Cada aparición debe contarse por
  separado (el conteo refleja el número total de ocurrencias, no el número de tipos distintos).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-027**: El sistema DEBE escanear continuamente el contenido del "Documento de entrada" (REQ-01) para
  detectar exactamente estos artefactos: espacios de ancho cero (`\u200B`), marcas de orden de bytes
  (`\uFEFF`), y caracteres de control ASCII en el rango `U+0000–U+001F`, excluyendo tabulación (`\t`), salto
  de línea (`\n`) y retorno de carro (`\r`). Otros caracteres Unicode invisibles (por ejemplo, DEL `U+007F`,
  ZWNJ, ZWJ, word joiner) quedan fuera de alcance (ver Clarifications).
- **FR-028**: El sistema DEBE calcular y mostrar la cantidad exacta de caracteres ocultos/artefactos
  detectados en el texto actual, contando cada ocurrencia individual.
- **FR-029**: El sistema DEBE mostrar un indicador de estado "seguro" cuando la cantidad detectada sea 0.
- **FR-030**: El sistema DEBE mostrar un indicador de estado de alerta, visualmente distinto del estado
  seguro, cuando la cantidad detectada sea mayor a 0, incluyendo la cantidad exacta encontrada en el mensaje.
- **FR-031**: El indicador de estado de seguridad NO DEBE depender únicamente del color para comunicar si el
  texto es seguro o contiene artefactos; debe incluir siempre un mensaje de texto explícito.
- **FR-032**: El sistema DEBE presentar esta información dentro de un panel "Inspector de Seguridad" ubicado
  en la región SIDEBAR (ya introducida por REQ-03), independiente del panel de Control de Límites.
- **FR-033**: El conteo y el indicador de estado DEBEN actualizarse automáticamente cada vez que cambie el
  contenido del área de texto, incluyendo al usar la acción "Vaciar" (el conteo debe volver a 0).
- **FR-034**: El sistema NO DEBE enviar el contenido del texto a ningún servicio externo para realizar el
  escaneo; toda la detección ocurre localmente en el navegador.

### Key Entities

- **Reporte de seguridad**: Valor derivado del "Documento de entrada" (REQ-01), compuesto por un conteo
  numérico de caracteres ocultos/artefactos detectados y un estado categórico ("seguro" o "alerta"). Se
  recalcula automáticamente a partir del contenido actual; no se persiste ni se envía a ningún servicio
  externo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-013**: El conteo de caracteres ocultos y el indicador de estado se actualizan en menos de 1 segundo
  después de que el usuario escribe o pega texto.
- **SC-014**: El 100% de un conjunto de casos de prueba representativos (texto sin artefactos, con espacios de
  ancho cero, con BOM, con caracteres de control ASCII, y con combinaciones de estos) reporta el conteo exacto
  y el estado correcto.
- **SC-015**: Un usuario puede determinar si su texto es seguro o contiene artefactos ocultos leyendo
  únicamente el mensaje de texto del indicador, sin depender exclusivamente del color.

## Assumptions

- Esta especificación se apoya en el "Documento de entrada" ya entregado por REQ-01
  (`specs/001-entrada-gestion-texto/spec.md`) como fuente del texto a escanear; no redefine su comportamiento
  de entrada.
- Se reutiliza la región SIDEBAR introducida por REQ-03 (`specs/003-control-limites/spec.md`) para alojar el
  nuevo panel "Inspector de Seguridad", ubicado junto al panel de Control de Límites ya existente.
- Los caracteres de control ASCII considerados "de formato normal" (tabulación, salto de línea, retorno de
  carro) quedan explícitamente excluidos del conteo de artefactos, ya que son parte del uso esperado del área
  de texto multilínea.
- Por rendimiento, el recálculo del escaneo ante cada cambio de texto sigue la pauta de la constitución del
  proyecto de aplicar un debounce de aproximadamente 150ms, consistente con el enfoque ya usado para las
  métricas de texto (REQ-02) y el estado del límite (REQ-03).
- Esta especificación cubre únicamente la detección y visualización del conteo/estado; la remoción de los
  caracteres ocultos y su copia al portapapeles ("Limpiar y Copiar") corresponden a un requerimiento funcional
  posterior (FR-08 de `docs/product-requirements.md`).
- El diseño visual del panel "Inspector de Seguridad" sigue los lineamientos generales de tema oscuro premium
  de `docs/product-requirements.md`, sin definir en esta especificación detalles visuales más allá de su
  estructura, contenido y accesibilidad.
