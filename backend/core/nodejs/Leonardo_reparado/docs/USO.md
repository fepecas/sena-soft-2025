# Uso del Sistema Leonardo

El sistema "Leonardo está incompleto" permite a los usuarios interactuar con una API que proporciona métricas relacionadas con inscripciones y otros datos relevantes. A continuación, se describen los pasos para utilizar el sistema y ejemplos de cómo realizar consultas a la API.

## Requisitos Previos

Antes de utilizar el sistema, asegúrate de que el servidor esté en funcionamiento. Puedes iniciar el servidor ejecutando el siguiente comando en la terminal:

```
npm run dev
```

Esto iniciará el servidor en modo de desarrollo y estará disponible en `http://localhost:8080`.

## Interacción con la API

El sistema expone varios endpoints que permiten a los usuarios consultar métricas específicas. A continuación se presentan ejemplos de cómo interactuar con la API.

### Consultar Métricas de SENAsoft

Para consultar métricas específicas, puedes utilizar el endpoint `/leonardo`. Este endpoint requiere un parámetro de consulta llamado `pregunta`, que debe ser un número entre 1 y 6.

#### Ejemplo de Solicitud

```http
GET http://localhost:8080/leonardo?pregunta=1
```

#### Respuesta Esperada

```json
{
  "description": "Descripción de la métrica solicitada",
  "value": "Valor de la métrica"
}
```

### Obtener Métricas Escalares

Además, puedes obtener métricas escalares utilizando el endpoint `/metricas/scalar`.

#### Ejemplo de Solicitud

```http
GET http://localhost:8080/metricas/scalar
```

#### Respuesta Esperada

```json
[
  {
    "description": "Descripción de la métrica",
    "value": 123
  },
  {
    "description": "Otra métrica",
    "value": "456"
  }
]
```

## Conclusión

El sistema "Leonardo está incompleto" proporciona una forma sencilla de acceder a métricas relevantes a través de su API. Asegúrate de seguir los ejemplos proporcionados para realizar consultas efectivas y obtener la información que necesitas.