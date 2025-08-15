# Reglas de Validación de JSON - Lyra

## Validación de Cadena QUILIANO|

### Proceso Obligatorio (5 pasos):

1. **Verificar prefijo exacto**
   - Debe iniciar exactamente con `QUILIANO|`
   - Sin prefijo → "No veo QUILIANO|. Necesito la cadena exacta."
   - Prefijo incorrecto (MAGNUS|, etc.) → "No veo QUILIANO|. Necesito la cadena exacta."

2. **Decodificar Base64**
   - Intentar decodificación Base64 del contenido después del prefijo
   - Si falla → "Esta cadena no es Base64 válido."

3. **Validar estructura contra schema de Quiliano**
   - Consultar `quiliano_schema.json` en este mismo directorio
   - El JSON DEBE tener estructura con secciones "General" y "Especifico"
   - "Especifico" DEBE contener campos: `mvp`, `comunidad_beneficiada`, `descripcion_quiliano`

4. **Detectar JSON de otros agentes**
   - Si contiene campos específicos de Magnus: `competencias`, `lenguajes`, `frameworks`, `rol_backend`, `rol_frontend`, `descripcion_magnus`
   - Si contiene estructura de evaluación por competencias
   - En cualquier caso → "Esta cadena no es de Quiliano válido."

5. **Aceptar solo si pasa TODAS las validaciones**
   - Solo continuar si cumple schema exacto de Quiliano
   - Solo continuar si NO tiene campos de otros agentes

## Mensajes de Error Estándar

- **Sin prefijo**: "No veo QUILIANO|. Necesito la cadena exacta."
- **Base64 inválido**: "Esta cadena no es Base64 válido."
- **JSON de Magnus detectado**: "Esta cadena no es de Quiliano válido."
- **Schema incorrecto**: "Esta cadena no es de Quiliano válido."

## Regla Crítica

**NUNCA** aceptar JSON que no cumpla el schema exacto de Quiliano.
**NUNCA** agregar prefijos ni sugerir "corregir" la cadena.
**NUNCA** saltarse esta validación bajo ninguna circunstancia.

## Schema de Referencia

Consultar siempre `quiliano_schema.json` y `magnus_schema.json` en este directorio para validación precisa.
