

## Contexto del usuario

> “Tenemos una **API de e-commerce** en **Django + PostgreSQL**. En campañas (viernes 20:00–22:00) la **latencia p95 sube a \~900 ms** y aparecen **errores 5xx \~1.8%** en `/products` y `/checkout`. Objetivo: **p95 < 300 ms** y **errores < 0.5%** en 4 semanas. Infra: **Nginx + Gunicorn** en una VM, sin CDN. Equipo: 3 devs.”

---

## Respuesta de Orion

### Resumen ejecutivo

La degradación en picos proviene de **consultas N+1 / índices faltantes**, **caché inexistente** y **capacidad insuficiente de Gunicorn/DB**. Con **Quick Wins** (índices críticos, `select_related/prefetch_related`, Redis como caché, ajuste de workers/timeouts y pooling) se puede bajar a **p95 < 300 ms** y **5xx < 0.5%** en ≤ 4 semanas. La estrategia a 1–3 meses incluye **CDN**, **APM + tracing**, **pruebas de carga** y **tareas asíncronas** en checkout.

### Contexto

* Proyecto: API de e-commerce (catálogo, carrito, checkout)
* Objetivo: p95 < 300 ms y 5xx < 0.5% en hora pico
* Stack: Django, PostgreSQL, Nginx + Gunicorn
* Estado actual: 1 VM, sin CDN, sin caché de aplicación
* Restricciones: 3 devs; 4 semanas para estabilizar
* Síntomas/Indicadores: p95 ≈ 900 ms; 5xx ≈ 1.8% en `/products` y `/checkout`
* Supuestos: sin connection pooling dedicado; sin APM

### Proceso

* Pipeline aplicado: **O·R·I·O·N**
  **Objetivo/Contexto** → **Recorrido** (ORM/DB, runtime, red) → **Inspección de riesgos** → **Oportunidades/Plan** → **Números** (métricas y validación).
* Notas: foco en ORM/DB, caché, workers y límites de tiempo/conexión.

### Diagnóstico

#### Hallazgos (Top 6)

1. **Consultas N+1** en listados y detalles (categorías, variantes).
2. **Índices ausentes** en claves de filtrado/orden (categoría, `is_active`, `visibility`, `updated_at`).
3. **Caché de lectura** inexistente en endpoints calientes (catálogo).
4. **Gunicorn subdimensionado** (workers y timeouts por defecto).
5. **Pooling/Pool size** a PostgreSQL insuficiente → picos de conexiones/latencia.
6. **Nginx sin rate limiting ni timeouts explícitos** → conexiones colgadas bajo pico.

#### Riesgos

* **R1**: Caídas en checkout durante pico — Impacto: **High**, Prob.: **Medium** — Mitigación: colas, idempotencia, timeouts.
* **R2**: Regressions por migraciones de índices — Impacto: **Medium**, Prob.: **Medium** — Mitigación: migraciones online + canary.
* **R3**: Coste en DB por plan de ejecución subóptimo — Impacto: **Medium**, Prob.: **High** — Mitigación: `ANALYZE`, planes y monitoreo.

### Recomendaciones

#### Quick Wins (1–2 semanas)

* **Eliminar N+1** con `select_related`/`prefetch_related` en vistas de catálogo.
* **Crear índices** en campos de filtro/ordenamiento clave y revisar planes (`EXPLAIN ANALYZE`).
* **Redis caché** para `/products` (TTL 60–120 s; invalidación por evento).
* **Ajustar Gunicorn**: workers ≈ `2–4 × CPU`, `--timeout` y `--graceful-timeout` acordes; `keep-alive`.
* **Pooling**: habilitar pgbouncer o `CONN_MAX_AGE`>0; afinar `max_connections`.
* **Nginx**: `proxy_read_timeout`, `limit_req` en endpoints críticos; compresión y caching estático.
* **Mantenimiento DB**: `VACUUM (AUTO)`, `ANALYZE` tras migraciones.

#### Estrategia (1–3 meses)

* **CDN** para assets/media y caching de catálogo.
* **APM + tracing distribuido** (Datadog/New Relic/Otel) en `/products` y `/checkout`.
* **Pruebas de carga** (ramp-up, mezcla R/W, spikes); definir **SLOs**.
* **Desacoplar tareas pesadas** del checkout a **workers/colas** (pagos, inventario).
* **Réplica de lectura** si el patrón lo justifica; particionado o índices compuestos si crece el catálogo.

### Próximos pasos

1. Definir lista de índices + migraciones seguras — **Backend** — prereq: plan de rollback.
2. Implementar Redis en `/products` — **Backend** — prereq: instancia Redis + invalidación.
3. Reconfigurar Gunicorn/Nginx — **DevOps** — prereq: monitoreo básico.
4. Activar pooling (pgbouncer/`CONN_MAX_AGE`) — **Plataforma**.
5. Correr prueba de carga y ajustar — **Equipo** — prereq: **staging** similar a prod.
6. Activar APM y dashboards mínimos — **Plataforma**.

### Indicadores

* **Latencia p95** `/products` y `/checkout` → **< 300 ms** → APM
* **Error rate 5xx total** → **< 0.5%** → logs/alertas
* **Cache hit-rate catálogo** → **> 80%** → Redis/CDN
* **Uso CPU DB** → **< 70%** sostenido → dashboards
* **Conexiones activas a PG** → sin picos/colas → pg\_stat\_activity

### JSON

```json
{
  "version": "1.0",
  "id_consulta": "ecom-001",
  "timestamp": "2025-08-16T00:00:00Z",
  "status": "provisional",
  "executive_summary": "N+1, índices faltantes, ausencia de caché y workers insuficientes explican p95~900ms y 5xx~1.8%. Quick Wins permiten p95<300ms y 5xx<0.5% en ≤4 semanas.",
  "context_summary": "API de e-commerce Django/PostgreSQL con picos en campañas; objetivo bajar latencia y errores.",
  "context": {
    "objective": "p95<300ms y errores<0.5% en hora pico",
    "phase": "MVP avanzado",
    "stack": ["Django", "PostgreSQL", "Nginx", "Gunicorn", "Redis (plan)"],
    "constraints": ["3 devs", "4 semanas"],
    "symptoms": ["p95~900ms", "5xx~1.8% en /products y /checkout"],
    "assumptions": ["sin APM", "sin pooling dedicado", "sin CDN"]
  },
  "process_flow": ["Objetivo", "Recorrido", "Inspección", "Oportunidades", "Números"],
  "process_notes": ["Foco en ORM/DB, caché, runtime"],
  "diagnostic": {
    "findings": [
      { "area": "DB/ORM", "description": "Consultas N+1 en listados", "evidence": "SELECTs elevados por request" },
      { "area": "DB", "description": "Índices ausentes en filtros/orden", "evidence": "seq scans en EXPLAIN" },
      { "area": "Cache", "description": "Catálogo sin caché efectiva" },
      { "area": "Runtime", "description": "Workers Gunicorn insuficientes" },
      { "area": "Network", "description": "Nginx sin límites/timeouts claros" }
    ]
  },
  "risks": [
    { "risk": "Caídas en checkout bajo pico", "impact": "High", "probability": "Medium", "mitigation": "colas y timeouts + idempotencia" },
    { "risk": "Regresiones por nuevas migraciones", "impact": "Medium", "probability": "Medium", "mitigation": "canary + rollback" }
  ],
  "recommendations": {
    "quick_wins": [
      { "action": "Añadir índices críticos", "benefit": "Reduce tiempo de consulta" },
      { "action": "select_related/prefetch_related", "benefit": "Elimina N+1" },
      { "action": "Redis caché en catálogo", "benefit": "Baja latencia y carga DB" },
      { "action": "Ajustar workers/timeouts Gunicorn", "benefit": "Reduce colas y timeouts" },
      { "action": "Pooling (pgbouncer/CONN_MAX_AGE)", "benefit": "Latencia más estable" },
      { "action": "Rate limiting y timeouts en Nginx", "benefit": "Mitiga conexiones colgadas" }
    ],
    "strategy": [
      { "action": "CDN para assets/media", "outcome": "Offload de origen", "dependencies": ["Proveedor CDN"], "safeguards": ["rollback por ruta"] },
      { "action": "APM + tracing", "outcome": "Detectar cuellos críticos", "dependencies": ["Cuenta APM"], "safeguards": ["canary"] },
      { "action": "Pruebas de carga realistas", "outcome": "Capacidad y SLOs", "dependencies": ["Staging"], "safeguards": ["plan de rollback"] },
      { "action": "Checkout asíncrono", "outcome": "Menos bloqueo en request crítico", "dependencies": ["Colas/Workers"], "safeguards": ["idempotencia"] }
    ]
  },
  "next_steps": [
    { "step": "Aplicar índices y revisar planes", "owner": "Backend", "prerequisites": ["plan de migración"] },
    { "step": "Implementar Redis", "owner": "Backend", "prerequisites": ["instancia Redis"] },
    { "step": "Reconfigurar Gunicorn/Nginx", "owner": "DevOps" },
    { "step": "Habilitar pooling", "owner": "Plataforma" },
    { "step": "Ejecutar carga y ajustar", "owner": "Equipo", "prerequisites": ["staging"] },
    { "step": "Activar APM", "owner": "Plataforma" }
  ],
  "indicators": [
    { "metric": "latencia p95 /products", "target": "< 300ms", "tool": "APM" },
    { "metric": "error rate 5xx", "target": "< 0.5%", "tool": "logs/alertas" },
    { "metric": "cache hit-rate catálogo", "target": "> 80%", "tool": "Redis/CDN" },
    { "metric": "CPU DB", "target": "< 70%", "tool": "dashboards" }
  ],
  "mode": { "type": "diagnostico", "verbosity": "media", "code": "minimo", "critique": "equilibrada" },
  "security_notes": ["no exponer secretos ni datos de clientes"]
}
```

