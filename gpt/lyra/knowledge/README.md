# Lyra Knowledge

Propósito: centralizar recursos internos para que Lyra ejecute pruebas rápidas, registre hallazgos y proponga mejoras coherentes con el producto.

## Contenido recomendado
- Perfiles de usuario y escenarios frecuentes
- Guía de estilo y términos aprobados (microcopy)
- Catálogo de componentes/UI del equipo
- Flujos clave del MVP y métricas actuales (si existen)

## Plantilla — Prueba rápida de usabilidad (5–10 min)
```markdown
Objetivo de la tarea:
Perfil/escenario del usuario:
Dispositivo/entorno:
Definición de éxito (1 criterio observable):

Pasos esperados (3–5):
1)
2)
3)

Preguntas guía:
- ¿Qué esperas que ocurra en este paso?
- ¿Hay algo confuso o que no entiendes?

Observaciones (fricciones, dudas, errores):
-

Resultados:
- Tasa de finalización:
- Tiempo total estimado:
- Errores más frecuentes:
```

## Matriz de severidad (priorización)
- P1 (crítico): bloquea la tarea principal o genera error sin alternativa.
- P2 (importante): causa confusión o retrasa significativamente el flujo.
- P3 (menor): detalle cosmético o de claridad con impacto limitado.

## Registro de hallazgos (formato sugerido)
```markdown
| ID | Flujo/Pantalla | Hallazgo | Evidencia | Severidad | Sugerencia | Esfuerzo | Estado |
|----|-----------------|----------|----------|-----------|------------|----------|--------|
| 01 | Onboarding      | Campo sin contexto | Usuario pregunta “¿qué es X?” | P2 | Añadir hint y ejemplo | Bajo | Abierto |
```

## Guía breve de microcopy
- Usa lenguaje directo, verbo de acción y contexto (“Subir cédula (PDF)”)
- Anticipa errores con validaciones y ejemplos (“Formato: nombre@dominio.com”)
- Evita jerga interna; prioriza términos que el usuario reconoce
- Mantén consistencia en tiempos, mayúsculas y tono

## Checklist de accesibilidad básica
- Contraste suficiente (texto y elementos interactivos)
- Tamaño de objetivo táctil adecuado (mín. ~44×44 px)
- Estados de foco/hover visibles
- Etiquetas y descripciones en inputs/iconos
- Navegación por teclado en flujos críticos
- Mensajes de error claros y orientados a la acción

---

## Ejemplos aplicados al MVP de SENASoft (Synthetic Edition)

### 1) Flujo: Inscripción al reto (formulario externo)
```markdown
Objetivo: Completar la inscripción sin dudas ni errores.
Escenario: Aprendiz primerizo, conexión móvil, 10 minutos disponibles.
Definición de éxito: Envía el formulario a la primera.

Pasos esperados:
1) Abrir enlace de inscripción.
2) Leer requisitos y adjuntar textos de Quiliano/Magnus.
3) Completar datos personales.
4) Enviar y ver confirmación.

Hallazgos (ejemplo):
| ID | Hallazgo | Evidencia | Sev | Sugerencia | Esfuerzo |
|----|----------|----------|-----|------------|----------|
| I1 | Duda: ¿Dónde pego el texto de Quiliano/Magnus? | Usuario pregunta 2 veces | P2 | Añadir subtítulo “Pega aquí el texto final codificado (QUILIANO| / MAGNUS|)” y ejemplo | Bajo |
| I2 | Confirmación poco visible | Usuario no nota el éxito | P3 | Banner verde con icono y CTA a comunidad WhatsApp | Bajo |
```

Microcopy sugerido:
- “Texto final de Quiliano o Magnus (pega la cadena que inicia con QUILIANO| o MAGNUS|). Ejemplo: MAGNUS|eyJh…”.
- “Al enviar verás una confirmación y un enlace a la comunidad de WhatsApp.”

Quick wins:
- Añadir ejemplo de cadena codificada y validación simple de prefijo.
- Incluir enlace corto verificado a WhatsApp en confirmación.

### 2) Flujo: Ideación con Quiliano (generar texto final)
```markdown
Objetivo: Obtener salida codificada lista para el formulario.
Escenario: Aprendiz con idea difusa; 15 minutos.
Definición de éxito: Logra el JSON interno completo y salida con prefijo QUILIANO|.

Hallazgos (ejemplo):
| ID | Hallazgo | Evidencia | Sev | Sugerencia | Esfuerzo |
|----|----------|----------|-----|------------|----------|
| Q1 | No entiende cuándo generar salida final | Pregunta “¿ya puedo generar?” | P2 | Menú permanente: “3️⃣ Generar texto final para inscripción” visible tras cubrir campos | Bajo |
| Q2 | Duda con líneas CONPES | Confunde referencias | P3 | Breve ayuda: “Alinea con un eje del CONPES (ética, gobernanza, datos, talento, riesgos, uso)” | Bajo |
```

Microcopy sugerido:
- “Cuando tengas claros comunidad, alcance y MVP, pide: ‘Generar texto final’.”

### 3) Flujo: Perfil con Magnus (preguntas y salida codificada)
```markdown
Objetivo: Construir perfil por competencias y generar salida MAGNUS|.
Escenario: Aprendiz con experiencia irregular; 20–30 minutos.
Definición de éxito: Cubre las 11 competencias con evidencias suficientes.

Hallazgos (ejemplo):
| ID | Hallazgo | Evidencia | Sev | Sugerencia | Esfuerzo |
|----|----------|----------|-----|------------|----------|
| M1 | Olvida mostrar menú | Usuario se pierde | P2 | Recordatorio automático del menú después de cada respuesta | Bajo |
| M2 | Pide ejemplos | Riega la evaluación | P3 | Copy preventivo: “No dar ejemplos que faciliten la respuesta” | Bajo |
```

Microcopy sugerido:
- “¿Quieres: 1️⃣ Ver resumen 2️⃣ Seguir preguntas 3️⃣ Generar texto final?”

### 4) Flujo: Dudas con Leonardo (lineamientos y cronograma)
```markdown
Objetivo: Responder fielmente a lineamientos y aclarar dudas frecuentes.
Escenario: Aprendiz pregunta por fechas/criterios; 5 minutos.
Definición de éxito: Respuesta precisa y enlace a documentos oficiales.

Hallazgos (ejemplo):
| ID | Hallazgo | Evidencia | Sev | Sugerencia | Esfuerzo |
|----|----------|----------|-----|------------|----------|
| L1 | Pide interpretación libre | Riesgo de desvío | P1 | Recordatorio: “Usa solo el PDF de lineamientos; no inventes reglas.” | Bajo |
| L2 | Enlaces largos | Dificultan copia | P3 | Usar tinyurl oficiales listados en instrucciones | Bajo |
```

Microcopy sugerido:
- “Según ‘SENASoft 2025, Synthetic Edition (Lineamientos).pdf’… Más detalles: `https://www.tinyurl.com/senasoft2025-lineamientos`.”




