# AGENTS.md

## Descripción general del proyecto

Este repositorio es una aplicación de página única (SPA) en React + TypeScript para el ejercicio "Inspector de Texto". La app analiza texto en el navegador, controla límites de palabras/caracteres/líneas, detecta caracteres Unicode ocultos y permite desinfectar el texto y copiarlo ya limpio.

Referencias principales:
- [README.md](README.md)
- [docs/project-requirements.md](docs/project-requirements.md)
- [docs/enunciado-del-ejercicio.md](docs/enunciado-del-ejercicio.md)
- [docs/plan-de-trabajo.md](docs/plan-de-trabajo.md)

## Stack y restricciones

- React 19 + TypeScript
- Create React App con `react-scripts` (el repositorio está actualmente en el estado inicial por defecto de CRA)
- Testing Library + Jest
- Sin backend ni dependencia de red para el análisis de texto; todo el procesamiento debe permanecer local en el navegador
- La especificación del proyecto pide una interfaz oscura y elegante y menciona Tailwind CSS, pero el repositorio sigue siendo una app CRA mínima hasta que comience la implementación
- Mantener el comportamiento y la UI alineados con la especificación del proyecto, en especial los requisitos de accesibilidad y de "sleek dark"

## Gobernanza y Flujo de Trabajo de SDD

- Este proyecto sigue estrictamente el Desarrollo Dirigido por Especificaciones (SDD) mediante GitHub Spec Kit.
- Antes de sugerir implementaciones arquitectónicas o de código, revise `.specify/memory/constitution.md`.
- Asegúrese de que el código cumpla estrictamente con las especificaciones vigentes ubicadas en `.specify/specs/`.

## Estructura de directorios (Código principal)

```text
src/
	├── components/              # Demos reutilizables por componente
	├── pages/                   # Páginas enrutables de cada demo
    │   └── ComponentNamePage.tsx # Página de demostración
	├── App.tsx                  # Definición de rutas y layout base
```

## Comandos habituales

```bash
npm install
npm start
npm test -- --watch=false
npm run build
```

## Convenciones de trabajo

- Preferir componentes React pequeños y enfocados, con una propiedad clara de quién es dueño de cada estado.
- Mantener la lógica de procesamiento de texto en funciones auxiliares reutilizables o utilidades tipadas, en lugar de incrustarla directamente en los componentes de UI.
- Usar tipos de TypeScript para el estado, las props y los valores derivados.
- Ajustarse a los requerimientos funcionales de [docs/project-requirements.md](docs/project-requirements.md), no al contenido inicial por defecto de CRA.
- Preservar la política de solo navegador y cero datos: evitar APIs externas o procesamiento del lado del servidor.
- Al implementar lógica sensible al rendimiento, agregar un debounce de aproximadamente 150 ms para los recálculos pesados.
- Mantener explícita la retroalimentación de la UI: el estado del límite, la barra de progreso, las alertas de caracteres ocultos y las acciones de desinfección deben entenderse de un vistazo.
- No tratar la pantalla por defecto actual de CRA como el producto final. La app debe evolucionar hacia la funcionalidad de inspector descrita en la documentación.

## Comportamientos esperados de la implementación

- El texto de entrada es editable en un campo tipo textarea, con una acción clara para vaciarlo/reiniciarlo.
- Métricas en vivo: total de palabras, caracteres y líneas.
- Un selector determina si el límite se aplica sobre palabras, caracteres o líneas.
- Una casilla de verificación visible permite excluir los espacios en blanco al contar caracteres.
- Un indicador de progreso y un texto de estado reflejan si el valor actual está dentro o por encima del máximo configurado.
- Los caracteres ocultos, como el zero-width space, el BOM y los caracteres de control ASCII, se detectan de forma continua y se cuentan.
- La acción "Limpiar y Copiar" elimina los caracteres ocultos y copia el resultado desinfectado al portapapeles.

## Expectativas de testing

- Agregar o actualizar pruebas para el comportamiento visible por el usuario, especialmente las métricas de texto, la lógica de límites, la detección de caracteres ocultos y las acciones de desinfección.
- Preferir las consultas de Testing Library y el comportamiento real del DOM antes que aserciones sobre detalles de implementación.
- Mantener las pruebas deterministas y rápidas. Evitar supuestos innecesarios de red o específicos del navegador.

## Antes de dar por terminado el trabajo

- Ejecutar las pruebas relevantes y verificar que la app compile sin errores cuando el cambio afecte el comportamiento central.
- Si se agrega un cambio de UI, asegurarse de que siga siendo consistente con el diseño oscuro premium descrito en los requerimientos.
- No duplicar la documentación existente; enlazar a los documentos del proyecto en lugar de volver a explicarlos en detalle.
