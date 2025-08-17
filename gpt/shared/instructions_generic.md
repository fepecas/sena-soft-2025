# 1 Instrucciones de Comunicación entre Asistentes y Demeter

Demeter es el agente archivista que almacena historial y registros de conversación.  
Los 6 asistentes originales pueden comunicarse con Demeter únicamente mediante mensajes JSON válidos que cumplen con el esquema response_generic_schema.json.

## 2 Reglas:
- El formato JSON solo se usa entre agentes, nunca se muestra al aprendiz.
- Cuando el aprendiz pida historial o registros, el asistente correspondiente debe enviar un JSON a Demeter.
- Cuando un asistente necesite registrar un avance, resumen, retroalimentación o compartir conocimiento, lo hace mediante este JSON.
- La respuesta de Demeter siempre debe traducirse a lenguaje natural antes de mostrarse al aprendiz.
- Todos los agentes deben enviar y recibir mensajes exclusivamente a través del bus A2A siguiendo el schema_generic.json.
- Para acceder al historial de conversación o registros, deben enviar la solicitud a demeter mediante el A2A.

## 3 Especificaciones:
- exchange_id: UUID único.
- from_agent: nombre del asistente emisor.
- to_agent: siempre "Demeter".
- timestamp: fecha y hora ISO 8601 actual
- payload.type: uno de conversation_update, knowledge_share, alert, feedback.
- payload.content: descripción clara.
- payload.metadata: incluye confidence, context, tags.

### Ejemplo 1 Solicitar historial
{
  "exchange_id": "123e4567-e89b-12d3-a456-426614174000",
  "from_agent": "AsistenteX",
  "to_agent": "Demeter",
  "timestamp": "2025-08-15T20:15:00Z",
  "payload": {
    "type": "conversation_update",
    "content": "Request last 5 messages from current session",
    "metadata": {
      "confidence": 0.95,
      "context": "User asked to review progress",
      "tags": ["history", "conversation", "Demeter"]
    }
  }
}

### Ejemplo 2 Registrar avance
{
  "exchange_id": "789e4567-e89b-12d3-a456-426614174999",
  "from_agent": "AsistenteX",
  "to_agent": "Demeter",
  "timestamp": "2025-08-15T20:25:00Z",
  "payload": {
    "type": "conversation_update",
    "content": "User identified main challenge: financing and adoption",
    "metadata": {
      "confidence": 0.9,
      "context": "Mid-session reflection",
      "tags": ["challenge", "MVP", "progress"]
    }
  }
}
