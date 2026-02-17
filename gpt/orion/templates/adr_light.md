
```md
<!-- ADR Light alineado al contrato de salida.
     Incluye Recomendaciones y JSON válidos para el schema. -->

# Resumen ejecutivo
[≤120 palabras: decisión a tomar, criterio principal, impacto esperado] <!-- TODO -->

## Contexto
- Sistema/Componente: <!-- TODO -->
- Objetivo de la decisión: <!-- TODO -->
- Restricciones/SLAs/Compliance: <!-- TODO -->
- Supuestos: <!-- TODO -->

## Proceso
- Opciones identificadas y criterios de comparación (coste, complejidad, riesgo, performance, seguridad) <!-- TODO -->

## Diagnóstico (opcional)
- Hallazgos que motivan la decisión (latencia, coste, mantenibilidad, etc.) <!-- TODO -->

## Decisión
- Opción elegida: <!-- TODO -->
- Justificación (criterios y trade-offs): <!-- TODO -->

## Riesgos
- [Riesgo] — Impacto (A/M/B), Probabilidad (A/M/B), Mitigación <!-- TODO -->
- <!-- TODO -->

## Recomendaciones
### Quick Wins (1–2 semanas)
- Formalizar la ADR en el repo y socializar con el equipo → conocimiento compartido <!-- ejemplo -->
- Preparar PoC mínima para validar supuestos clave <!-- TODO -->

### Estrategia (1–3 meses)
- Plan de implementación por fases con salvaguardas (flags/canary/rollback) <!-- TODO -->
- Observabilidad y SLOs específicos para validar la decisión <!-- TODO -->

## Próximos pasos
1) Redactar ADR final y agenda de aprobación — Responsable: Tech Lead <!-- TODO -->
2) Construir PoC y medir métricas objetivo — Responsable: Equipo <!-- TODO -->

## Indicadores
- [Métrica] → Objetivo → Herramienta <!-- TODO -->
- <!-- TODO -->

## JSON
```json
{
  "version": "1.0",
  "id_consulta": "TODO-adr",
  "timestamp": "2025-08-16T00:00:00Z",
  "status": "provisional",
  "executive_summary": "TODO: resumen de la decisión y su impacto",
  "context_summary": "TODO: contexto resumido de la decisión",
  "context": {
    "objective": "TODO",
    "phase": "TODO",
    "stack": ["TODO"],
    "constraints": ["TODO"],
    "symptoms": ["TODO"],
    "assumptions": ["TODO"]
  },
  "process_flow": ["Objetivo","Recorrido","Inspección","Oportunidades","Números"],
  "diagnostic": {
    "findings": [
      { "area": "Arquitectura", "description": "Motivación de la decisión", "evidence": "TODO" }
    ]
  },
  "risks": [
    { "risk": "TODO", "impact": "Medium", "probability": "Medium", "mitigation": "TODO" }
  ],
  "recommendations": {
    "quick_wins": [
      { "action": "Documentar ADR y socializar", "benefit": "Alineación del equipo" }
    ],
    "strategy": [
      { "action": "Implementación por fases con flags/canary", "outcome": "Riesgo controlado", "dependencies": ["entorno staging"], "safeguards": ["rollback"] }
    ]
  },
  "next_steps": [
    { "step": "Redactar ADR final y aprobar", "owner": "Tech Lead" }
  ],
  "indicators": [
    { "metric": "SLO objetivo de la decisión", "target": "TODO", "tool": "APM/Logs" }
  ],
  "mode": { "type": "adr", "verbosity": "media", "code": "evitar", "critique": "equilibrada" }
}
