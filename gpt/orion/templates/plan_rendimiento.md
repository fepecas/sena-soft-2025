
```md
<!-- Plan de optimización de rendimiento.
     Estructura compatible con el schema y con plantillas de experiments. -->

# Resumen ejecutivo
[≤120 palabras: síntoma principal, hipótesis, mejora esperada] <!-- TODO -->

## Contexto
- Servicio/Endpoint/Módulo: <!-- TODO -->
- Objetivo de performance (SLO): <!-- TODO -->
- Entorno (dev/stg/prod): <!-- TODO -->
- Supuestos y restricciones: <!-- TODO -->

## Proceso
- Perfilado/perf tracing a aplicar y por qué (herramientas) <!-- TODO -->

## Diagnóstico
### Síntomas
- <!-- TODO -->
### Hipótesis
- <!-- TODO -->

## Recomendaciones
### Quick Wins (1–2 semanas)
- [Acción] → Beneficio (p. ej., cache, índices, batch, compresión) <!-- TODO -->
- <!-- TODO -->

### Estrategia (1–3 meses)
- [Acción] → Resultado, dependencias, salvaguardas <!-- TODO -->
- <!-- TODO -->

## Experimentos (con criterio de éxito)
- [Prueba] → Métrica objetivo → Umbral de mejora → Herramienta <!-- TODO -->
- <!-- TODO -->

## Salvaguardas
- Feature flags, canary releases, rollback, backups <!-- TODO -->

## Próximos pasos
1) [Paso] — Responsable — Prerrequisitos <!-- TODO -->
2) <!-- TODO -->

## Indicadores
- [Métrica] → Objetivo/Umbral → Herramienta <!-- TODO -->
- <!-- TODO -->

## JSON
```json
{
  "version": "1.0",
  "id_consulta": "TODO-perf",
  "timestamp": "2025-08-16T00:00:00Z",
  "status": "provisional",
  "executive_summary": "TODO: síntoma, hipótesis, mejora esperada",
  "context_summary": "TODO: resumen de servicio/endpoint y SLO",
  "context": {
    "objective": "TODO-SLO",
    "phase": "TODO",
    "stack": ["TODO"],
    "constraints": ["TODO"],
    "symptoms": ["TODO"],
    "assumptions": ["TODO"]
  },
  "process_flow": ["Objetivo","Recorrido","Inspección","Oportunidades","Números"],
  "process_notes": ["TODO: herramientas de perfilado"],
  "diagnostic": {
    "findings": [
      { "area": "Rendimiento", "description": "TODO: cuello detectado", "evidence": "TODO" }
    ]
  },
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
  "mode": { "type": "plan-rendimiento", "verbosity": "media", "code": "minimo", "critique": "equilibrada" }
}
