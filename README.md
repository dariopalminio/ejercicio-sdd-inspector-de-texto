# Inspector de Texto

**Inspector de Texto** es una aplicación web de página única (SPA) para analizar texto en tiempo real: verifica el cumplimiento de límites configurables (palabras, caracteres o líneas) y detecta caracteres ocultos o invisibles (Unicode no imprimible) que suelen colarse al copiar y pegar contenido desde otras fuentes. Además, permite desinfectar el texto y copiarlo al portapapeles ya limpio.

Todo el procesamiento ocurre **100% en el navegador**: no se envía el texto a ningún servidor.

## Funcionalidades

- **Área de trabajo:** campo de texto para escribir o pegar contenido, con acción para vaciarlo rápidamente.
- **Métricas en tiempo real:** total de palabras, caracteres y líneas.
- **Control de límites:** selector de métrica (palabras / caracteres / líneas) y valor máximo objetivo.
- **Exclusión de espacios:** opción para contar caracteres sin considerar espacios en blanco.
- **Retroalimentación visual:** barra de progreso porcentual e indicador de estado ("Dentro del límite" / "Por encima del máximo").
- **Inspección de seguridad:** escaneo continuo de caracteres invisibles (zero-width space `\u200B`, BOM `\uFEFF`, caracteres de control ASCII) con el conteo exacto de hallazgos.
- **Limpiar y copiar:** remueve los caracteres invisibles detectados y copia la versión limpia al portapapeles.

## Contexto

Este repositorio es el **ejercicio práctico** de Spec-Driven Development (SDD) con [GitHub Spec Kit](https://github.com/github/spec-kit): la app se construye a partir de la especificación base, recorriendo el flujo completo de *specify → plan → tasks → implement*. Los documentos de referencia están en [docs/](docs/):

- [docs/enunciado-del-ejercicio.md](docs/enunciado-del-ejercicio.md) — consigna y flujo de trabajo del ejercicio.
- [docs/project-requirements.md](docs/project-requirements.md) — especificación con los requerimientos funcionales y no funcionales.

> **Estado actual:** el proyecto está recién inicializado con Create React App (React 19 + TypeScript). La funcionalidad descrita arriba corresponde a la especificación y todavía no está implementada en `src/`.

## Stack

- React 19 + TypeScript (SPA)
- Create React App (`react-scripts`)
- Testing Library + Jest

## Installation

After cloning the repository, install the dependencies:

```bash
git clone <repository-url>
cd ejercicio-inspector-de-texto
npm install
```

Then start the app with `npm start`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
