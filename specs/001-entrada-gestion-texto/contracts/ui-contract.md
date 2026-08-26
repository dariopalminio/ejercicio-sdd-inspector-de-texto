# UI Contract: Región MAIN CONTENT (FR-01)

Esta especificación no expone API externa ni backend; el "contrato" relevante es la interfaz pública de los
componentes de UI que forman la región MAIN CONTENT, para que puedan integrarse en `App.tsx`/`InspectorPage`
y ser reutilizados/probados de forma independiente.

## `<MainContent />`

Compone `TextInputArea` y `ClearTextButton` dentro de un landmark `<main>`. No requiere props obligatorias en
esta especificación (gestiona su propio estado vía `useTextDocument`), dejando espacio para recibir props de
composición (por ejemplo, paneles laterales) en especificaciones futuras.

## `<TextInputArea />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `value` | `string` | Sí | Texto actual a mostrar en el `<textarea>` |
| `onChange` | `(next: string) => void` | Sí | Notifica cada cambio de contenido (escritura o pegado) |
| `label` | `string` | No (default: "Documento de entrada") | Texto accesible asociado al control (`aria-label` o `<label>`) |

**Comportamiento esperado**:
- Renderiza un `<textarea>` nativo editable, sin restricciones de `maxLength`.
- Refleja `value` sin transformación (controlado).
- Emite `onChange` en cada evento de entrada (tecleo o pegado), incluyendo pegados multilínea.

## `<ClearTextButton />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `onClear` | `() => void` | Sí | Acción a ejecutar al activar el botón |
| `disabled` | `boolean` | No (default: `false`) | Permite deshabilitar la acción si el área ya está vacía (opcional, no obligatorio por la spec) |

**Comportamiento esperado**:
- Renderiza un `<button type="button">` con etiqueta visible ("Vaciar") y accesible por teclado (Enter/Espacio
  activan `onClear` de forma nativa).
- Al activarse, invoca `onClear` de forma síncrona; no requiere confirmación (ver Assumptions de `spec.md`).

## Hook `useTextDocument()`

Ver [data-model.md](./../data-model.md#contrato-de-estado-hook) para la forma exacta (`content`, `setContent`,
`clear`).
