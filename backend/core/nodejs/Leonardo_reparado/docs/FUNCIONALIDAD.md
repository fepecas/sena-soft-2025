# FUNCIONALIDAD

El proyecto "Leonardo está incompleto" tiene como objetivo principal proporcionar un sistema que permita consumir métricas de inscripción y responder a preguntas específicas sobre los aprendices. A continuación, se detallan las funcionalidades clave del sistema:

## 1. Consulta de Métricas

El sistema permite a los usuarios consultar métricas específicas relacionadas con las inscripciones. Esto se realiza a través de un endpoint que acepta un parámetro de consulta que indica la pregunta a responder. Las preguntas válidas son:

- **1**: Consulta sobre la cantidad total de inscripciones.
- **2**: Consulta sobre la cantidad de aprendices por programa.
- **3**: Consulta sobre la tasa de retención de aprendices.
- **4**: Consulta sobre el rendimiento académico promedio.
- **5**: Consulta sobre la distribución de aprendices por género.
- **6**: Consulta sobre la cantidad de aprendices por edad.

## 2. Respuestas Estructuradas

Las respuestas a las consultas son devueltas en un formato estructurado, permitiendo a los usuarios interpretar fácilmente los datos. Cada respuesta incluye:

- **Descripción**: Un resumen de la métrica consultada.
- **Valor**: El valor numérico o categórico correspondiente a la métrica.

## 3. Manejo de Errores

El sistema incluye un manejo de errores robusto. Si se realiza una consulta con un parámetro no válido, el sistema responderá con un código de estado 400 y un mensaje que indica que la pregunta no es válida.

## 4. Integración con MongoDB

El sistema está integrado con una base de datos MongoDB, lo que permite almacenar y recuperar métricas de manera eficiente. Esto asegura que los datos estén siempre actualizados y disponibles para las consultas.

## 5. Interfaz de API

El sistema expone una interfaz de API RESTful que permite a los desarrolladores interactuar con las métricas de manera programática. Esto facilita la integración con otras aplicaciones y sistemas.

## 6. Documentación

El proyecto incluye documentación detallada sobre cómo utilizar el sistema, incluyendo ejemplos de uso y descripciones de los endpoints disponibles. Esto asegura que los usuarios y desarrolladores puedan aprovechar al máximo las funcionalidades del sistema.

En resumen, "Leonardo está incompleto" es un sistema diseñado para facilitar el acceso a métricas de inscripción y proporcionar respuestas a preguntas específicas sobre los aprendices, todo ello de manera estructurada y eficiente.