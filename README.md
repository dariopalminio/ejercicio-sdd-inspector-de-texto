# Inspector de Texto

**Ejercicio de estudio de SDD con Github Spec-kit:**

Inspector de Texto es una aplicación web de página única (SPA) para analizar texto en tiempo real: verifica el cumplimiento de límites configurables (palabras, caracteres o líneas) y detecta caracteres ocultos o invisibles (Unicode no imprimible) que suelen colarse al copiar y pegar contenido desde otras fuentes. Además, permite desinfectar el texto y copiarlo al portapapeles ya limpio.

Todo el procesamiento ocurre **100% en el navegador**: no se envía el texto a ningún servidor.

## Funcionalidades

- **Área de trabajo:** campo de texto para escribir o pegar contenido, con acción para vaciarlo rápidamente.
- **Métricas en tiempo real:** total de palabras, caracteres y líneas.
- **Control de límites:** selector de métrica (palabras / caracteres / líneas) y valor máximo objetivo.
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

## Instalación

Luego de clonar el repositorio, instalá las dependencias:

```bash
git clone <url-del-repositorio>
cd ejercicio-sdd-inspector-de-texto
npm install
```

Después iniciá la app con `npm start`.

## Scripts disponibles

En el directorio del proyecto podés ejecutar:

### `npm start`

Ejecuta la app en modo desarrollo.\
Abrí [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se recarga cuando hacés cambios.\
También vas a ver los errores de lint en la consola.

### `npm test`

Inicia el corredor de pruebas en modo interactivo (watch).\
Consultá la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Compila la app para producción en la carpeta `build`.\
Empaqueta React en modo producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación queda minificada y los nombres de archivo incluyen los hashes.\
¡Tu app está lista para desplegarse!

Consultá la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

## Más información

Podés aprender más en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, consultá la [documentación de React](https://reactjs.org/).
