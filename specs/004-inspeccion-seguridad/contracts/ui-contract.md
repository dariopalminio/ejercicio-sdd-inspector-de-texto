# UI Contract: Panel de Inspección de Seguridad (REQ-04)

Sin API externa ni backend; el "contrato" relevante es la interfaz pública de la nueva función/hook/componente.

## Utilidad pura `detectHiddenCharacters`

```ts
function detectHiddenCharacters(content: string): {
  count: number;
  status: 'safe' | 'alert';
};
```

Sin efectos secundarios; determinista para el mismo `content` (ver reglas en
[data-model.md](./../data-model.md)).

## Hook `useSecurityReport(content: string)`

Devuelve `{ count: number; status: 'safe' | 'alert' }`, recalculado con debounce ~150ms cada vez que `content`
cambia (mismo mecanismo que `useTextMetrics` de REQ-02).

## `<SecurityPanel />`

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `content` | `string` | Sí | Documento de entrada actual (de `useTextDocument()`, REQ-01) sobre el que se detectan los artefactos |

Renderiza internamente `useSecurityReport(content)` y muestra:

- Un mensaje de estado explícito ("Texto seguro" cuando `status === 'safe'`, o un mensaje de alerta que
  incluya el `count` exacto cuando `status === 'alert'`), nunca dependiendo únicamente del color (FR-031).
- El panel se ubica dentro del mismo `<Sidebar>` ya usado por `LimitsPanel` (REQ-03), como un segundo panel
  independiente ("Inspector de Seguridad").
