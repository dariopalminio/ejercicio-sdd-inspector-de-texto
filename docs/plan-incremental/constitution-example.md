# Constitución de ejemplo: Inspector de Texto

Este documento resume las reglas técnicas y de producto que se reflejan en la implementación actual de
**Inspector de Texto**. Es un documento de referencia en Markdown; la constitución gobernante del proyecto es
[`/.specify/memory/constitution.md`](../../.specify/memory/constitution.md).

## 1. Arquitectura y stack

- La aplicación es una SPA de una sola pantalla ejecutada en el navegador.
- La interfaz está construida con React 19, TypeScript estricto y componentes funcionales con Hooks.
- El proyecto utiliza Create React App mediante `react-scripts`.
- Tailwind CSS 3 se utiliza para el estilo visual mediante clases utilitarias y tokens locales como
  `surface` y `accent`.
- No se utiliza backend ni enrutador externo. El estado del documento y de la interfaz vive en React.
- La lógica de análisis se mantiene en utilidades TypeScript reutilizables, separada de la presentación.

## 2. Privacidad y procesamiento local

- Todo el análisis del texto se ejecuta localmente en el navegador.
- No se envía el contenido a servicios externos ni se añade telemetría.
- Las métricas se calculan con `calculateTextMetrics` y el reporte de seguridad con
  `detectHiddenCharacters`.
- La sanitización usa `removeHiddenCharacters` y solo interactúa con el sistema operativo al copiar mediante
  `navigator.clipboard.writeText`.
- La detección y la sanitización comparten el mismo alcance: espacio de ancho cero (`U+200B`), BOM
  (`U+FEFF`) y controles ASCII `U+0000–U+001F`, excepto tabulación, salto de línea y retorno de carro.

## 3. Estructura de la interfaz

La composición actual se organiza de la siguiente manera:

```text
App
└── InspectorPage
    └── AppLayout
        ├── Topbar
        ├── MainContent
        │   ├── TextInputArea
        │   ├── ProblemOverlay (cuando está visible)
        │   ├── SanitizeAndCopyButton
        │   ├── botón Mostrar/Ocultar problemas
        │   ├── ClearTextButton
        │   └── MetricsPanel
        ├── Sidebar
        │   ├── LimitsPanel
        │   └── SecurityPanel
        └── Footer
```

- `MainContent` contiene el área editable y las acciones principales.
- `Sidebar` ocupa todo el ancho disponible en pantallas pequeñas y se presenta como una columna lateral en
  pantallas medianas o grandes.
- `Topbar` muestra el nombre `Inspector de Texto` y `Footer` cierra el layout común.
- La interfaz usa una estética oscura basada principalmente en `surface-900` y `surface-950`, con acentos
  verdes y estados de alerta ámbar o rojo.

## 4. Rendimiento y estado

- El documento editable se actualiza de inmediato para mantener una edición fluida.
- Las operaciones derivadas que actualmente usan debounce son el cálculo de métricas y el reporte de seguridad.
- El overlay se deriva del contenido recibido y no mantiene una copia editable ni modifica el documento.
- Los estados transitorios, como la visibilidad del overlay y el resultado de la copia, no se persisten.

## 5. Accesibilidad

- El área de texto tiene el nombre accesible `Documento de entrada`.
- Las acciones se implementan como botones nativos y permanecen disponibles mediante teclado.
- El botón del overlay comunica si la vista está activa u oculta mediante texto y `aria-pressed`.
- Los estados de seguridad, límites y sanitización incluyen texto explícito y no dependen exclusivamente del color.
- La capa visual no captura foco ni eventos de puntero, para no interferir con la edición.

## 6. Calidad y validación

- La lógica pura de métricas, límites, detección, sanitización y segmentación se prueba con Jest.
- Los componentes se validan con React Testing Library y consultas orientadas al comportamiento visible.
- Antes de considerar terminado un cambio funcional se ejecutan:

```powershell
$env:CI = 'true'
npm test -- --watch=false
npm run build
```

- Los cambios deben mantener alineados la implementación, las especificaciones de `specs/` y las pruebas
  relevantes.

## 7. Restricciones de mantenimiento

- Preferir componentes pequeños con una responsabilidad clara.
- Reutilizar las utilidades existentes en lugar de duplicar expresiones regulares o reglas de conteo.
- Mantener el alcance de detección explícito y determinista.
- No introducir dependencias de UI, servicios externos o procesamiento en servidor sin actualizar primero la
  especificación y la constitución gobernante.
