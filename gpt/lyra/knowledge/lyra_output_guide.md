# Contexto completo para Lyra

## Esquemas JSON de referencia

### response_lyra.schema.json
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Esquema de salida para Lyra (voz del usuario)",
  "type": "object",
  "properties": {
    "general": {
      "type": "object",
      "properties": {
        "duracion_total": { "type": "string" },
        "numero_interacciones": { "type": "integer", "minimum": 0 },
        "persona_objetivo": { "type": "string" },
        "flujo": { "type": "string" },
        "tarea": { "type": "string" },
        "dispositivo": { "type": "string" }
      },
      "required": ["duracion_total", "numero_interacciones", "persona_objetivo", "flujo", "tarea"]
    },
    "hallazgos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "severidad": { "type": "string", "enum": ["P1", "P2", "P3"] },
          "hallazgo": { "type": "string" },
          "evidencia": { "type": "string" },
          "sugerencia": { "type": "string" },
          "esfuerzo": { "type": "string", "enum": ["bajo", "medio", "alto"] }
        },
        "required": ["id", "severidad", "hallazgo", "sugerencia", "esfuerzo"]
      }
    },
    "microcopy": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "contexto": { "type": "string" },
          "antes": { "type": "string" },
          "despues": { "type": "string" }
        },
        "required": ["contexto", "antes", "despues"]
      }
    },
    "accesibilidad": {
      "type": "object",
      "properties": {
        "contraste_ok": { "type": "boolean" },
        "foco_visible": { "type": "boolean" },
        "tap_target_ok": { "type": "boolean" },
        "labels_ok": { "type": "boolean" },
        "teclado_ok": { "type": "boolean" }
      }
    },
    "metricas_sugeridas": {
      "type": "object",
      "properties": {
        "tasa_finalizacion": { "type": "string" },
        "tiempo_por_paso": { "type": "string" },
        "errores_frecuentes": { "type": "array", "items": { "type": "string" } }
      }
    },
    "resumen_lyra": { "type": "string" }
  },
  "required": ["general", "hallazgos", "resumen_lyra"]
}
```

### response_lyra.json (plantilla vacía)
```json
{
  "general": {
    "duracion_total": "",
    "numero_interacciones": 0,
    "persona_objetivo": "",
    "flujo": "",
    "tarea": "",
    "dispositivo": ""
  },
  "hallazgos": [],
  "microcopy": [],
  "accesibilidad": {
    "contraste_ok": false,
    "foco_visible": false,
    "tap_target_ok": false,
    "labels_ok": false,
    "teclado_ok": false
  },
  "metricas_sugeridas": {
    "tasa_finalizacion": "",
    "tiempo_por_paso": "",
    "errores_frecuentes": []
  },
  "resumen_lyra": ""
}
```

## Ejemplos de salida completa

### Ejemplo 1: Flujo de inscripción
```json
{
  "general": {
    "duracion_total": "15 minutos",
    "numero_interacciones": 7,
    "persona_objetivo": "aprendiz primerizo",
    "flujo": "inscripcion",
    "tarea": "enviar formulario con textos MAGNUS/QUILIANO",
    "dispositivo": "movil"
  },
  "hallazgos": [
    {
      "id": "I1",
      "severidad": "P2",
      "hallazgo": "duda sobre dónde pegar cadena MAGNUS/QUILIANO",
      "evidencia": "pregunta repetida del usuario",
      "sugerencia": "añadir ejemplo y validar prefijo",
      "esfuerzo": "bajo"
    }
  ],
  "microcopy": [
    {
      "contexto": "campo texto final",
      "antes": "Texto",
      "despues": "Pega la cadena que inicia con MAGNUS| o QUILIANO|"
    }
  ],
  "accesibilidad": {
    "contraste_ok": false,
    "foco_visible": true,
    "tap_target_ok": true,
    "labels_ok": true,
    "teclado_ok": false
  },
  "metricas_sugeridas": {
    "tasa_finalizacion": ">= 90%",
    "tiempo_por_paso": "<= 30s",
    "errores_frecuentes": ["prefijo invalido", "campo obligatorio"]
  },
  "resumen_lyra": "Clarificar el campo de cadena codificada mejora finalización y reduce dudas."
}
```

### Ejemplo 2: Flujo de onboarding
```json
{
  "general": {
    "duracion_total": "8 minutos",
    "numero_interacciones": 5,
    "persona_objetivo": "usuario nuevo",
    "flujo": "onboarding",
    "tarea": "completar perfil básico",
    "dispositivo": "desktop"
  },
  "hallazgos": [
    {
      "id": "O1",
      "severidad": "P1",
      "hallazgo": "campo email sin validación visual",
      "evidencia": "usuario no sabe si el formato es correcto",
      "sugerencia": "añadir validación en tiempo real con iconos",
      "esfuerzo": "medio"
    }
  ],
  "microcopy": [
    {
      "contexto": "campo email",
      "antes": "Email",
      "despues": "Email (ejemplo: usuario@dominio.com)"
    }
  ],
  "accesibilidad": {
    "contraste_ok": true,
    "foco_visible": true,
    "tap_target_ok": true,
    "labels_ok": true,
    "teclado_ok": true
  },
  "metricas_sugeridas": {
    "tasa_finalizacion": ">= 95%",
    "tiempo_por_paso": "<= 20s",
    "errores_frecuentes": ["formato email invalido"]
  },
  "resumen_lyra": "El onboarding es claro pero necesita validación visual en email para reducir errores."
}
```

## Códigos de severidad y esfuerzo

### Severidad (P1/P2/P3)
- **P1 (crítico)**: Bloquea la tarea principal o genera error sin alternativa.
- **P2 (importante)**: Causa confusión o retrasa significativamente el flujo.
- **P3 (menor)**: Detalle cosmético o de claridad con impacto limitado.

### Esfuerzo (bajo/medio/alto)
- **Bajo**: Cambios de texto, ajustes de microcopy, validaciones simples.
- **Medio**: Modificaciones de UI, nuevos componentes, cambios de flujo.
- **Alto**: Rediseño completo, nueva funcionalidad, cambios arquitectónicos.

## Formato de salida final

### Estructura esperada
```
Comparte este texto con el equipo de SENASoft como evidencia de pruebas de usabilidad

LYRA|eyJHRU5FUkFMIjp7ImR1cmFjaW9uX3RvdGFsIjoiMTUgbWludXRvcyIsIm51bWVyb19pbnRlcmFjY2lvbmVzIjo3LCJwZXJzb25hX29iamV0aXZvIjoiYXByZW5kaXogcHJpbWVyaXpvIiwiZmx1am8iOiJpbnNjcmlwY2lvbiIsInRhcmVhIjoiZW52aWFyIGZvcm11bGFyaW8iLCJkaXNwb3NpdGl2byI6Im1vdmlsIn0sIkhBTExBWkdPUyI6W3siaWQiOiJJMSIsInNldmVyaWRhZCI6IlAyIiwiYWxsYXpnbyI6ImR1ZGEgc29icmUgZG9uZGUgcGVnYXIgY2FkZW5hIiwic3VnZXJlbmNpYSI6ImFcdTAwZjFhZGlyIGVqZW1wbG8iLCJlc2Z1ZXJ6byI6ImJham8ifV0sInJlc3VtZW5fbHlyYSI6IkNsYXJpZmljYXIgZWwgY2FtcG8gbWVqb3JhIGZpbmFsaXphY2lcdTAwZjNuIn0=
```

### Pasos de codificación
1. Construir JSON válido según el esquema
2. Convertir a UTF-8 sin escapes
3. Codificar en Base64 estándar
4. Anteponer prefijo `LYRA|`
5. Envolver en mensaje de instrucción

## Referencias adicionales
- Plantillas de prueba rápida: ver `README.md`
- Recursos y enlaces: ver `resources.md`
- Instrucciones principales: ver `instructions_lyra.md`
