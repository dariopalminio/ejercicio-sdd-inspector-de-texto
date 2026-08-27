# Feature Specification: Sanitización y Exportación (REQ-05)

**Feature Branch**: `005-sanitizacion-exportacion`

**Created**: 2026-08-26

**Status**: Draft

**Input**: User description: "Sanitización y Exportación: El sistema debe proveer un botón "Sanitizar y Copiar" que, al accionarse, remueva automáticamente todos los caracteres invisibles detectados en el texto y copie la versión limpia al portapapeles del sistema operativo, mostrando una confirmación temporal de éxito."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sanear el texto y copiarlo con una sola acción (Priority: P1)

Como usuario del Inspector de Texto, quiero activar una única acción "Sanitizar y Copiar" que elimine todos
los caracteres ocultos detectados en mi texto y copie la versión limpia al portapapeles, para poder exportar
con confianza un texto libre de artefactos invisibles sin tener que limpiarlo manualmente.

**Why this priority**: Es el valor central de esta especificación; sin la sanitización y copia no hay ninguna
acción de exportación que ofrecer al usuario. Depende de la detección ya entregada por REQ-04 y del documento
de entrada de REQ-01.

**Independent Test**: Puede probarse de forma aislada pegando texto con caracteres ocultos conocidos,
activando "Sanitizar y Copiar", y verificando que el contenido copiado al portapapeles no contiene ninguno de
los artefactos detectados por REQ-04, y que el texto visible en el área de trabajo también queda saneado.

**Acceptance Scenarios**:

1. **Given** el área de texto contiene caracteres ocultos detectados por el Inspector de Seguridad (REQ-04),
   **When** el usuario activa "Sanitizar y Copiar", **Then** el sistema remueve del texto todos esos
   caracteres ocultos antes de copiarlo.
2. **Given** la acción "Sanitizar y Copiar" se completó, **When** se examina el contenido del portapapeles del
   sistema operativo, **Then** contiene exactamente el texto saneado (sin los caracteres ocultos removidos).
3. **Given** la acción "Sanitizar y Copiar" se completó, **When** se observa el área de texto principal,
   **Then** su contenido visible también refleja la versión saneada (sin los caracteres ocultos removidos).
4. **Given** el texto actual no contiene ningún carácter oculto, **When** el usuario activa "Sanitizar y
   Copiar", **Then** el sistema copia el texto sin cambios y no produce ningún error.
5. **Given** el área de texto está vacía, **When** el usuario activa "Sanitizar y Copiar", **Then** el sistema
   copia una cadena vacía al portapapeles sin producir ningún error.

---

### User Story 2 - Ver confirmación de éxito de la copia (Priority: P2)

Como usuario, quiero ver una confirmación visual temporal después de sanear y copiar mi texto, para tener la
certeza de que la acción se completó correctamente sin tener que verificar manualmente el portapapeles.

**Why this priority**: Aporta la retroalimentación visible de la acción, pero depende de que la sanitización y
copia (User Story 1) ya se haya ejecutado.

**Independent Test**: Puede probarse de forma aislada activando "Sanitizar y Copiar" y verificando que aparece
un mensaje de confirmación de éxito, y que ese mensaje desaparece automáticamente después de un breve período
sin requerir ninguna acción adicional del usuario.

**Acceptance Scenarios**:

1. **Given** el usuario activa "Sanitizar y Copiar" y la copia al portapapeles se realiza correctamente,
   **When** la acción se completa, **Then** el sistema muestra un mensaje de confirmación de éxito visible.
2. **Given** el mensaje de confirmación de éxito está visible, **When** transcurre un breve período de tiempo
   sin interacción adicional, **Then** el mensaje desaparece automáticamente.
3. **Given** la copia al portapapeles falla (por ejemplo, por permisos denegados del navegador), **When** el
   usuario activa "Sanitizar y Copiar", **Then** el sistema muestra un mensaje de error en lugar de una
   confirmación de éxito, sin afectar el contenido ya mostrado en el área de texto.

---

### Edge Cases

- ¿Qué ocurre si el navegador deniega el permiso para escribir en el portapapeles o la API no está
  disponible? El sistema debe mostrar un mensaje de error claro en vez de una confirmación de éxito falsa, y
  no debe dejar la interfaz en un estado ambiguo.
- ¿Qué ocurre si el usuario activa "Sanitizar y Copiar" varias veces seguidas rápidamente? Cada activación
  debe completarse de forma independiente sin producir errores ni confirmaciones duplicadas persistentes.
- ¿Qué ocurre si el texto no contiene caracteres ocultos? La acción debe completarse igualmente, copiando el
  texto sin cambios y mostrando la confirmación de éxito (Acceptance Scenario 4 de User Story 1).
- ¿Qué ocurre si el usuario modifica el texto mientras el mensaje de confirmación aún está visible? El mensaje
  de confirmación puede desaparecer antes de su tiempo normal o permanecer hasta su expiración; en cualquier
  caso, no debe bloquear la edición del texto.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-035**: El sistema DEBE proveer una acción (botón) "Sanitizar y Copiar" claramente visible junto al área
  de texto principal (MAIN CONTENT).
- **FR-036**: Al activarse, el sistema DEBE remover del texto todos los caracteres ocultos/artefactos
  detectados por el Inspector de Seguridad (REQ-04: espacio de ancho cero, BOM, y caracteres de control ASCII
  `U+0000–U+001F` excluyendo tabulación, salto de línea y retorno de carro).
- **FR-037**: El sistema DEBE actualizar el contenido visible del área de texto principal con la versión
  saneada, de modo que el documento de entrada quede libre de los caracteres ocultos removidos.
- **FR-038**: El sistema DEBE copiar la versión saneada del texto al portapapeles del sistema operativo del
  usuario.
- **FR-039**: El sistema DEBE mostrar una confirmación visual temporal de éxito inmediatamente después de una
  copia exitosa al portapapeles, y esa confirmación DEBE desaparecer automáticamente sin intervención del
  usuario.
- **FR-040**: Si la copia al portapapeles falla, el sistema DEBE mostrar un mensaje de error en lugar de una
  confirmación de éxito.
- **FR-041**: La acción DEBE completarse sin error tanto cuando el texto no contiene caracteres ocultos como
  cuando el área de texto está vacía.
- **FR-042**: El proceso de saneado y copia DEBE ejecutarse localmente en el navegador del usuario, sin enviar
  el contenido del texto a ningún servicio externo (más allá de la propia interacción con el portapapeles del
  sistema operativo del usuario).

### Key Entities

- **Texto saneado**: Versión derivada del "Documento de entrada" (REQ-01) tras remover todos los caracteres
  ocultos detectados por el "Reporte de seguridad" (REQ-04). Reemplaza el contenido visible del documento de
  entrada y es el valor que se copia al portapapeles.
- **Estado de la acción de copia**: Valor transitorio que representa el resultado de la última activación de
  "Sanitizar y Copiar" (éxito o error), usado únicamente para mostrar la confirmación o el mensaje de error
  temporal; no se persiste.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-016**: Un usuario puede sanear su texto y copiarlo al portapapeles en una sola acción (un clic o una
  pulsación de tecla).
- **SC-017**: La confirmación de éxito aparece en menos de 1 segundo después de completada la copia, y
  desaparece automáticamente en un tiempo breve y predecible sin intervención del usuario.
- **SC-018**: El 100% de un conjunto de casos de prueba representativos (texto con artefactos, texto sin
  artefactos, texto vacío, y fallo simulado del portapapeles) produce el resultado y la retroalimentación
  visual correctos.

## Assumptions

- Esta especificación se apoya en el "Documento de entrada" (REQ-01) y en el "Reporte de seguridad" (REQ-04,
  `specs/004-inspeccion-seguridad/spec.md`) para determinar exactamente qué caracteres remover; reutiliza el
  mismo alcance de detección ya definido allí, sin ampliarlo.
- Activar "Sanitizar y Copiar" actualiza el contenido visible del área de texto principal con la versión
  saneada (no solo el contenido copiado al portapapeles), de modo que el usuario vea inmediatamente que su
  texto quedó limpio y el Inspector de Seguridad reporte 0 artefactos después de la acción.
- La confirmación temporal de éxito se oculta automáticamente después de aproximadamente 2 a 3 segundos, sin
  requerir que el usuario la cierre manualmente.
- El fallo de la API del portapapeles (por ejemplo, permisos denegados) se considera un caso excepcional poco
  frecuente; el sistema debe informarlo claramente pero no requiere reintentos automáticos ni mecanismos de
  reintento complejos en esta especificación.
- El diseño visual del botón "Sanitizar y Copiar" y de los mensajes de confirmación/error sigue los
  lineamientos generales de tema oscuro premium de `docs/product-requirements.md`, sin definir en esta
  especificación detalles visuales más allá de su estructura, contenido y accesibilidad.
