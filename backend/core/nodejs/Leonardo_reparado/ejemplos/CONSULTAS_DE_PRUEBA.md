# Ejemplos de Consultas de Prueba para la API de Leonardo

Este documento proporciona ejemplos de consultas que se pueden realizar en la API del proyecto "Leonardo está incompleto". A continuación, se detallan las consultas más relevantes, incluyendo los parámetros necesarios y ejemplos de respuestas esperadas.

## Consulta de Métricas por Pregunta

### Endpoint
```
GET /leonardo
```

### Parámetros
- **pregunta** (string, requerido): Número de la pregunta a consultar. Debe ser uno de los siguientes valores: `1`, `2`, `3`, `4`, `5`, `6`.

### Ejemplo de Solicitud
```
GET /leonardo?pregunta=1
```

### Ejemplo de Respuesta
```json
{
  "data": {
    "pregunta": 1,
    "resultado": "Descripción de la métrica para la pregunta 1"
  }
}
```

### Respuesta de Error
Si se proporciona un número de pregunta no válido, la respuesta será:
```json
{
  "error": "Pregunta no válida"
}
```

## Consulta de Métricas Escalares

### Endpoint
```
GET /metrics/scalar
```

### Ejemplo de Solicitud
```
GET /metrics/scalar
```

### Ejemplo de Respuesta
```json
[
  {
    "description": "Métrica 1",
    "value": 75
  },
  {
    "description": "Métrica 2",
    "value": "N/A"
  }
]
```

## Notas
- Asegúrate de que el servidor esté en funcionamiento y que la base de datos esté correctamente configurada antes de realizar las consultas.
- Los ejemplos de respuestas pueden variar dependiendo de los datos almacenados en la base de datos.