<!-- Plantilla alineada con instructions_orion.md y el schema.
     Usa títulos EXACTOS y completa todos los campos marcados con TODO. -->

# Resumen ejecutivo
[≤120 palabras: situación, riesgo principal, ganancia esperada] <!-- TODO -->

## Contexto
- Proyecto: <!-- TODO -->
- Objetivo: <!-- TODO -->
- Stack: <!-- TODO -->
- Estado actual: <!-- TODO -->
- Restricciones: <!-- TODO -->
- Síntomas/Indicadores: <!-- TODO -->
- Supuestos (si aplica): <!-- TODO -->

## Proceso
- Pipeline aplicado: O·R·I·O·N
- Notas relevantes: [qué se analizó y por qué] <!-- TODO -->

## Diagnóstico
### Hallazgos (Top N)
1) [Área] → Descripción → Evidencia/Indicador <!-- TODO -->
2) <!-- TODO -->
3) <!-- TODO -->

### Riesgos
- R1: [Riesgo] — Impacto (A/M/B), Probabilidad (A/M/B), Mitigación <!-- TODO -->
- R2: <!-- TODO -->

## Recomendaciones
### Quick Wins (1–2 semanas)
- [Acción] → Beneficio esperado <!-- TODO -->
- <!-- TODO -->

### Estrategia (1–3 meses)
- [Acción] → Resultado, dependencias, salvaguardas (feature flags, canary, rollback) <!-- TODO -->
- <!-- TODO -->

## Próximos pasos
1) [Paso] — Responsable — Prerrequisitos <!-- TODO -->
2) <!-- TODO -->
3) <!-- TODO -->

## Indicadores
- [Métrica] → Objetivo/Umbral → Herramienta (APM, logs, tests, etc.) <!-- TODO -->
- <!-- TODO -->

## JSON
```json
{
  "version": "1.0",
  "id_consulta": "TODO-reemplazar",
  "timestamp": "2025-08-16T00:00:00Z",
  "status": "provisional",
  "executive_summary": "TODO: resumen corto",
  "context_summary": "TODO: resumen del contexto entendido",
  "context": {
    "objective": "TODO",
    "phase": "TODO",
    "stack": ["TODO"],
    "constraints": ["TODO"],
    "symptoms": ["TODO"],
    "assumptions": ["TODO"]
  },
  "process_flow": ["Objetivo","Recorrido","Inspección","Oportunidades","Números"],
  "process_notes": ["TODO"],
  "diagnostic": {
    "findings": [
      { "area": "TODO", "description": "TODO", "evidence": "TODO" }
    ],
    "notes": []
  },
  "risks": [
    { "risk": "TODO", "impact": "High", "probability": "Medium", "mitigation": "TODO" }
  ],
  "recommendations": {
    "quick_wins": [
      { "action": "TODO", "benefit": "TODO" }
    ],
    "strategy": [
      { "action": "TODO", "outcome": "TODO", "dependencies": ["TODO"], "safeguards": ["canary","rollback"] }
    ]
  },
  "next_steps": [
    { "step": "TODO", "owner": "TODO-rol", "prerequisites": ["TODO"] }
  ],
  "indicators": [
    { "metric": "TODO", "target": "TODO", "tool": "TODO" }
  ],
  "mode": { "type": "diagnostico", "verbosity": "media", "code": "minimo", "critique": "equilibrada" },
  "security_notes": ["no exponer secretos ni PII"]
}
