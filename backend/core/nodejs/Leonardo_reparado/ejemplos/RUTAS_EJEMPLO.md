# Ejemplos de Rutas para Interactuar con la API de Leonardo

Este documento proporciona ejemplos de rutas que se pueden utilizar para interactuar con la API del proyecto "Leonardo está incompleto". A continuación, se detallan algunas de las rutas más relevantes y cómo se pueden utilizar.

## Rutas Disponibles

### 1. Obtener Métricas de SENAsoft

**Ruta:** `/leonardo`

**Método:** `GET`

**Descripción:** Esta ruta permite consultar métricas de SENAsoft según un número de pregunta específico (1-6).

**Ejemplo de Solicitud:**

```
GET https://leonardo-reparado.onrender.com/leonardo?pregunta=1
```

**Ejemplo de Respuesta:**

```json
{
  "data": {
    "description": "Métrica para la pregunta 1",
    "value": 75
  }
}
```

### 2. Obtener Métricas Escalares

**Ruta:** `/metrics/scalar`

**Método:** `GET`

**Descripción:** Esta ruta permite obtener métricas escalares de SENASoft.

**Ejemplo de Solicitud:**

```
GET https://leonardo-reparado.onrender.com/metrics/scalar
```

**Ejemplo de Respuesta:**

```json
[
  {
    "description": "Métrica escalar 1",
    "value": 100
  },
  {
    "description": "Métrica escalar 2",
    "value": 200
  }
]
```

## Notas

- Asegúrate de que el servidor esté en funcionamiento antes de realizar las solicitudes.
- Los parámetros de consulta son sensibles a mayúsculas y minúsculas, así que asegúrate de utilizarlos correctamente.
- Para más detalles sobre las respuestas y los posibles errores, consulta la documentación de la API en `docs/API.md`.