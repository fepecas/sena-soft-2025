# crono Knowledge

**Propósito**: Centralizar el conocimiento y recursos para que **crono** ejecute **priorización de tareas** y **estimación de tiempos** de forma consistente, trazable y optimizada según el contexto del usuario o equipo.

## Contenido recomendado

* Principios y objetivos de priorización y estimación (orientación a decisión, trazabilidad, no alucinación).
* Esquemas de entrada (JSON por tarea, lote, lenguaje natural).
* Reglas de normalización y validación de datos.
* Funciones de cálculo (WSJF modificado, ponderación lineal, severidad × alcance, dependencias).
* Reglas de desempate y modos de ajuste (Incendios, Roadmap, Throughput).
* Modelos de estimación de tiempo (por historia, por referencia histórica, por técnica PERT).
* Formatos de salida (resumen ejecutivo, explicación detallada, JSON).
* Ejemplos aplicados y métricas para evaluación.

---

## Plantilla — Solicitud de priorización y estimación rápida

```markdown


**Objetivo del análisis:**
Definir una priorización objetiva y accionable de las tareas del sprint/proyecto, optimizando recursos y maximizando el valor entregado al negocio, reduciendo riesgos de cuellos de botella y entregas fuera de plazo. - Ejemplo

**Contexto (equipo, proyecto, sprint):**
Equipo de desarrollo backend y frontend trabajando en el Proyecto *Orion* (sprint actual: #24, duración: 2 semanas, enfoque en release preproducción). - Ejemplo

**Número de tareas a evaluar:**
7 tareas en backlog activo. - Ejemplo

**Modo de priorización:**
**Roadmap** — alineado con objetivos de release, priorizando impacto en funcionalidades críticas y dependencias. - Ejemplo

**Definición de éxito (criterio observable):**
Todas las tareas críticas del release completadas antes del *freeze* de preproducción (día 9 del sprint) con un mínimo de 90% de cumplimiento en estimaciones de tiempo. - Ejemplo

---

**Formato de entrada (JSON/lenguaje natural):**
Ejemplo JSON:

```json
[
  {
    "id": "T-145",
    "titulo": "Implementar endpoint de facturación",
    "dependencias": ["T-122"],
    "deadline": "2025-08-19",
    "estimacion": "2 días",
    "impacto": "alto"
  },
  {
    "id": "T-146",
    "titulo": "Optimizar query de inventario",
    "dependencias": [],
    "deadline": null,
    "estimacion": "1 día",
    "impacto": "medio"
  }
]

Ejemplo en lenguaje natural:

1. Implementar endpoint de facturación (depende de T-122, deadline 19/08, alto impacto, estimado 2 días)
2. Optimizar query de inventario (sin dependencias, impacto medio, estimado 1 día)
3. Crear script de migración de clientes legacy (sin deadline, impacto alto, estimado 3 días)
```



---

**Preguntas guía:**

* ¿Hay *deadlines* próximos que condicionen la priorización?
* ¿Existen dependencias entre tareas?
* ¿Faltan datos clave para calcular el *score*?
* ¿Se cuenta con datos históricos de duraciones para estimar tiempos?

---

**Observaciones (riesgos, datos faltantes, notas del equipo):**

* Falta definición de criterios de aceptación para T-148.
* El equipo de QA está al 60% de capacidad esta semana.
* Dependencia externa con API de terceros para T-145 (riesgo de retraso).

---

**Resultados esperados:**

* **Lista ordenada por prioridad** con *score*, ETA y justificación breve.
* **Estimación de duración por tarea** (en horas, días o sprints según contexto).
* **Sugerencia de siguientes pasos** para hoy y esta semana.

**Ejemplo de salida:**

```json
[
  {
    "id": "T-145",
    "prioridad": 1,
    "score": 95,
    "ETA": "2 días",
    "justificacion": "Alta criticidad para release, deadline cercano, dependencia resuelta."
  },
  {
    "id": "T-148",
    "prioridad": 2,
    "score": 85,
    "ETA": "1.5 días",
    "justificacion": "Impacto alto, sin dependencia crítica, pero falta detalle de criterios de aceptación."
  }
]
``

```

---

## Matriz de severidad de impacto (para bugs/incidencias)

* **S1 (Crítico)**: bloquea función clave o afecta a la mayoría de usuarios.
* **S2 (Importante)**: degrada la experiencia o retrasa entregables.
* **S3 (Menor)**: impacto limitado, mejora cosmética o técnica.

---

## Registro de resultados sugerido

```markdown
| ID   | Título                 | Score | Orden | ETA estimada | Justificación breve                 | Bloquea |
|------|------------------------|-------|-------|--------------|--------------------------------------|---------|
| T-01 | Corregir bug de login  | 8.6   | 1     | 0.5 días     | Alto impacto, urgencia alta, esfuerzo bajo | T-05    |
```

---

## Guía breve de microcopy para comunicación de resultados

* Usar frases directas y accionables (“Atender hoy”, “En el próximo sprint”).
* Mostrar siempre el **porqué** de la prioridad y el **cómo** de la estimación.
* Evitar tecnicismos innecesarios en la explicación al usuario final.
* Mantener consistencia en formato: `# — score — ETA — razón`.

---

## Checklist de validación de datos antes de calcular

* Impacto presente y en rango 1–10.
* Urgencia presente y en rango 1–5.
* Esfuerzo presente y ≥ 1.
* Dependencias validadas contra el lote de tareas.
* Deadlines convertidos a formato estándar `YYYY-MM-DD`.
* Datos para estimación presentes: esfuerzo, velocidad del equipo, referencias históricas.

---

## Ejemplo aplicado al contexto de un sprint

### Entrada (modo natural)

> "Tengo: (1) bug login caído (afecta 30% usuarios), (2) nueva métrica en dashboard, (3) refactor auth; estimaciones: 3, 5 y 8 puntos; deadline del dashboard en 10 días. Velocidad de equipo: 10 puntos/sprint."

### Salida (resumen ejecutivo con ETA)

```markdown
1. T-1 Bug login — score 8.6 — ETA: 0.5 días — Hoy
   Razón: Alto impacto (30% usuarios), urgencia alta, esfuerzo 3 ⇒ valor/tiempo superior.
2. T-2 Dashboard métrica — score 6.9 — ETA: 2.5 días — Esta semana
   Razón: Deadline 10 días, valor medio, esfuerzo 5.
3. T-3 Refactor auth — score 4.1 — ETA: 4 días — Próximo sprint
   Razón: Mejora técnica sin urgencia; esfuerzo 8.
```
---
## Integración con el flujo de trabajo
* En caso de conflicto, prevalece la guía en `instructions_crono.md`.
* Mantener ejemplos actualizados y métricas de aceptación del modelo.

---

### **Glosario de términos**

**Backlog**
Lista priorizada de tareas pendientes o funcionalidades por desarrollar, que sirve como fuente principal para seleccionar trabajo en sprints o ciclos.

**Bloquea**
Indica que una tarea es dependiente para iniciar o completar otra; si no se resuelve, detiene el progreso de una o más tareas.

**Contexto (equipo, proyecto, sprint)**
Información de referencia sobre quién trabajará (equipo), en qué iniciativa (proyecto) y en qué ciclo de trabajo (sprint) se encuentran.

**Deadlines**
Fechas límite para entregar o completar una tarea, condicionando su urgencia y prioridad.

**Dependencias**
Relaciones entre tareas donde una no puede iniciarse o completarse hasta que otra haya finalizado.

**Definición de éxito (criterio observable)**
Condiciones medibles y objetivas que determinan si el análisis o la ejecución alcanzó el resultado esperado.

**ETA (Estimated Time of Arrival)**
Tiempo estimado de finalización de una tarea, expresado en horas, días o sprints.

**Esquema de entrada**
Formato estandarizado en que se entregan los datos a crono para su procesamiento (ej. JSON por tarea, lote, texto natural).

**Esfuerzo**
Medida de la cantidad de trabajo necesaria para completar una tarea (horas, puntos de historia, días).

**Formato de salida**
Estructura en la que se entregan los resultados al usuario (ej. JSON, resumen ejecutivo, explicación detallada).

**Impacto**
Nivel de efecto que la tarea tendrá en el producto, negocio o usuarios; puede ser alto, medio o bajo.

**Incendios (modo de ajuste)**
Prioridad inmediata para incidentes o tareas críticas que requieren atención urgente, normalmente interrumpiendo la planificación.

**Microcopy**
Texto breve, claro y accionable incluido en la comunicación de resultados para que el usuario entienda rápido la prioridad y la acción requerida.

**Modo de priorización**
Método elegido para ordenar tareas (ej. *default*, *incendios*, *roadmap*, *throughput*).

**PERT (Program Evaluation and Review Technique)**
Técnica de estimación que combina tres valores (optimista, probable y pesimista) para calcular tiempos de ejecución más realistas.

**Prioridad**
Posición relativa de una tarea en la lista ordenada, basada en criterios de impacto, urgencia, esfuerzo y dependencias.

**Roadmap**
Plan de alto nivel que describe la evolución y entregas de un producto a lo largo del tiempo.

**Score**
Puntuación calculada para ordenar tareas según un modelo de priorización; integra factores como impacto, urgencia, esfuerzo y riesgo.

**Severidad**
Medida de la gravedad de un problema o incidencia (ej. S1 crítico, S2 importante, S3 menor).

**Sprint**
Ciclo de trabajo de duración fija (normalmente 1–4 semanas) en metodologías ágiles donde se ejecuta un conjunto definido de tareas.

**Throughput**
Velocidad o cantidad de trabajo completado en un periodo dado; usado como referencia para priorización y planificación.

**Trazabilidad**
Capacidad de rastrear el origen, decisiones y cambios asociados a una tarea o resultado.

**Urgencia**
Factor que mide qué tan pronto debe completarse una tarea, independientemente de su impacto.

**WSJF (Weighted Shortest Job First) modificado**
Método de priorización que calcula el valor relativo de las tareas dividiendo su beneficio (impacto, urgencia) entre el esfuerzo requerido, adaptado con ajustes propios para el contexto del equipo.

---
