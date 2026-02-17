

```md
<!-- Checklist de readiness para producción.
     Incluye contexto, proceso de validación y checklist típica. -->

# Resumen ejecutivo
[≤120 palabras: objetivo del release, riesgos principales, decisión de ir/no ir] <!-- TODO -->

## Contexto
- Servicio/Release: <!-- TODO -->
- Fecha objetivo: <!-- TODO -->
- Riesgos/Dependencias: <!-- TODO -->
- Supuestos: <!-- TODO -->

## Proceso
- Cómo se validará cada ítem (herramienta, evidencia, responsable) <!-- TODO -->

## Diagnóstico (opcional)
- Hallazgos sobre gaps de readiness (seguridad, observabilidad, despliegue) <!-- TODO -->

## Recomendaciones
### Quick Wins (1–2 semanas)
- [Acción] → Beneficio (p. ej., activar alertas mínimas, backups) <!-- TODO -->
### Estrategia (1–3 meses)
- [Acción] → Resultado (p. ej., DR plan completo, SLOs formales) <!-- TODO -->

## Checklist
- [ ] Logs estructurados
- [ ] Alertas (SLO/SLA) y dashboards
- [ ] Backups probados y DR plan
- [ ] Secrets management
- [ ] Límite de recursos y autoscaling
- [ ] Parches de seguridad al día
- [ ] Rate limiting + timeouts + retries
- [ ] Readiness/Liveness probes (si aplica)
- [ ] Políticas de acceso (mínimo privilegio)
- [ ] Plan de rollback y canary
- [ ] Documentación y runbooks

## Próximos pasos
1) [Paso] — Responsable — Prerrequisitos <!-- TODO -->
2) <!-- TODO -->

## Indicadores
- [Métrica] → Objetivo → Herramienta <!-- TODO -->
- <!-- TODO -->

## JSON
```json
{
  "version": "1.0",
  "id_consulta": "TODO-readiness",
  "timestamp": "2025-08-16T00:00:00Z",
  "status": "provisional",
  "executive_summary": "TODO: decisión go/no-go y principales riesgos",
  "context_summary": "TODO: release/servicio y fecha objetivo",
  "context": {
    "objective": "TODO",
    "phase": "Release",
    "stack": ["TODO"],
    "constraints": ["TODO"],
    "symptoms": [],
    "assumptions": ["TODO"]
  },
  "process_flow": ["Objetivo","Recorrido","Inspección","Oportunidades","Números"],
  "diagnostic": {
    "findings": [
      { "area": "Readiness", "description": "TODO: gap encontrado", "evidence": "TODO" }
    ]
  },
  "recommendations": {
    "quick_wins": [
      { "action": "Activar alertas mínimas", "benefit": "Detección temprana de incidentes" }
    ],
    "strategy": [
      { "action": "Completar DR plan y simulacros", "outcome": "Mayor resiliencia", "dependencies": ["infra"], "safeguards": ["simulacros"] }
    ]
  },
  "next_steps": [
    { "step": "Completar checklist crítica", "owner": "Plataforma", "prerequisites": ["accesos"] }
  ],
  "indicators": [
    { "metric": "Tiempo de recuperación (RTO)", "target": "≤ X min", "tool": "Runbooks/Monitoreo" }
  ],
  "mode": { "type": "checklist", "verbosity": "media", "code": "evitar", "critique": "equilibrada" }
}
