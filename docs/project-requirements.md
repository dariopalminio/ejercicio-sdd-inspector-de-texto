# Especificación del Proyecto: Inspector de Texto

## Propósito del Sistema
"Inspector de Texto" es una aplicación web de página única (SPA) diseñada para analizar texto en tiempo real. Su objetivo principal es verificar el cumplimiento de límites configurables (palabras, caracteres o líneas) y detectar vulnerabilidades de seguridad a través de la presencia de caracteres ocultos o invisibles (Unicode no imprimible). Adicionalmente, provee herramientas integradas para desinfectar el texto y copiarlo al portapapeles de forma segura.

---

## Requerimientos Funcionales

*   **FR-01 - Entrada y Gestión de Texto:** El sistema debe proveer un área de texto principal para ingresar o pegar texto libre. Debe incluir una acción (botón) explícita para vaciar rápidamente el contenido del área de trabajo.
*   **FR-02 - Panel de Métricas Dinámicas:** El sistema debe calcular y mostrar en tiempo real las siguientes métricas del texto ingresado:
    *   Número total de palabras.
    *   Número total de caracteres.
    *   Número total de líneas.
*   **FR-03 - Selector de Tipo de Límite:** El sistema debe permitir al usuario elegir qué métrica utilizar para el control de límites mediante un selector (Palabras, Caracteres o Líneas).
*   **FR-04 - Configuración de Límite Máximo:** El sistema debe permitir establecer un valor numérico máximo objetivo.
*   **FR-05 - Control de Exclusión de Espacios:** El sistema debe incluir una opción (checkbox) permanentemente visible para "Excluir espacios (Sin Espacios)", permitiendo que la verificación por caracteres evalúe el texto sin considerar los espacios en blanco.
*   **FR-06 - Retroalimentación Visual de Límites:** El sistema debe mostrar una barra de progreso porcentual y un indicador de estado visual (colores y mensajes como "Dentro del límite" o "Por encima del máximo") que se actualicen en tiempo real según el umbral configurado.
*   **FR-07 - Inspección de Seguridad (Caracteres Ocultos):** El sistema debe escanear continuamente el texto mediante expresiones regulares para detectar caracteres Unicode invisibles (ej. zero-width space `\u200B`, BOM `\uFEFF`, caracteres de control ASCII). Debe alertar visualmente al usuario indicando la cantidad exacta de vulnerabilidades o artefactos encontrados.
*   **FR-08 - Sanitización y Exportación:** El sistema debe proveer un botón "Limpiar y Copiar" que, al accionarse, remueva automáticamente todos los caracteres invisibles detectados en el texto y copie la versión limpia al portapapeles del sistema operativo, mostrando una confirmación temporal de éxito.

---

## Requerimientos No Funcionales

*   **NFR-01 - Arquitectura y Tecnologías:** La aplicación debe estar construida como una Single Page Application (SPA) utilizando el siguiente stack: React, TypeScript, Tailwind CSS.
*   **NFR-02 - Privacidad y Procesamiento Local (Zero-Data):** El sistema no debe realizar peticiones de red externas para el análisis del texto. Todo el procesamiento (conteo, escaneo y sanitización) debe ejecutarse de forma 100% local en el navegador del cliente para garantizar la privacidad de los datos ingresados.
*   **NFR-03 - Rendimiento y Resiliencia (Debouncing):** Para evitar bloqueos del hilo de renderizado del navegador ante operaciones de pegado masivo de texto, el cálculo de métricas y el escaneo de seguridad deben implementar una técnica de *debounce* (ej. 150ms).
*   **NFR-04 - Diseño Visual (Sleek Interface):** La interfaz gráfica debe adherirse a un diseño de alto contraste y tema oscuro premium ("Sleek Interface"), utilizando una paleta de colores basada en `slate-900`/`slate-950` para fondos y `emerald-400`/`emerald-500` para acentos, métricas y estados seguros, y tonos ámbar/rojo para alertas.
*   **NFR-05 - Diseño Responsivo:** La estructura debe basarse en Flexbox y CSS Grid, garantizando que el diseño se adapte desde dispositivos móviles (diseño apilado) hasta monitores amplios (disposición de columnas con panel lateral).
*   **NFR-06 - Accesibilidad Básica:** El sistema debe hacer uso de un contraste adecuado de texto y mantener indicadores semánticos (iconografía acompañada de texto descriptivo y colores de estado) que faciliten la rápida lectura e interpretación de las advertencias.
