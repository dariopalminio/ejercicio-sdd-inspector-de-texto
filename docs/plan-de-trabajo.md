# Plan del Ejercicio Paso a Paso

## 1. Lee el documento de especificación base

Lee el documento de especificación base `docs/product-requirements.md`

## 2. Iniciación del proyecto

### 2.1. Verificar dependencias

node --version && npm --version && uv --version && git --version && code --version

### 2.2. Clonar repo

Luego de clonar el repositorio (la rama de release/01-inicial), instalá las dependencias:

```bash
git clone -b release/01-inicial https://github.com/dariopalminio/ejercicio-sdd-inspector-de-texto.git
cd ejercicio-sdd-inspector-de-texto
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

/init – Analiza tu codebase y crea instrucciones personalizadas para ayudar a la IA a generar código que coincida con tus prácticas de codificación.

/help – Muestra los comandos disponibles y ayuda sobre cómo usar Copilot Chat.

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

- Always read product requirements in `docs/product-requirements.md` as basic context.


## 7. Creación de Especificaciones de forma iterativa

### 7.1. Crear primera especificación (FR-01)

Escribe en el chat de Copilot:

/speckit.specify crear FR-01 - Entrada y Gestión de Texto: El sistema debe proveer un área de texto principal para ingresar o pegar texto libre. Debe incluir una acción (botón) explícita para vaciar rápidamente el contenido del área de trabajo. Respeta el diseño de la interfaz (layout) y las pautas de accesibilidad. Da estructura al layout de la página e implementa solo el MAIN CONTENT.

Espera, revisa y luego →

/speckit.plan

Espera, revisa y luego →

/speckit.tasks

Espera, revisa y luego →

/speckit.implement

Espera, revisa y luego →

Review Manual (Recomendada): Una vez que hayas verificado que la implementación cumple con la especificación y ha pasado todas las pruebas, edita el archivo spec.md y cambia manualmente Status: Draft a Status: Completed (o el estado que uses, como Review).

