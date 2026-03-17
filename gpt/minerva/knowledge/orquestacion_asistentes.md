# Orquestación con los Asistentes — Cómo usarla, Plantilla y Ejemplos

**Para qué sirve**  
Centraliza **handoffs listos para pegar** a los asistentes del ecosistema (Quiliano, Magnus, Leonardo, Ada, Eleanor y Alan). Con esto el equipo alinea ideación, roles, cumplimiento de lineamientos, decisiones de stack y verificación de integraciones.

**Cuándo usarla**  
Después de tener un borrador de 🧭 **Contexto Vivo** y (si aplica) el 👥 **Tablero Three Amigos**. Puedes volver aquí en cualquier etapa para regenerar handoffs con el contexto más reciente.

---

## Plantilla (rellena y pega)

> Rellena los corchetes `{…}` con tu caso. Puedes pedir uno o varios handoffs a la vez.

### Quiliano — Casos de negocio y valor
**Cuándo acudir**: Para cristalizar “dolor → solución → éxito” y validar foco de usuario.  
**Prompt base**  
“Quiliano, usuarios: {usuarios_clave}. Contexto: {problema_resumido}.  
Dame **2 casos** ‘dolor→solución→éxito’ para {tipo_de_producto} con **agente** que {rol_del_agente}, en **{tiempo_limite}**.  
Incluye métrica de éxito por caso y supuestos.”

### Magnus — Roles, responsabilidades y riesgos
**Cuándo acudir**: Para repartir trabajo en modo Three Amigos.  
**Prompt base**  
“Magnus, stack: {stack_principal}. Etapa: {etapa}.  
Define responsabilidades por rol (**PO/BA, DEV, QA**) y los **3 riesgos** técnicos principales con mitigaciones para lograr {objetivo_tecnico}.”

### Leonardo — Cumplimiento de lineamientos
**Cuándo acudir**: Para validar requisitos obligatorios y evitar inventar reglas.  
**Prompt base**  
“Leonardo, verifica que este plan cumple: **LLM (API key)** en {punto_flujo_llm}, **MCP** para {capacidad_mcp} y **A2A** para {objetivo_a2a} **dentro del flujo**.  
Revisa también **nube accesible**. ¿Qué **evidencias** me faltan para **J.1/J.2/K**?”

### Ada — Stack, herramientas y despliegue
**Cuándo acudir**: Para tomar decisiones pragmáticas de tech y nube.  
**Prompt base**  
“Ada, con {stack_principal} y {restricciones_conectividad/accesibilidad}, sugiere:  
1) arquitectura mínima, 2) herramientas, 3) pasos para publicar en **nube accesible**, 4) **1 automatización** simple (n8n/Make/Zapier) que conecte eventos clave del flujo.”

### Eleanor — Narrativa de producto
**Cuándo acudir**: Para articular valor y claridad en la demostración.  
**Prompt base**  
“Eleanor, arma un **minipitch** de 90–120 s que explique: problema → cómo decide el **agente** → evidencia de valor → próximo paso.  
Incluye 3 preguntas típicas del jurado y cómo responderlas.”

### Alan — Verificación técnica (integraciones y tokens)
**Cuándo acudir**: Para chequear MCP/A2A/LLM y trazas de uso.  
**Prompt base**  
“Alan, necesito un **checklist** rastreable para:  
- **LLM (API key)** en {punto_flujo_llm}  
- **MCP** consumiendo {capacidad_mcp}  
- **A2A** con {objetivo_a2a}  
- (Opcional) tabla ejemplo de **tokens USD** por escenario.  
Devuélvelo en pasos verificables + evidencia esperada.”

---

## Ejemplo general (agnóstico, edítalo o bórralo)

**Contexto breve**: Producto **PWA** con **agente tutor** que ayuda a mejorar prompts en 2 iteraciones; usuarios en conectividad 2G/3G con necesidades de accesibilidad.

- **Quiliano**  
“Quiliano, usuarios: aprendices SENA con 2G/3G y lector de pantalla. Contexto: aprenden IA con un agente tutor.  
Dame **2 casos** ‘dolor→solución→éxito’ para una **PWA** que mejora prompts en **3 días**. Incluye una **métrica de éxito** por caso.”

- **Magnus**  
“Magnus, stack: React/Next.js + TypeScript; opcional FastAPI. Etapa: Diseño.  
Define tareas por rol (PO/BA, DEV, QA) y **3 riesgos** con mitigaciones para lograr **PWA accesible con modo offline**.”

- **Leonardo**  
“Leonardo, valida que el plan cumpla: **LLM (API key)** antes de enviar el reto; **MCP** para glosario/heurísticas; **A2A** revisor de claridad (1–5) **dentro del flujo**; y **nube accesible**.  
¿Qué evidencias nos faltan para **J.1/J.2/K**?”

- **Ada**  
“Ada, con Next.js y restricciones 2G/3G + accesibilidad, sugiere arquitectura mínima, herramientas, **pasos de despliegue** (Vercel/Render/Firebase) y **1 automatización** sencilla para registrar intento→mejora→resultado.”

- **Eleanor**  
“Eleanor, arma un **minipitch** (90–120 s) con: problema, rol del **agente** y evidencia de valor; agrega 3 preguntas y respuestas tipo jurado.”

- **Alan**  
“Alan, dame un **checklist** para verificar LLM/MCP/A2A y una **tabla ejemplo** de tokens USD por escenario (si aplica), con evidencia esperada.”

---

## Ejemplo mínimo (ultracorto)

- **Quiliano**: “Usuarios: {usuarios}. Da 2 casos ‘dolor→solución→éxito’ para {producto} con agente en {tiempo}.”  
- **Magnus**: “Stack: {stack}. Roles y 3 riesgos con mitigación para {objetivo}.”  
- **Leonardo**: “Check de **LLM(API key)** en {punto}, **MCP** {capacidad}, **A2A** {objetivo} en el **flujo** y **nube**; faltantes para **J.1/J.2/K**.”  
- **Ada**: “Arquitectura mínima + pasos de despliegue en nube + 1 automatización simple.”  
- **Eleanor**: “Minipitch 90–120 s + 3 preguntas y respuestas.”  
- **Alan**: “Checklist verificable LLM/MCP/A2A + tabla ejemplo de tokens (si aplica).”

> **Nota**: Estos prompts son orientativos. Ajusta el tono y el detalle al estado real del proyecto. Si prefieres minimalismo, deja solo la **Plantilla**.
