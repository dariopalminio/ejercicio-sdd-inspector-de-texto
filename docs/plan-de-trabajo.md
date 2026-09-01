# Plan del Ejercicio Paso a Paso

## 1. Lee el documento de especificación base

Lee el documento de especificación base `docs/product-requirements.md`

## 2. Iniciación del proyecto

### 2.1. Verificar dependencias

Instalar y verificar dependencias:

```bash
node --version && npm --version && uv --version && git --version && code --version
```

### 2.2. Crear proyecto

Puedes crear el proyecto de una de dos formas:

#### 2.2.1. Opción 1: Crear proyecto React

```bash
npx create-react-app proyecto-ejercicio --template typescript 
cd proyecto-ejercicio
code .
```

#### 2.2.2. Opción 2: Clonar repo con proyecto base

Clonar el repositorio (la rama de release/01-inicial):

```bash
git clone -b release/01-inicial https://github.com/dariopalminio/ejercicio-sdd-inspector-de-texto.git proyecto-ejercicio
cd proyecto-ejercicio
npm install
```

### 2.3. Instalar extensión de Copilot

1. Abre Visual Studio Code.
2. Abre la vista de Extensiones de una de estas formas: Ve al menú Ver > Extensiones.
3. Busca la extensión: En el cuadro de búsqueda de la vista de Extensiones, escribe GitHub Copilot Chat
4. Si no está instalada, haz clic en el botón "Instalar" de la extensión GitHub Copilot Chat.
5. Selecciona "Iniciar sesión en GitHub".
6. Tu navegador se abrirá y te pedirá que autorices a VS Code para usar tu cuenta de GitHub.
7. Autoriza la aplicación siguiendo las instrucciones en la pantalla de GitHub.
8. El navegador te devolverá a VS Code.
9. Abrir el panel de Chat de GitHub Copilot Chat (Ctrl+Alt+I en Windows/Linux o Cmd+Alt+I en macOS).

## 3. Inicializar Copilot

Una vez instalado Copilot, prueba estos comandos en el chat de Copilot:

```
/init – Analiza tu codebase y crea instrucciones personalizadas para ayudar a la IA a generar código que coincida con tus prácticas de codificación.

/help – Muestra los comandos disponibles y ayuda sobre cómo usar Copilot Chat.
```
Agrega al prompt de sistem AGENTS.md lo siguiente:

```
## Gobernanza y Flujo de Trabajo de SDD

- Este proyecto sigue estrictamente el Desarrollo Dirigido por Especificaciones (SDD) mediante GitHub Spec Kit.
- Antes de sugerir implementaciones arquitectónicas o de código, revise `.specify/memory/constitution.md`.
- Asegúrese de que el código cumpla estrictamente con las especificaciones vigentes ubicadas en `.specify/specs/`.
```

Agrega una sección de la estructura de directorios del código principal al prompt de sistema de AGENTS.md.

```text
src/
	├── components/              # Demos reutilizables por componente
	├── pages/                   # Páginas enrutables de cada demo
    │   └── ComponentNamePage.tsx # Página de demostración
	├── App.tsx                  # Definición de rutas y layout base
```

## 4. Instalar Specify CLI

Instala globalmente:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Verify installation:

```bash
specify --version
```

## 5. Inicializar y Configurar Speckit

Inicializar el proyecto:

```bash
specify init .
```

## 6. Configurar la "Constitución" del Proyecto

En la interfaz de chat de tu agente de IA, escribe:

```
/speckit-constitution
```

Agrega a la sección "Additional Constraints" la siguiente línea:

```
- Always read product requirements in `docs/product-requirements.md` as basic context.
```

o directamente pega el contenido del archivo: `docs\plan-incremental\constitution-example.md`

## 7. Creación de Especificaciones de forma iterativa

Ejecutar `docs\plan-incremental\plan-de-desarrollo-incremental.md` o el siguiente plan:

### 7.1. Crear primera especificación (REQ-01)

Escribe en el chat de Copilot:

/speckit.specify crear FR-01 - Entrada y Gestión de Texto: El sistema debe proveer un área de texto principal para ingresar o pegar texto libre. Debe incluir una acción (botón) explícita para vaciar rápidamente el contenido del área de trabajo. Respeta el diseño de la interfaz (layout) y las pautas de accesibilidad. Da estructura al layout de la página e implementa solo el MAIN CONTENT.

Espera, revisa y luego →

/speckit.plan

Espera, revisa y luego →

/speckit.tasks

Espera, revisa y luego →

/speckit.implement

Espera, revisa y luego →

npm run build
npm run test
npm run start

Review Manual (Recomendada): Una vez que hayas verificado que la implementación cumple con la especificación y ha pasado todas las pruebas, edita el archivo spec.md y cambia manualmente Status: Draft a Status: Completed (o el estado que uses, como Review).

### 7.2. Iterar el mismo flujo para cada requerimiento funcional

#### Iteración REQ-02: Panel de Métricas Dinámicas

/speckit.specify Panel de Métricas Dinámicas: El sistema debe calcular y mostrar en tiempo real las siguientes métricas del texto ingresado: Número total de palabras, Número total de caracteres, Número total de líneas. Se agrega el panel de métricas dentro del MAIN CONTENT con tres cuadros de resultados (uno por cada métrica). El cálculo de caracteres se hace incluyendo espacios en blanco. Agrega el TOPBAR / HEADER y el FOOTER de la página. En el TOPBAR / HEADER coloca del lado izquierdo el nombre de la aplicación. En el FOOTER coloca información de codificación del texto (UTF-8 por defecto).

#### Iteración REQ-03: Panel de Control de Límites

/speckit.specify Panel de Control de Límites: El sistema debe permitir al usuario establecer y gestionar límites para las métricas seleccionadas, asegurando que el contenido del área de texto cumpla con los umbrales configurados. El panel de Control de Límites debe contener: 1. **Selector de Tipo de Límite:** El sistema debe permitir al usuario elegir qué métrica utilizar para el control de límites mediante un selector radio buttons (Palabras, Caracteres o Líneas). 2. **Configuración de Límite Máximo:** El sistema debe permitir establecer un valor numérico máximo objetivo. 3. **Retroalimentación Visual de Límites:** El sistema debe mostrar una barra de progreso porcentual y un indicador de estado visual (colores y mensajes como "Dentro del límite" o "Por encima del máximo") que se actualicen en tiempo real según el umbral configurado.

#### Iteración REQ-04: Inspección de Seguridad

/speckit.specify Inspección de Seguridad (Caracteres Ocultos): El sistema debe escanear continuamente el texto mediante expresiones regulares para detectar caracteres Unicode invisibles (ej. zero-width space \u200B, BOM \uFEFF, caracteres de control ASCII). Debe alertar visualmente al usuario indicando la cantidad exacta de vulnerabilidades o artefactos encontrados.

**Review**:
Para probarlo: Escribe el texto «El hombre no es lo que cree ser, es lo que oculta» que contenga texto invisible después de la palabra "oculta", he insertado una secuencia de 32 caracteres invisibles que codifican en binario la palabra "HOLA" (usando U+200B como 0 y U+200D como 1).

El texto es:
"El hombre no es lo que cree ser, es lo que oculta​​‍​​‍​​​​​‍​​‍​‍​‍​‍​​‍​​‍​‍​​​​​​​​​‍​. 
Lo esencial es invisible a los ojos​​‍​​‍​​​​​‍​​‍​‍​‍​‍​​‍​​‍​‍​​​​​​​​​‍​."

#### Iteración REQ-05: Sanitización y Exportación

/speckit.specify Sanitización y Exportación: El sistema debe proveer un botón "Sanitizar y Copiar" que, al accionarse, remueva automáticamente todos los caracteres invisibles detectados en el texto y copie la versión limpia al portapapeles del sistema operativo, mostrando una confirmación temporal de éxito.

#### Iteración REQ-06 - Visualizador tipo Overlay/Diff

/speckit.specify Visualizador tipo Overlay/Diff: Un contador de \"5 vulnerabilidades\" no ayuda al usuario a saber dónde están. Se puede implementar una vista superpuesta, gatillada por un botón de mostrar problemas, que sustituya visualmente los caracteres invisibles por insignias legibles (ej. [ZWS], [BOM]) con fondo rojo/ámbar."

**Review**:
Para probarlo: Escribe el texto «El hombre no es lo que cree ser, es lo que oculta» que contenga texto invisible después de la palabra "oculta", he insertado una secuencia de 32 caracteres invisibles que codifican en binario la palabra "HOLA" (usando U+200B como 0 y U+200D como 1).

El texto es:
"El hombre no es lo que cree ser, es lo que oculta​​‍​​‍​​​​​‍​​‍​‍​‍​‍​​‍​​‍​‍​​​​​​​​​‍​. 
Lo esencial es invisible a los ojos​​‍​​‍​​​​​‍​​‍​‍​‍​‍​​‍​​‍​‍​​​​​​​​​‍​."


## 8. Ejercicio extra "Iniciar proyecto todo en uno"

Puedes implementar todo de una vez. Pega todo el contenido de tu archivo de requisitos como entrada del comando /speckit.specify y el agente generará una especificación completa y estructurada para tu proyecto "Inspector de Texto".

El comando /speckit.specify está diseñado para crear una especificación completa a partir de una descripción en lenguaje natural. No solo genera una lista de requisitos, sino que estructura la información en un archivo spec.md que incluye:
* Historias de usuario (User Stories)
* Requerimientos funcionales (Functional Requirements)
* Requerimientos no funcionales (Non-Functional Requirements)
* Criterios de aceptación (Acceptance Scenarios)

Por ejemplo:

/speckit.specify "Inspector de Texto" es una aplicación SPA para analizar texto en tiempo real. 
Permite ingresar texto, calcula métricas (palabras, caracteres, líneas), gestiona límites configurables, 
detecta caracteres Unicode invisibles y permite sanitizar y copiar el texto. 
Requisitos: `docs/product-requirements.md`

