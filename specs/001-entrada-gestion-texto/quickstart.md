# Quickstart: Validar Entrada y Gestión de Texto (FR-01)

Guía manual para validar de punta a punta la región MAIN CONTENT descrita en [spec.md](./spec.md), una vez
implementada. No sustituye a las pruebas automatizadas (ver `tasks.md`), sino que sirve como checklist de
validación funcional y de accesibilidad.

## Prerrequisitos

- Node.js 18+ y npm instalados.
- Dependencias del proyecto instaladas: `npm install`.

## Levantar la aplicación

```bash
npm start
```

Abrir `http://localhost:3000` en el navegador.

## Escenarios a validar

1. **Ingresar texto escribiendo** (US1): Hacer clic en el área de texto principal y escribir varias líneas.
   Verificar que el contenido aparece de inmediato tal como se escribe.
2. **Pegar texto** (US1): Copiar un bloque de texto multilínea desde otra aplicación y pegarlo en el área de
   texto. Verificar que se inserta completo, respetando los saltos de línea.
3. **Pegado extenso**: Pegar un bloque de texto muy largo (varios miles de caracteres). Verificar que la UI
   sigue respondiendo sin bloquearse.
4. **Vaciar con mouse** (US2): Con contenido presente, hacer clic en el botón "Vaciar". Verificar que el área
   queda vacía de inmediato.
5. **Vaciar con teclado** (US2): Repetir el paso anterior navegando al botón con Tab y activándolo con
   Enter o Espacio.
6. **Vaciar en vacío** (US2, edge case): Con el área ya vacía, activar "Vaciar" de nuevo. Verificar que no
   ocurre ningún error visible en consola ni en la UI.
7. **Navegación solo con teclado** (US3): Navegar la página únicamente con Tab/Shift+Tab. Verificar que el
   área de texto y el botón "Vaciar" son alcanzables en un orden lógico.
8. **Lector de pantalla** (US3): Con un lector de pantalla activo (NVDA, VoiceOver, etc.), enfocar el área de
   texto y el botón "Vaciar". Verificar que ambos anuncian una etiqueta o propósito claro.
9. **Responsivo** (US3): Redimensionar la ventana del navegador (o usar las herramientas de desarrollo para
   simular anchos móviles, tablet y desktop amplio). Verificar que el bloque MAIN CONTENT no se solapa ni se
   recorta.

## Pruebas automatizadas

```bash
npm test -- --watch=false
```

Debe incluir (ver `tasks.md` para el desglose exacto) pruebas de Testing Library que cubran los escenarios de
aceptación de `spec.md` para `TextInputArea`, `ClearTextButton` y `useTextDocument`.

## Verificación de build

```bash
npm run build
```

Debe completar sin errores de compilación de TypeScript ni de build de CRA.

## Referencias

- Contrato de componentes: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Modelo de datos: [data-model.md](./data-model.md)
- Decisiones técnicas: [research.md](./research.md)
