# Especificación del Producto: Inspector de Texto

## Propósito del Sistema
"Inspector de Texto" es una aplicación web de página única (SPA) diseñada para analizar texto en tiempo real. Su objetivo principal es verificar el cumplimiento de límites configurables (palabras, caracteres o líneas) y detectar vulnerabilidades de seguridad a través de la presencia de caracteres ocultos o invisibles (Unicode no imprimible). Adicionalmente, provee herramientas integradas para desinfectar el texto y copiarlo al portapapeles de forma segura.

---

## Requerimientos Funcionales

*   **REQ-01 - Entrada y Gestión de Texto:** El sistema debe proveer un área de texto principal para ingresar o pegar texto libre. Debe incluir una acción (botón) explícita para vaciar rápidamente el contenido del área de trabajo.
*   **REQ-02 - Panel de Métricas Dinámicas:** El sistema debe calcular y mostrar en tiempo real las siguientes métricas del texto ingresado:
    *   Número total de palabras.
    *   Número total de caracteres.
    *   Número total de líneas.
*   **REQ-03 - Control de Límites:** El sistema debe permitir al usuario establecer y gestionar límites para las métricas seleccionadas, asegurando que el contenido del área de texto cumpla con los umbrales configurados. El sistema debe:
    1. **Selector de Tipo de Límite:** El sistema debe permitir al usuario elegir qué métrica utilizar para el control de límites mediante un selector (Palabras, Caracteres o Líneas).
    2. **Configuración de Límite Máximo:** El sistema debe permitir establecer un valor numérico máximo objetivo.
    3. **Retroalimentación Visual de Límites:** El sistema debe mostrar una barra de progreso porcentual y un indicador de estado visual (colores y mensajes como "Dentro del límite" o "Por encima del máximo") que se actualicen en tiempo real según el umbral configurado.
*   **REQ-04 - Control de Exclusión de Espacios:** El sistema debe incluir una opción (checkbox) permanentemente visible para "Excluir espacios (Sin Espacios)" (espacios en blanco), permitiendo que la verificación por caracteres evalúe el texto sin considerar los espacios en blanco.
*   **REQ-05 - Inspección de Seguridad (Caracteres Ocultos):** El sistema debe escanear continuamente el texto mediante expresiones regulares para detectar caracteres Unicode invisibles (ej. zero-width space `\u200B`, BOM `\uFEFF`, caracteres de control ASCII). Debe alertar visualmente al usuario indicando la cantidad exacta de vulnerabilidades o artefactos encontrados.
*   **REQ-06 - Sanitización y Exportación:** El sistema debe proveer un botón "Sanitizar y Copiar" que, al accionarse, remueva automáticamente todos los caracteres invisibles detectados en el texto y copie la versión limpia al portapapeles del sistema operativo, mostrando una confirmación temporal de éxito.

---

## Requerimientos No Funcionales

*   **RNF-01 - Arquitectura y Tecnologías:** La aplicación debe estar construida como una Single Page Application (SPA) utilizando el siguiente stack: React, TypeScript, Tailwind CSS.
*   **RNF-02 - Privacidad y Procesamiento Local (Zero-Data):** El sistema no debe realizar peticiones de red externas para el análisis del texto. Todo el procesamiento (conteo, escaneo y sanitización) debe ejecutarse de forma 100% local en el navegador del cliente para garantizar la privacidad de los datos ingresados.
*   **RNF-03 - Rendimiento y Resiliencia (Debouncing):** Para evitar bloqueos del hilo de renderizado del navegador ante operaciones de pegado masivo de texto, el cálculo de métricas y el escaneo de seguridad deben implementar una técnica de *debounce* (ej. 150ms).
*   **RNF-04 - Diseño Visual (Sleek Interface):** La interfaz gráfica debe adherirse a un diseño de alto contraste y tema oscuro premium ("Sleek Interface"), utilizando una paleta de colores basada en `slate-900`/`slate-950` para fondos y `emerald-400`/`emerald-500` para acentos, métricas y estados seguros, y tonos ámbar/rojo para alertas.
*   **RNF-05 - Diseño Responsivo:** La estructura debe basarse en Flexbox y CSS Grid, garantizando que el diseño se adapte desde dispositivos móviles (diseño apilado) hasta monitores amplios (disposición de columnas con panel lateral).
*   **RNF-06 - Accesibilidad Básica:** El sistema debe hacer uso de un contraste adecuado de texto y mantener indicadores semánticos (iconografía acompañada de texto descriptivo y colores de estado) que faciliten la rápida lectura e interpretación de las advertencias.
*   **RNF-07 - Diseño de Layout:** El sistema debe mantener una estructura de layout coherente y adaptable, asegurando que los elementos principales (Topbar, Sidebar, Main Content) se presenten de manera clara y accesible en diferentes tamaños de pantalla. Respetar el diseño indicado en la sección "Diseño de Layout".

## Diseño de Layout (RNF-07)

### Estructura conceptual

El layout se puede expresar de forma simple como sigue:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                              TOPBAR / HEADER                                  │
├───────────────────────────────────────────────────────────────┬───────────────┤
│                                                               │               │
│                                                               │   SIDEBAR     │
│                       MAIN CONTENT                            │               │
│                                                               │ ┌───────────┐ │
│  ┌─────────────────────────────────────────────────────────┐  │ │ Limits    │ │
│  │                                                         │  │ └───────────┘ │
│  │                    TEXT INPUT                           │  │               │
│  │                                                         │  │ ┌───────────┐ │
│  │                                                         │  │ │ Security  │ │
│  │                                                         │  │ └───────────┘ │
│  │                                           [Action]      │  │               │
│  └─────────────────────────────────────────────────────────┘  │               │
│                                                               │               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │               │
│  │   Words     │ │ Characters  │ │   Lines     │              │               │
│  │      2      │ │     20      │ │      1      │              │               │
│  └─────────────┘ └─────────────┘ └─────────────┘              │               │
│                                                               │ ┌───────────┐ │
│                                                               │ │Processing │ │
│                                                               │ └───────────┘ │
├───────────────────────────────────────────────────────────────┴───────────────┤
│                                FOOTER                                         │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Maquetado

Se debe mantener la estructura, proporciones y jerarquía visual de la maqueta base siguiente:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌──────┐  Secure Word Inspector  ┌────────────┐                                      ● Privacy Shield Active │
│  │  🛡  │                         │ LOCAL ONLY │                                                              │
│  └──────┘                         └────────────┘                                                              │
├───────────────────────────────────────────────────────────────────────────────┬──────────────────────────────┤
│                                                                               │                              │
│  INPUT DOCUMENT                                                🗑 Vaciar      │  CONTROL DE LÍMITES         │
│                                                                               │                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │  ┌────────────────────────┐  │
│  │                                                                         │  │  │ ┌────────┬───────────┐ │  │
│  │  Texto introducido...|                                                  │  │  │ │PALABRAS│ CARACTERES│ │  │
│  │                                                                         │  │  │ └────────┴───────────┘ │  │
│  │                                                                         │  │  │ ┌──────────────┐       │  │
│  │                                                                         │  │  │ │ Máx. Palabras│ 500   │       │
│  │                                                                         │  │  │ └──────────────┘       │  │
│  │                                                                         │  │  │                        │  │
│  │                                                                         │  │  │ □ EXCLUIR ESPACIOS     │  │
│  │                                                                         │  │  │   (SIN ESPACIOS)       │  │
│  │                                                                         │  │  │                        │  │
│  │                                                                         │  │  │ ─────────────────────  │  │
│  │                                                                         │  │  │ Dentro del límite 2/500│  │
│  │                                                                         │  │  └────────────────────────┘  │
│  │                                                                         │  │                              │
│  │                                                                         │  │  INSPECTOR DE SEGURIDAD     │
│  │                                                                         │  │                              │
│  │                                                                         │  │  ┌────────────────────────┐  │
│  │                                                                         │  │  │ 🛡 TEXTO SEGURO         │  │
│  │                                                                         │  │  ├────────────────────────┤  │
│  │                                                                         │  │  │                        │  │
│  │                                                                         │  │  │ No se han detectado    │  │
│  │                                                                         │  │  │ artefactos ni          │  │
│  │                                                                         │  │  │ caracteres Unicode     │  │
│  │                                                                         │  │  │ invisibles.            │  │
│  │                                                                         │  │  └────────────────────────┘  │
│  │                                                                         │  │                              │
│  │                                                                         │  │                              │
│  │                                                                         │  │                              │
│  │                                                                         │  │                              │
│  │                                                                         │  │                              │
│  │                                                                         │  │  ┌────────────────────────┐  │
│  │                                                                         │  │  │ VELOCIDAD DE PROC. 0.1ms│  │
│  │                                                                         │  │  │ Buffer local encriptado│  │
│  │                                                                         │  │  │ activo                 │  │
│  │                                                                         │  │  └────────────────────────┘  │
│  │                                                                         │  │                              │
│  │                                             ┌──────────────────────┐    │  │                              │
│  │                                             │  ▣ Limpiar y Copiar  │    │  │                              │
│  │                                             └──────────────────────┘    │  │                              │
│  └─────────────────────────────────────────────────────────────────────────┘  │                              │
│                                                                               │                              │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐          │                              │
│  │ PALABRAS          │  │ CARACTERES        │  │ LÍNEAS            │          │                              │
│  │                   │  │                   │  │                   │          │                              │
│  │ 2                 │  │ 20                │  │ 1                 │          │                              │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘          │                              │
├───────────────────────────────────────────────────────────────────────────────┴──────────────────────────────┤
│  Codificación UTF-8       Cero Peticiones de Red                                  SYSTEM_READY // BUFFER_SAFE │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```