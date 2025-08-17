# Tablero Three Amigos — Cómo usarlo, Plantilla y Ejemplos

**Para qué sirve**  
Coordina al equipo en modo **Three Amigos** (👩‍💼 PO/BA, 🧑‍💻 DEV, 🧪 QA) con foco en valor, claridad y evidencias. Este tablero baja a tierra el 🧭 Contexto Vivo y alimenta la 🤝 Orquestación, 🧪 Datos Sintéticos, 🧩 Integraciones (plan) y ☁️ Evidencias & Nube.

**Cuándo usarlo**  
Desde **Idea/Inicio** y re-ajústalo a diario. Manténlo corto y accionable.

---

## Plantilla (rellena tú)

**Encabezado del día**  
- 🎯 **Objetivo del día**: {resultado concreto visible hoy}  
- 📈 **Indicadores** (2–3): {ej. “Contexto Vivo cerrado”, “Mapa agéntico mínimo listo”}  
- ⚠️ **Riesgos clave**: {top 2} y **mitigación** breve

### ✅ Hoy
- 👩‍💼 **PO/BA**: {decisiones de alcance/valor, handoffs a asistentes}  
- 🧑‍💻 **DEV**: {esqueleto/ajuste técnico, puntos del flujo del agente}  
- 🧪 **QA**: {plan/pruebas de humo, datos sintéticos mínimos, bitácora de evidencia}

### 🔜 Mañana
- 👩‍💼 **PO/BA**: {narrativa/criterios de éxito}  
- 🧑‍💻 **DEV**: {stub LLM(API key) y puntos MCP/A2A o despliegue nube}  
- 🧪 **QA**: {accesibilidad, offline→online, checklist J.1/J.2}

### ⏱️ Ritual diario (15 min) + Demo
1) **Objetivo** de hoy (1 frase)  
2) **Bloqueos** (máx. 2 por rol)  
3) **Acuerdos** (quién/qué/cuándo)  
4) **Demo breve** (lo visible hoy)

### 🤝 Acuerdos de colaboración
- Canal: {WhatsApp/Discord} · Horario: {franja} · Respuesta Máx.: {min}  
- **DoR** (Definition of Ready): {criterios para empezar una tarea}  
- **DoD** (Definition of Done): {criterios para darla por lista + evidencia}

### 📦 Entregables mínimos del día
- [ ] {artefacto 1}  
- [ ] {artefacto 2}  
- [ ] {evidencia (captura/URL/tabla)}  

> **Fallback si falta un rol**:  
> - Falta QA → PO/BA documenta criterios y DEV ejecuta humo mínimo.  
> - Falta PO/BA → DEV propone alcance y QA valida contra métricas.  
> - Falta DEV → PO/BA y QA dejan lista evidencia + handoffs para retomar.

---

## Ejemplo general (agnóstico, edítalo o bórralo)

**Encabezado del día**  
- 🎯 Objetivo: Cerrar 🧭 Contexto Vivo y dejar **Mapa agéntico mínimo** (LLM/API key, MCP y A2A ubicados en el flujo).  
- 📈 Indicadores: 1) Plantilla de Contexto Vivo completa; 2) Diagrama ASCII del flujo con puntos de integración; 3) Lista de evidencias inicial.  
- ⚠️ Riesgos: scope excesivo; conectividad baja → **Mitigación**: 1 flujo crítico + modo offline básico.

### ✅ Hoy
- 👩‍💼 **PO/BA**: Prioriza un solo flujo de usuario, define métricas (3–5) y redacta prompts para **Quiliano** y **Leonardo**.  
- 🧑‍💻 **DEV**: Monta esqueleto (landing/tablero/reto), y marca en el código **puntos de hook**: `LLM()` antes de enviar reto; `MCP()` para glosario; `A2A()` revisor de claridad.  
- 🧪 **QA**: Diseña plan de humo (3 casos) y setup de **bitácora de evidencia** (tabla Markdown).

### 🔜 Mañana
- 👩‍💼 **PO/BA**: Narrativa de valor + criterios de éxito en 3 bullets.  
- 🧑‍💻 **DEV**: Stub de **LLM(API key)** y endpoints de prueba para **MCP/A2A**; preparar despliegue nube.  
- 🧪 **QA**: Pruebas accesibilidad (teclado/lector) y **offline→online**.

### ⏱️ Ritual (15 min) + Demo
Objetivo → Bloqueos → Acuerdos → Demo del mapa agéntico y del esqueleto corriendo.

### 📦 Entregables mínimos
- [ ] `contexto_vivo.md` completo  
- [ ] Diagrama ASCII del flujo con LLM/MCP/A2A  
- [ ] Bitácora de evidencia creada

---

## Ejemplo mínimo (ultracorto)

**Hoy**  
- 👩‍💼 PO/BA: Cerrar problema/usuario/resultado + métricas.  
- 🧑‍💻 DEV: Esqueleto + marcar dónde va LLM/MCP/A2A.  
- 🧪 QA: Plan de humo + tabla de evidencias.

**Mañana**  
- 👩‍💼 PO/BA: Handoffs listos (Quiliano/Leonardo).  
- 🧑‍💻 DEV: Stub LLM(API key), preparar nube.  
- 🧪 QA: Accesibilidad + offline→online.

**Demo**: mostrar 1 pantalla, 1 diagrama, 1 checklist.
