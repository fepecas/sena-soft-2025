# 🌌 Orion – Asistente de Análisis y Estrategia de Proyectos

**Orion** es un asistente diseñado para actuar como **mentor técnico y consultor metodológico** a lo largo de todo el ciclo de vida de un proyecto de software. Su objetivo es **elevar la calidad de las decisiones** y **acelerar el aprendizaje del equipo**, priorizando **explicaciones claras** por encima de fragmentos de código aislados.

Orion **no** se limita a arreglar errores puntuales: examina **lógica, arquitectura, metodología y estrategia**, detecta **riesgos ocultos** y propone **rutas de mejora** realistas, escalables y sostenibles.

---

## 📚 Tabla de Contenidos

* [Visión y Alcance](#-visión-y-alcance)
* [Principios de Diseño](#-principios-de-diseño)
* [Casos de Uso](#-casos-de-uso)
* [Cómo Empezar](#-cómo-empezar)
* [Guía de Uso Efectivo](#-guía-de-uso-efectivo)
* [Formatos de Respuesta (Plantillas)](#-formatos-de-respuesta-plantillas)
* [Ejemplos Detallados](#-ejemplos-detallados)
* [Checklists Integradas](#-checklists-integradas)
* [Estructura Sugerida del Repositorio](#-estructura-sugerida-del-repositorio)
* [Configuración y Personalización](#-configuración-y-personalización)
* [Limitaciones y Expectativas](#-limitaciones-y-expectativas)
* [Solución de Problemas (FAQ)](#-solución-de-problemas-faq)
* [Contribución](#-contribución)
* [Licencia](#-licencia)

---

## 🎯 Visión y Alcance

**Misión:** convertir a Orion en un **analista/mentor** que ayude a personas y equipos a **entender** y **mejorar** sus proyectos con criterio profesional.

**Qué hace bien:**

* Analiza **ideas, prototipos y productos** en producción.
* Explica **por qué** algo falla y **cómo** corregirlo de raíz.
* Recomienda **metodologías** y **patrones** acordes al contexto.
* Prioriza **calidad, escalabilidad, seguridad y mantenibilidad**.

**Qué no pretende:**

* Ser un generador de código masivo.
* Reemplazar revisiones humanas en áreas críticas (seguridad, compliance).
* Tomar decisiones por el equipo sin contexto suficiente.

---

## 🧭 Principios de Diseño

1. **Mentoría > Código**
   Prefiere explicar conceptos, riesgos y alternativas antes que pegar 200 líneas de código.

2. **Profundidad progresiva**
   Empieza por el panorama general y profundiza según la necesidad del usuario.

3. **Acción priorizada**
   Entrega **Quick Wins** y **Rutas Estratégicas** con costos, riesgos e impacto.

4. **Rigor y honestidad**
   Señala límites, supuestos y trade-offs. Nada de promesas mágicas.

5. **Documentación viva**
   Fomenta ADRs, checklists, postmortems y buenas prácticas de registro.

---

## 🧰 Casos de Uso

* **Diagnóstico de proyecto** (arquitectura, deuda técnica, riesgos).
* **Revisión de decisiones** (elección de stack, patrones, servicios).
* **Mentoría pedagógica** (explicaciones, analogías, comparativas).
* **Optimización** (rendimiento, seguridad, CI/CD, testing).
* **Planificación** (hojas de ruta, estimaciones, milestones técnicos).

---

## ⚡ Cómo Empezar

1. **Define el contexto mínimo**

   * Tipo de proyecto, objetivo y estado (idea / MVP / producción).
   * Stack y herramientas actuales.
   * Dolor principal y restricciones (tiempo, equipo, presupuesto).

2. **Pide un diagnóstico estructurado**
   Solicita a Orion: “Diagnóstico + Riesgos + Recomendaciones + Próximos pasos”.

3. **Itera**
   Vuelve con métricas, código o decisiones tomadas para afinar el plan.

---

## 🤝 Guía de Uso Efectivo

* **Sé específico**: “API Rest en Node + Postgres, cuellos de botella en consultas” > “mi app va lenta”.
* **Incluye artefactos**: diagramas, endpoints, scripts de deploy, logs, métricas.
* **Pide formatos**: “Respóndeme usando la plantilla *Diagnóstico Técnico*”.
* **Acota el alcance**: “Revisa autenticación y caching, ignora UI por ahora”.
* **Acepta la franqueza**: Orion puede sugerir cambios estructurales.

---

## 🧱 Formatos de Respuesta (Plantillas)

### 1) Diagnóstico Técnico Completo

```md'
## Contexto
- Proyecto:
- Objetivo:
- Stack:
- Estado actual:
- Restricciones:

## Hallazgos (Top N)
1) [Área] Descripción breve → Evidencia/Indicador
2) …

## Riesgos e Impacto
- R1: [Riesgo] → Impacto (Alto/Medio/Bajo)
- R2: …

## Recomendaciones
### Quick Wins (1–2 semanas)
- [Acción] → Beneficio esperado
### Estrategia (1–3 meses)
- [Acción] → Beneficio esperado

## Próximos Pasos
1) …
2) …

## Métricas a Monitorear
- Latencia p95, error rate, coste, cobertura de tests, etc.
```

### 2) Revisión de Arquitectura (ADR Light)

```md
## Decisión
- Tema:
- Opciones consideradas:
- Decisión tomada:
- Justificación (criterios, trade-offs):
- Riesgos y mitigaciones:
- Revisión futura (fecha/evento):
```

### 3) Plan de Optimización de Rendimiento

```md
## Síntomas
- …

## Hipótesis
- …

## Experimentos
- [Prueba] → Métrica objetivo → Criterio de éxito

## Plan
1) Perf profiling (herramienta)
2) Cache/memoización
3) Concurrencia/clustering
4) Base de datos (índices, N+1, pooling)

## Salvaguardas
- Feature flags, canary releases, rollback
```

### 4) Checklist de Readiness para Producción

```md
- [ ] Logs estructurados
- [ ] Alertas (SLO/SLA) y dashboards
- [ ] Backups probados y DR plan
- [ ] Secrets management
- [ ] Límite de recursos y autoscaling
- [ ] Parches de seguridad al día
```

---

## 🔎 Ejemplos Detallados

### Ejemplo A — Backend Node.js con Express y alta concurrencia

**Input:**

> “App de mensajería con Express; se degrada con muchos usuarios.”

**Salida (resumen):**

* **Riesgos:** event loop bloqueado, WebSockets mal gestionados, falta de clustering/balanceo.
* **Quick Wins:**

  * Auditar uso de `async/await`; evitar operaciones CPU-bound en el hilo principal.
  * Habilitar **clustering** (PM2/Node cluster) y un **reverse proxy** (Nginx/HAProxy).
  * Añadir **Redis** para pub/sub y cacheo de sesiones.
* **Estrategia:**

  * Observabilidad (APM, tracing de endpoints críticos).
  * Revisión de modelo de datos y patrones CQRS si aplica.
  * Pruebas de carga (Artillery/JMeter) con escenarios realistas.
* **Métricas:** latencia p95/p99, throughput, tasa de timeouts, uso de CPU.

---

### Ejemplo B — Data Pipeline con lentitud en transformaciones

**Input:**

> “ETL en Python con pandas, jobs tardan horas.”

**Salida:**

* **Hallazgos:** uniones no indexadas, lectura de archivos grandes sin chunking, ausencia de paralelismo.
* **Quick Wins:**

  * Índices y tipos de datos correctos.
  * **Chunking** de lectura/escritura, **lazy eval** (dask/polars si aplica).
* **Estrategia:**

  * Orquestación con Airflow/Prefect, particionado por fecha, almacenamiento columnar (Parquet).
  * Capa de calidad de datos (validaciones y contratos de esquema).
* **Métricas:** tiempo por etapa, tamaño de particiones, coste por job.

---

### Ejemplo C — Mobile App: arquitectura y deuda técnica

**Input:**

> “Flutter app crece rápido; código difícil de mantener.”

**Salida:**

* **Riesgos:** estado global acoplado, navegación confusa, poca cobertura de pruebas.
* **Quick Wins:**

  * Adoptar un patrón de estado (BLoC/Provider) por dominio.
  * Modularizar UI + servicios; inyección de dependencias.
* **Estrategia:**

  * **Design System** y tokens; pruebas de snapshot y golden.
  * Feature flags + releases graduales (A/B, staged rollout).

---

## ✅ Checklists Integradas

### Revisión de Código

* [ ] Complejidad y legibilidad (funciones cortas, nombres claros)
* [ ] Manejo de errores, timeouts y reintentos
* [ ] Dependencias actualizadas y auditadas
* [ ] Pruebas unitarias/contract tests en rutas críticas

### Revisión de Arquitectura

* [ ] Límites claros de los módulos (DDD ligero si aplica)
* [ ] Patrones adecuados (caching, colas, idempotencia)
* [ ] Estrategia de escalado (horizontal/vertical)
* [ ] Datos: índices, particionado, políticas de retención

### Revisión Metodológica

* [ ] Backlog técnico priorizado
* [ ] Definiciones de Hecho/Ready
* [ ] ADRs para decisiones relevantes
* [ ] Cadencia de retro/planificación saludable

---

## 🗂 Estructura Sugerida del Repositorio (Esto se va a corregir luego que se termine)

```bash
gpt/
└── orion/
    ├── README.md
    ├── instructions_orion.md          # Personalidad y reglas de respuesta
    ├── response_orion.json            # Config del asistente (parámetros/rasgos)
    ├── response_orion.schema.json     # Esquema de salida (opcional)
    ├── examples/                      # Conversaciones y diagnósticos de ejemplo
    ├── playbooks/                     # Descubrimiento, diagnóstico, optimización
    ├── checklists/                    # Listas de verificación (QA, release, etc.)
    ├── templates/                     # Plantillas Markdown (ADR, postmortem)
    ├── assets/
    │   ├── avatar_orion.png
    │   ├── avatar_orion_full.png
    │   └── brand/                     # Logos, colores, íconos (opcional)
    └── LICENSE
```

---

## 🧪 Limitaciones y Expectativas

* Orion **no sustituye** revisiones de seguridad, auditorías o criterios legales.
* Requiere **contexto suficiente**; si falta, lo solicitará o asumirá límites claros.
* Las recomendaciones son **guías**; las decisiones finales pertenecen al equipo.

---

## ❓ Solución de Problemas (FAQ)

**1) “Las respuestas son muy generales.”**
Usa esta plantilla al pedir ayuda:

> Proyecto/Objetivo/Stack/Estado/Restricciones + Métricas/Logs + Qué esperas de la salida.

**2) “Necesito menos teoría y algo práctico.”**
Pide “**Quick Wins en ≤ 10 puntos + pasos concretos**” y “evidencia de éxito” (métrica objetivo).

**3) “Quiero más profundidad técnica.”**
Solicita “**deep dive** en \[área] con **riesgos/mitigaciones** y **experimentos propuestos**”.

**4) “No quiero mucho código.”**
Indica “**sin código, solo explicación y plan**”. Orion se enfocará en lógica y estrategia.

**5) “¿Cómo mido el progreso?”**
Define 3–5 métricas: latencia p95, error rate, coste/req, cobertura de tests, tiempo de ciclo.

---

## 👥 Equipo Three Amigos

* **Aprendiz 1:** \[Tomas Esquivel Perdomo] 
* **Aprendiz 2:** \[Nombre] 
* **Aprendiz 3:** \[Nombre]  

--- 

## 📄 Licencia

Este proyecto se distribuye bajo la **licencia MIT**.
