# Quickstart: Validar Inspección de Seguridad (Caracteres Ocultos) (REQ-04)

Guía manual para validar de punta a punta el panel "Inspector de Seguridad" descrito en [spec.md](./spec.md),
una vez implementado.

## Prerrequisitos

- Node.js 18+ y npm instalados.
- Dependencias del proyecto instaladas: `npm install`.
- REQ-01, REQ-02 y REQ-03 ya implementados (área de texto, métricas, Topbar/Footer, Sidebar con Control de
  Límites).

## Levantar la aplicación

```bash
npm start
```

Abrir `http://localhost:3000` en el navegador.

## Escenarios a validar

1. **Texto vacío / seguro** (US1/US2): Con el área de texto vacía, verificar que el panel "Inspector de
   Seguridad" muestra 0 caracteres ocultos y un estado "Texto seguro".
2. **Zero-width space**: Pegar texto que incluya uno o más `\u200B` y verificar que el conteo coincide
   exactamente con la cantidad insertada, y el estado cambia a alerta.
3. **BOM**: Pegar texto que incluya un carácter `\uFEFF` y verificar que se cuenta correctamente.
4. **Control ASCII**: Pegar texto que incluya caracteres de control como `\u0000` o `\u001F` y verificar que
   se cuentan correctamente.
5. **Caracteres de formato excluidos**: Escribir texto multilínea normal (con `\n`, y usando `Tab` si aplica)
   y verificar que NO se cuentan como artefactos.
6. **Actualización en tiempo real**: Modificar el texto (agregar/quitar caracteres ocultos) y verificar que
   el conteo y el estado se actualizan en menos de 1 segundo.
7. **Vaciar reinicia el reporte**: Con artefactos detectados, usar la acción "Vaciar" (REQ-01) y verificar que
   el conteo vuelve a 0 y el estado vuelve a "Texto seguro".
8. **Ambos paneles del Sidebar conviven**: Verificar que el panel de Control de Límites (REQ-03) y el panel de
   Inspector de Seguridad se muestran juntos dentro del mismo Sidebar, sin interferir entre sí.

## Pruebas automatizadas

```bash
npm test -- --watch=false
```

Debe incluir (ver `tasks.md`) pruebas unitarias de `detectHiddenCharacters` y `useSecurityReport`, y pruebas
de componente para `SecurityPanel` que cubran los escenarios de aceptación de `spec.md`.

## Verificación de build

```bash
npm run build
```

Debe completar sin errores de compilación de TypeScript ni de build de CRA.

## Referencias

- Contrato de componentes: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Modelo de datos: [data-model.md](./data-model.md)
- Decisiones técnicas: [research.md](./research.md)
