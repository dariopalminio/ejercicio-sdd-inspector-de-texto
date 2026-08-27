# Quickstart: Visualizador Overlay/Diff

## Prerequisites

- Node.js y npm instalados.
- Dependencias del repositorio instaladas con `npm install`.
- Ejecutar los comandos desde la raíz del repositorio.

## Automated validation

Run the focused unit and component tests after implementation:

```powershell
$env:CI = 'true'
npx react-scripts test --watchAll=false --runInBand src/utils/annotatedText.test.ts src/components/text-inspector/ProblemOverlay.test.tsx src/pages/InspectorPage.test.tsx
```

Run the complete suite and production build before completion:

```powershell
$env:CI = 'true'
npm test -- --watch=false
npm run build
```

## Manual scenarios

1. Open the application with `npm start`.
2. Enter `Texto` followed by a zero-width space and then `seguro`.
3. Activate `Mostrar problemas`.
4. Confirm that `[ZWS]` appears in the corresponding position, the source text remains editable and the security count remains unchanged.
5. Repeat with a BOM and one or more ASCII controls; confirm `[BOM]` and `[CTRL]` appear once per occurrence.
6. Toggle the control off and confirm the normal view returns without changing metrics or source content.
7. Remove all artifacts or clear the document; activate the control and confirm `Sin problemas` appears without badges.
8. Use a multiline document and a long document; confirm line breaks, wrapping and scrolling stay aligned between the overlay and editor.
9. Use keyboard focus to operate the control and confirm its visible label and semantic state communicate whether the overlay is shown.

## Expected outcomes

- The overlay is derived from the same local detection scope as REQ-04.
- No text-processing request is sent to a network service.
- The editor remains the only editable surface.
- Sanitization, metrics, limits and security reporting continue to use the original text value.

See [data-model.md](data-model.md) and [contracts/ui-contract.md](contracts/ui-contract.md) for the derived entities and observable UI contract.
