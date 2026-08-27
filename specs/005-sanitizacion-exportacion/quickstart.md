# Quickstart: Validar Sanitización y Exportación (REQ-05)

Guía manual para validar de punta a punta la acción "Sanitizar y Copiar" descrita en [spec.md](./spec.md), una
vez implementada.

## Prerrequisitos

- Node.js 18+ y npm instalados.
- Dependencias del proyecto instaladas: `npm install`.
- REQ-01 a REQ-04 ya implementados (área de texto, métricas, Control de Límites, Inspector de Seguridad).
- Navegador con soporte para la Clipboard API (Chrome/Edge/Firefox recientes) y permisos de portapapeles
  otorgados a `localhost`.

## Levantar la aplicación

```bash
npm start
```

Abrir `http://localhost:3000` en el navegador.

## Escenarios a validar

1. **Sanear texto con artefactos** (US1): Pegar texto con caracteres ocultos conocidos (zero-width space,
   BOM, control ASCII), activar "Sanitizar y Copiar", y verificar que el área de texto ya no contiene esos
   artefactos y que el Inspector de Seguridad (REQ-04) reporta "Texto seguro".
2. **Verificar el portapapeles** (US1): Tras la acción anterior, pegar el contenido del portapapeles en otro
   campo de texto (por ejemplo, la barra de direcciones) y confirmar que coincide con el texto saneado visible.
3. **Texto sin artefactos** (US1, edge case): Con texto sin caracteres ocultos, activar "Sanitizar y Copiar" y
   verificar que no hay errores y que el texto permanece igual.
4. **Texto vacío** (US1, edge case): Con el área de texto vacía, activar "Sanitizar y Copiar" y verificar que
   no hay errores.
5. **Confirmación de éxito** (US2): Verificar que aparece un mensaje de confirmación visible tras una copia
   exitosa, y que desaparece automáticamente después de unos segundos sin interacción adicional.
6. **Fallo de portapapeles** (US2, edge case): Simular un fallo de la Clipboard API (por ejemplo, denegando
   permisos en la configuración del navegador) y verificar que se muestra un mensaje de error en vez de la
   confirmación de éxito.
7. **Activaciones repetidas** (edge case): Activar "Sanitizar y Copiar" varias veces seguidas rápidamente y
   verificar que no se producen errores ni mensajes duplicados persistentes.

## Pruebas automatizadas

```bash
npm test -- --watch=false
```

Debe incluir (ver `tasks.md`) pruebas unitarias de `removeHiddenCharacters`, y pruebas de hook/componente para
`useSanitizeAndCopy`/`SanitizeAndCopyButton` cubriendo éxito y fallo de la copia (con `navigator.clipboard`
simulado).

## Verificación de build

```bash
npm run build
```

Debe completar sin errores de compilación de TypeScript ni de build de CRA.

## Referencias

- Contrato de componentes: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Modelo de datos: [data-model.md](./data-model.md)
- Decisiones técnicas: [research.md](./research.md)
