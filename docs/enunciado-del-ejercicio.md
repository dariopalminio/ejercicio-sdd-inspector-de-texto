# Ejercicio Práctico: Construyendo "Inspector de Texto" con Spec-Kit

## Introducción

En este ejercicio práctico aprenderás a utilizar el "SDD Harness (Orchestrator)" de GitHub llamado **GitHub Spec Kit**, un toolkit open source para Spec-Driven Development (SDD), para construir una aplicación web real desde cero basándote en el documento de especificación base `project-requirements.md`.

El objetivo es que experimentes el flujo completo de SDD:
1. **Definir** una especificación clara de lo que quieres construir.
2. **Planificar** la implementación técnica.
3. **Desglosar** el trabajo en tareas accionables.
4. **Implementar** utilizando asistencia de IA.

Trabajarás con la especificación del proyecto **"Inspector de Texto"**, una aplicación SPA para análisis de texto en tiempo real con detección de caracteres ocultos.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **uv** (recomendado para instalar Specify CLI)
- Un editor de código (recomendamos **VS Code**)
- Un agente de IA compatible (GitHub Copilot, etc.)
- git

---

## Plan del Ejercicio Paso a Paso

1. Lee el documento de especificación base `project-requirements.md`
2. Iniciación del proyecto
3. Instalar Specify CLI
4. Iniciar y Configurar el Proyecto
5. Configurar la "Constitución" del Proyecto
6. Creación de Especificaciones de forma iterativa

## Resumen del Flujo de Trabajo SDD con Spec Kit

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE TRABAJO SDD                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. specify init          →  Estructura del proyecto           │
│  2. /speckit.constitution →  Principios rectores (constitución)│
│  3. /speckit.specify      →  Especificación (spec.md)          │
│  4. /speckit.clarify (opt)→  Resolver ambigüedades            │
│  5. /speckit.plan         →  Plan técnico (plan.md)           │
│  6. /speckit.checklist(opt)→ Checklist de calidad             │
│  7. /speckit.tasks        →  Desglose en tareas (tasks.md)    │
│  8. /speckit.analyze (opt)→  Informe de consistencia          │
│  9. /speckit.implement    →  Implementación (código)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

