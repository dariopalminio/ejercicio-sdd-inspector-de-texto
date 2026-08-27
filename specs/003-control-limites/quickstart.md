# Quickstart: Validar Panel de Control de Límites (REQ-03)

Guía manual para validar de punta a punta el panel de Control de Límites y la región SIDEBAR descritos en
[spec.md](./spec.md), una vez implementados.

## Prerrequisitos

- Node.js 18+ y npm instalados.
- Dependencias del proyecto instaladas: `npm install`.
- REQ-01 y REQ-02 ya implementados (área de texto, acción "Vaciar", panel de métricas, Topbar/Footer).

## Levantar la aplicación

```bash
npm start
```

Abrir `http://localhost:3000` en el navegador.

## Escenarios a validar

1. **Configuración por defecto** (US1): Al cargar la página, verificar que el botón de opción "Palabras" está
   seleccionado y el campo de valor máximo muestra 500.
2. **Cambiar el tipo de límite** (US1): Seleccionar el botón de opción "Caracteres" y luego "Líneas",
   verificando que el estado del límite se recalcula usando la métrica elegida.
3. **Cambiar el valor máximo** (US1): Establecer el valor máximo en 10 y verificar que la barra de progreso y
   el mensaje de estado reflejan ese nuevo umbral.
4. **Configuración persiste al editar el texto** (US1): Con un tipo de límite y valor máximo configurados,
   escribir/pegar texto y verificar que la configuración del límite no cambia.
5. **Dentro del límite** (US2): Con el límite en Palabras/500, escribir menos de 500 palabras y verificar que
   el indicador muestra "Dentro del límite" con color seguro y el porcentaje correcto.
6. **Por encima del máximo** (US2): Reducir el valor máximo por debajo del conteo actual de palabras y
   verificar que el indicador cambia a "Por encima del máximo" con color de alerta.
7. **Valor igual al máximo** (US2, edge case): Ajustar el texto o el máximo para que el valor actual sea
   exactamente igual al máximo, y verificar que el estado se considera "Dentro del límite".
8. **Valor máximo inválido** (US1, edge case): Intentar ingresar un valor negativo o no numérico en el campo
   de valor máximo, y verificar que el último valor máximo válido se conserva.
9. **Actualización en tiempo real** (US2): Escribir/pegar texto y verificar que la barra y el mensaje de
   estado se actualizan en menos de 1 segundo.
10. **Layout responsivo** (Sidebar): Redimensionar la ventana del navegador y verificar que el panel de
    Control de Límites se muestra junto a MAIN CONTENT en pantallas anchas y apilado debajo en anchos móviles.

## Pruebas automatizadas

```bash
npm test -- --watch=false
```

Debe incluir (ver `tasks.md`) pruebas unitarias de `calculateLimitStatus` y `useLimitConfig`, y pruebas de
componente para `LimitTypeSelector`, `MaxLimitInput`, `LimitProgress`, `LimitsPanel` y `Sidebar`.

## Verificación de build

```bash
npm run build
```

Debe completar sin errores de compilación de TypeScript ni de build de CRA.

## Referencias

- Contrato de componentes: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Modelo de datos: [data-model.md](./data-model.md)
- Decisiones técnicas: [research.md](./research.md)
