# PlanBert: Metrics Integration Guide

This document complements the main **PlanBert Prompt** instructions by defining **how and when** to call and update the `planbert_metricas.schema.json` file, ensuring personalized user experiences.

## Purpose
The goal is to integrate metrics tracking for:
- **Penitencia** (learning penalties)
- **Estilos de aprendizaje** (learning styles)
- **Nivel de conocimiento** (knowledge levels)

By consistently updating and referencing these metrics, PlanBert can adapt challenges, explanations, and feedback for each user.

---

## When to Use Each Metric

### 1. Penitencia
**Trigger:**  
When the user **fails a challenge** or provides an incorrect answer.

**Action:**  
- Load the `penitencia` schema from `planbert_metricas.schema.json`.
- Record the penalty type (`tipo`), description, and date of application.
- Track whether the penalty was overcome (`superada`).

**Example call:**
```json
{
  "penitencia": {
    "idPenitencia": 5,
    "tipo": "Trivia",
    "descripcion": "Answer 3 quick questions related to the topic.",
    "fechaAplicacion": "2025-08-15T16:10:00Z",
    "superada": false
  }
}
```

---

### 2. Estilos de Aprendizaje
**Trigger:**  
When the user **starts** or **changes** their preferred learning style.

**Action:**  
- Load the `estilosAprendizaje` schema.
- Save the user's style (`nombre`), description, and suggested resources.

**Example call:**
```json
{
  "estilosAprendizaje": {
    "idEstilo": 2,
    "nombre": "Visual",
    "descripcion": "Learns better with images and diagrams.",
    "recursosRecomendados": [
      "Flowcharts",
      "Mind maps",
      "Video tutorials"
    ]
  }
}
```

---

### 3. Nivel de Conocimiento
**Trigger:**  
When the user **begins a new topic**, **completes a challenge**, or **is re-evaluated**.

**Action:**  
- Load the `nivelConocimiento` schema.
- Record the user's level (`nombre`), evaluation date, and score.

**Example call:**
```json
{
  "nivelConocimiento": {
    "idNivel": 1,
    "nombre": "Básico",
    "criterios": "Understands basic concepts but has limited application skills.",
    "fechaEvaluacion": "2025-08-15T16:20:00Z",
    "puntaje": 72.0
  }
}
```

---

## Integration Flow
1. **Identify Trigger:** Detect if the case requires recording a penitencia, learning style, or knowledge level.
2. **Load Schema:** Reference `planbert_metricas.schema.json` to ensure data integrity.
3. **Update Values:** Store user-specific data in the correct metric object.
4. **Save Progress:** Keep the updated metrics to personalize future interactions.

---

## Benefits of Using the Schema
- **Consistency:** Ensures all user data follows the same format.
- **Personalization:** Allows PlanBert to adapt explanations and challenges dynamically.
- **Trackable History:** Maintains a clear log of user progress and experiences.

---

**Reference:**  
[`planbert_metricas.schema.json`](planbert_metricas.schema.json)
