# Phase 1 Data Model: Entrada y Gestión de Texto (FR-01)

## Entidad: Documento de entrada (texto de trabajo)

Representa el contenido de texto libre que el usuario ingresa o pega en el área principal. Vive únicamente en
memoria del navegador durante la sesión (sin persistencia).

| Campo | Tipo | Descripción | Reglas de validación |
|-------|------|-------------|-----------------------|
| `content` | `string` | Texto completo actual del área de trabajo | Ninguna restricción de formato o longitud (FR-001); puede ser cadena vacía |

### Estados / transiciones

No es una máquina de estados formal; el documento solo tiene dos condiciones observables relevantes para
esta especificación:

1. **Vacío** (`content === ''`) — estado inicial y estado tras ejecutar la acción de vaciar.
2. **Con contenido** (`content.length > 0`) — tras escritura o pegado de texto.

La transición de "Con contenido" → "Vacío" ocurre exclusivamente mediante la acción explícita "Vaciar"
(FR-003/FR-004). La transición de "Vacío" → "Con contenido" ocurre mediante escritura o pegado (FR-001/FR-002).
No existen otros estados (por ejemplo, "cargando" o "error") dentro del alcance de FR-01.

### Relaciones

`Documento de entrada` es la única entidad de esta especificación. Especificaciones futuras (FR-02 métricas,
FR-05 exclusión de espacios, FR-07 inspección de seguridad, FR-08 sanitización) leerán este mismo `content`
como entrada, sin modificar su forma de almacenamiento definida aquí.

## Contrato de estado (hook)

`useTextDocument()` expone:

- `content: string` — el texto actual.
- `setContent(next: string): void` — actualiza el texto (usado por el `onChange` del textarea).
- `clear(): void` — restablece `content` a `''` (usado por la acción "Vaciar").

Este contrato es intencionalmente mínimo para esta especificación; se ampliará (sin romper la forma actual)
cuando se implementen requisitos posteriores.
