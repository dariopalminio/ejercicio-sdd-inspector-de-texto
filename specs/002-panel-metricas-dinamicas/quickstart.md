# Quickstart: Validar Panel de Métricas Dinámicas (FR-02)

Guía manual para validar de punta a punta el panel de métricas y el layout Topbar/Footer descritos en
[spec.md](./spec.md), una vez implementados.

## Prerrequisitos

- Node.js 18+ y npm instalados.
- Dependencias del proyecto instaladas: `npm install`.
- FR-01 (`specs/001-entrada-gestion-texto/`) ya implementado (área de texto + acción "Vaciar").

## Levantar la aplicación

```bash
npm start
```

Abrir `http://localhost:3000` en el navegador.

## Escenarios a validar

1. **Métricas iniciales en cero** (US1): Con la página recién cargada y el área de texto vacía, verificar que
   los tres cuadros muestran 0 palabras, 0 caracteres, 0 líneas.
2. **Conteo de palabras** (US1): Escribir "hola mundo desde aquí" y verificar que el cuadro de Palabras
   muestra 4.
3. **Conteo de caracteres con espacios** (US1): Escribir "ab cd" (5 caracteres incluyendo el espacio) y
   verificar que el cuadro de Caracteres muestra 5.
4. **Conteo de líneas** (US1): Pegar un texto de 3 líneas separadas por saltos de línea y verificar que el
   cuadro de Líneas muestra 3; repetir con un salto de línea final y verificar que el conteo no aumenta.
5. **Vaciar reinicia métricas** (US1): Con contenido presente, usar la acción "Vaciar" (FR-01) y verificar que
   los tres cuadros vuelven a 0.
6. **Encabezado con nombre de la app** (US2): Verificar que el TOPBAR/HEADER muestra "Inspector de Texto"
   alineado a la izquierda, visible sin importar el contenido del área de texto.
7. **Pie de página con codificación** (US3): Verificar que el FOOTER muestra la información de codificación
   ("Codificación UTF-8"), visible sin importar el contenido del área de texto.
8. **Pegado extenso**: Pegar un bloque de texto muy largo y verificar que las métricas se actualizan sin
   bloquear la interacción del usuario (pueden tardar hasta ~150ms por el debounce).

## Pruebas automatizadas

```bash
npm test -- --watch=false
```

Debe incluir (ver `tasks.md`) pruebas unitarias de `calculateTextMetrics`, y pruebas de componente para
`MetricsPanel`, `Topbar` y `Footer` que cubran los escenarios de aceptación de `spec.md`.

## Verificación de build

```bash
npm run build
```

Debe completar sin errores de compilación de TypeScript ni de build de CRA.

## Referencias

- Contrato de componentes: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Modelo de datos: [data-model.md](./data-model.md)
- Decisiones técnicas: [research.md](./research.md)
