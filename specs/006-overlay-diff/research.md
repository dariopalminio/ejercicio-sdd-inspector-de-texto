# Research: Visualizador Overlay/Diff

## Decision: Reutilizar el alcance de detección existente

- **Decision**: La segmentación anotada consumirá el mismo conjunto de caracteres que `hiddenCharacters.ts`: `U+200B`, `U+FEFF` y controles `U+0000–U+001F` excepto tabulación, salto de línea y retorno de carro.
- **Rationale**: Evita que el overlay contradiga el reporte de seguridad o la sanitización y satisface FR-055, Privacy by Default y Simplicity and Maintainability.
- **Alternatives considered**: Crear una segunda expresión regular específica para el overlay. Se descarta porque duplicaría la fuente de verdad y podría producir conteos o insignias inconsistentes.

## Decision: Representación anotada derivada y no editable

- **Decision**: Un helper puro transformará el texto actual en segmentos tipados de texto visible y artefactos; un componente de lectura renderizará esos segmentos sobre el área editable.
- **Rationale**: Mantiene intacto el valor del `textarea`, permite una insignia por ocurrencia y hace comprobable FR-048 y SC-021.
- **Alternatives considered**: Reemplazar temporalmente el valor del `textarea` con etiquetas. Se descarta porque modificaría el documento, rompería métricas/copia y contaminaría la edición.

## Decision: Overlay sincronizado con el textarea

- **Decision**: La capa y el `textarea` compartirán el contenedor, geometría tipográfica, wrapping y desplazamiento; la capa será no interactiva y el editor conservará el foco y la edición.
- **Rationale**: Es la decisión aclarada para preservar la relación espacial sin introducir un segundo editor. La sincronización de scroll se mantiene local y determinista.
- **Alternatives considered**: Panel de lectura paralelo. Se descarta porque aumenta la carga de comparación, duplica el espacio en móvil y no cumple la decisión de capa alineada.

## Decision: Etiquetas textuales estables y accesibles

- **Decision**: Renderizar `[ZWS]`, `[BOM]` y `[CTRL]` como texto visible; el código Unicode exacto podrá exponerse como información complementaria sin sustituir la etiqueta común.
- **Rationale**: Hace las alertas interpretables sin depender del color y mantiene el resultado compacto para múltiples ocurrencias.
- **Alternatives considered**: Usar únicamente color o iconografía. Se descarta por los requisitos de accesibilidad y claridad.

## Decision: Estado de alternancia local

- **Decision**: El estado visible/oculto se mantendrá en la composición de `InspectorPage` o `MainContent`, se iniciará oculto y se expresará en el control mediante texto y estado semántico.
- **Rationale**: No requiere persistencia, mantiene el flujo de edición normal y permite que el estado sea testeable desde el DOM.
- **Alternatives considered**: Persistir la preferencia entre sesiones. Se descarta por no aportar valor al alcance y por añadir estado innecesario.

## Open design details deferred to implementation

- La elección exacta de clases Tailwind y los valores de posicionamiento se resolverá respetando los tokens existentes y pruebas responsive.
- La información complementaria del código Unicode se podrá expresar mediante nombre accesible o tooltip si no interfiere con la edición.
