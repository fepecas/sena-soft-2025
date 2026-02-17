
## Contexto del usuario

> “**App móvil Flutter** (iOS/Android) con **Firebase** (Auth, Firestore, Functions). Con 15k MAU tenemos **crash rate \~2.5%**, **jank > 10%** en el feed y **arranque en frío \~3.2 s**. Queremos escalar a **100k MAU** en 6 semanas y publicar una release estable. Equipo: 2 mobile, 1 backend.”

---

## Respuesta de Orion

### Resumen ejecutivo

Los síntomas indican **gestión de estado deficiente** (reconstrucciones masivas/leaks), **consultas “charlatanas” a Firestore** sin índices/`limit`, y **Cloud Functions con cold start**. Con **Quick Wins** (estado por dominio, `dispose` correcto, compresión/caché de imágenes, `limit` + índices compuestos, `minInstances` en Functions, Crashlytics/Perf con dashboards) es factible llegar a **crash < 0.5%**, **jank < 5%** y **TTI < 2 s** en dispositivos medios. La estrategia añade **arquitectura modular**, **Design System**, **tests de integración** y **staged rollout** con feature flags.

### Contexto

* Proyecto: App social con feed, perfiles y notificaciones
* Objetivo: release estable para 100k MAU en 6 semanas
* Stack: Flutter + Firebase (Auth, Firestore, Functions, Remote Config, Crashlytics, Performance)
* Estado actual: estado global acoplado; observabilidad básica
* Restricciones: equipo pequeño; tiempo limitado
* Síntomas/Indicadores: crash 2.5%, jank > 10% feed, cold start \~3.2 s
* Supuestos: imágenes sin compresión adaptativa; consultas sin paginación; sin `minInstances`

### Proceso

* Pipeline: **O·R·I·O·N**
  Contexto → Arquitectura UI/datos → Riesgos (estabilidad/coste/perf) → Oportunidades → Métricas/validación.

### Diagnóstico

#### Hallazgos (Top 6)

1. **Estado global acoplado** y uso intensivo de `setState` → **rebuild storms** y jank.
2. **Controladores no liberados** (scroll, cámaras, streams) → **leaks** y crashes.
3. **Over-fetching** y **falta de índices** en Firestore; queries sin `limit`/`where` adecuados.
4. **Cold start** en Cloud Functions + payloads pesados → latencia en acciones del feed.
5. **Assets grandes** sin caching adecuado → TTI lento.
6. **Observabilidad insuficiente**: Crashlytics/Perf sin dashboards ni alertas por umbral.

#### Riesgos

* **R1**: Crash persistente en dispositivos gama media — Impacto: **High**, Prob.: **Medium** — Mitigación: flags + circuit breakers.
* **R2**: Coste de Firestore por lecturas innecesarias — Impacto: **Medium**, Prob.: **High** — Mitigación: índices + paginación/`limit`.
* **R3**: Latencia alta por cold start — Impacto: **Medium**, Prob.: **Medium** — Mitigación: `minInstances`, colas y caché.

### Recomendaciones

#### Quick Wins (1–2 semanas)

* **Gestión de estado por dominio** (p. ej., Riverpod/BLoC) + **`selective rebuilds`**.
* **Liberar controladores** y revisar `dispose()` en widgets/servicios.
* **Firestore**: añadir **índices compuestos**; usar `where` + `orderBy` + `limit` + **paginación**; evitar lecturas innecesarias.
* **Functions**: configurar **`minInstances`** en funciones calientes; reducir payloads y tiempos fríos.
* **Assets**: compresión adaptativa, imágenes responsivas; `cacheWidth/height` cuando aplique.
* **Observabilidad**: activar **Crashlytics** con alertas por crash rate; **Performance** con trazas en feed/inicio.
* **Remote Config/feature flags** para aislar funcionalidades inestables.

#### Estrategia (1–3 meses)

* **Arquitectura modular** (por dominio + DI); separar UI/servicios/datos.
* **Design System** (tokens, tipografías, spacing) para rendimiento y coherencia.
* **Pruebas de integración** y **golden tests** en pantallas críticas.
* **Modo offline/Cache de datos** (p. ej., `cacheSizeBytes`, políticas de expiración).
* **Staged rollout** (10% → 25% → 50% → 100%) con **monitorización de métricas** y **rollback** con Remote Config.
* **Agregación en backend** (Cloud Functions/Tasks) para reducir over-fetch en el feed.

### Próximos pasos

1. Migrar a gestión de estado por dominio — **Mobile** — prereq: mapa de estados.
2. Auditoría de `dispose()` + leaks — **Mobile** — prereq: lista de controladores.
3. Crear índices compuestos + paginación — **Mobile/Backend** — prereq: patrón de queries.
4. Configurar `minInstances` en funciones calientes — **Backend** — prereq: presupuesto.
5. Activar dashboards/alertas (Crashlytics/Perf) — **Plataforma**.
6. Preparar **staged rollout** con flags — **Mobile** — prereq: Remote Config.

### Indicadores

* **Crash rate** total → **< 0.5%** → Crashlytics
* **Jank** (frame build > 16ms) en feed → **< 5%** → Flutter Perf
* **TTI** (inicio en frío) → **< 2 s** en gama media → Perf traces
* **Lecturas Firestore/user/feed** → **-30%** vs. baseline → métricas Firestore
* **Cold start Functions** → **< 500 ms** en funciones calientes → logs/Perf

### JSON

```json
{
  "version": "1.0",
  "id_consulta": "flutter-001",
  "timestamp": "2025-08-16T00:10:00Z",
  "status": "provisional",
  "executive_summary": "Estado acoplado, over-fetching en Firestore e inicios fríos en Functions explican crash 2.5%, jank >10% y TTI ~3.2s. Quick Wins permiten crash<0.5%, jank<5% y TTI<2s.",
  "context_summary": "App Flutter con Firebase; objetivo escalar a 100k MAU con release estable mejorando estabilidad y rendimiento.",
  "context": {
    "objective": "Crash<0.5%, jank<5%, TTI<2s",
    "phase": "Pre-release",
    "stack": ["Flutter", "Firebase Auth", "Firestore", "Cloud Functions", "Remote Config", "Crashlytics", "Performance"],
    "constraints": ["equipo pequeño", "6 semanas"],
    "symptoms": ["crash 2.5%", "jank >10%", "TTI ~3.2s"],
    "assumptions": ["sin minInstances", "sin compresión adaptativa", "consultas sin paginación"]
  },
  "process_flow": ["Objetivo", "Recorrido", "Inspección", "Oportunidades", "Números"],
  "process_notes": ["Foco en estado UI, consultas Firestore, Functions y assets"],
  "diagnostic": {
    "findings": [
      { "area": "Estado/UI", "description": "Estado global acoplado produce rebuilds masivos" },
      { "area": "Memoria", "description": "Controladores sin dispose causan leaks/crashes" },
      { "area": "Datos", "description": "Over-fetching y falta de índices en Firestore" },
      { "area": "Backend", "description": "Cold start en Functions por falta de minInstances" },
      { "area": "Assets", "description": "Imágenes pesadas sin cacheo/compresión" }
    ]
  },
  "risks": [
    { "risk": "Crash en gama media persiste", "impact": "High", "probability": "Medium", "mitigation": "feature flags + circuit breakers" },
    { "risk": "Coste alto por lecturas", "impact": "Medium", "probability": "High", "mitigation": "índices + paginación/limit" }
  ],
  "recommendations": {
    "quick_wins": [
      { "action": "Gestionar estado por dominio (Riverpod/BLoC)", "benefit": "Menos rebuilds y jank" },
      { "action": "Revisar dispose() y liberar controladores", "benefit": "Menos crashes/leaks" },
      { "action": "Índices compuestos + queries con where/orderBy/limit", "benefit": "Menos latencia y coste" },
      { "action": "minInstances en Functions calientes", "benefit": "Menor cold start" },
      { "action": "Compresión/caché de imágenes", "benefit": "TTI más rápido" },
      { "action": "Activar dashboards Crashlytics/Perf + alertas", "benefit": "Detección temprana" },
      { "action": "Feature flags/Remote Config", "benefit": "Control de riesgo en lanzamiento" }
    ],
    "strategy": [
      { "action": "Modularizar por dominio + DI", "outcome": "Mantenibilidad y performance", "dependencies": ["refactor"], "safeguards": ["rollout por módulo"] },
      { "action": "Design System y golden tests", "outcome": "UI consistente y rápida", "dependencies": ["tokens de diseño"], "safeguards": ["pruebas visuales"] },
      { "action": "Modo offline/Cache de datos", "outcome": "Menos lecturas y mejor UX", "dependencies": ["políticas de cache"], "safeguards": ["invalidación"] },
      { "action": "Staged rollout con métricas", "outcome": "Riesgo controlado", "dependencies": ["Remote Config"], "safeguards": ["rollback inmediato"] },
      { "action": "Agregación en backend (feeds)", "outcome": "Menos over-fetch en cliente", "dependencies": ["Functions/Tasks"], "safeguards": ["idempotencia"] }
    ]
  },
  "next_steps": [
    { "step": "Migrar gestión de estado", "owner": "Mobile", "prerequisites": ["mapa de estados"] },
    { "step": "Auditar dispose()/leaks", "owner": "Mobile", "prerequisites": ["lista de controladores"] },
    { "step": "Definir índices/queries", "owner": "Mobile/Backend", "prerequisites": ["patrones de consulta"] },
    { "step": "Configurar minInstances", "owner": "Backend", "prerequisites": ["presupuesto"] },
    { "step": "Dashboard/alertas Crashlytics/Perf", "owner": "Plataforma" },
    { "step": "Plan de staged rollout", "owner": "Mobile", "prerequisites": ["Remote Config"] }
  ],
  "indicators": [
    { "metric": "Crash rate total", "target": "< 0.5%", "tool": "Crashlytics" },
    { "metric": "Jank feed", "target": "< 5%", "tool": "Flutter Performance" },
    { "metric": "TTI (frío) gama media", "target": "< 2s", "tool": "Perf traces" },
    { "metric": "Lecturas Firestore por usuario", "target": "-30% vs baseline", "tool": "Firestore metrics" },
    { "metric": "Cold start Functions", "target": "< 500ms", "tool": "Logs/Perf" }
  ],
  "mode": { "type": "diagnostico", "verbosity": "media", "code": "minimo", "critique": "equilibrada" },
  "security_notes": ["no exponer PII ni tokens en logs"]
}
```