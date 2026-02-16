# Flujo de usuario — TrixAI

**Resumen breve**  
Documento que describe el flujo de usuario para el prototipo **TrixAI**, con base en los archivos de diseño y propuesta subidos y en la revisión del video proporcionado.

**Fuentes utilizadas:** propuesta, diseño y contextualización. fileciteturn1file3 fileciteturn1file1 fileciteturn1file0

---

## Actores
- Usuario autenticado (médico, enfermero, administrativo, auxiliar).  
- TrixAI (asistente conversacional/guía).  
- Sistema/herramientas internas (bases de datos, historial clínico, inventario).

---

## Flujo principal (happy path)
1. **Inicio / Login**
   - El usuario inicia sesión en la plataforma y TrixAI saluda: *"Hola 👋, soy TrixAI..."* . 
2. **Selección de rol / Pantalla Home**
   - Se muestran tarjetas de rol (Médico, Enfermero, Administrativo, Auxiliar) para personalizar la experiencia.
3. **Cuestionario inicial**
   - TrixAI solicita nombre, rol y contexto de la tarea (¿qué procedimiento o sistema está usando?). Esto permite definir permisos y adaptar la guía. 
4. **Generación de guía contextual**
   - Con la información, TrixAI construye una guía paso a paso basada en la base de conocimiento institucional. 
5. **Ejecución guiada**
   - El usuario sigue pasos ordenados (checklist tipo tarjeta). Al finalizar cada paso, TrixAI pregunta si hay dudas o errores; en caso afirmativo, ofrece correcciones. 
6. **Detección y corrección en tiempo real**
   - El sistema detecta inconsistencias en consignaciones y sugiere acciones correctivas y buenas prácticas. 
7. **Finalización**
   - Al completar la guía sin errores, TrixAI felicita al usuario, ofrece guardar la guía y genera resumen + log del proceso. 
---

## Flujos alternativos (errores y escalaciones)
- **Error en un paso:** TrixAI ofrece instrucciones de corrección, registra el incidente y, si no hay solución, escala a soporte humano. fileciteturn1file6  
- **Información insuficiente:** TrixAI solicita más datos antes de continuar (no inventa protocolos).  
- **Acceso no autorizado:** si el rol no permite la acción solicitada, TrixAI deniega acceso y guía al usuario sobre la vía correcta. 

---

## Pantallas / Componentes clave (según design_prompt) 
- **Home / Tarjetas de rol** (tarjetas grandes, iconos). 
- **Cuestionario inicial** (modal o pantalla previa a la guía).  
- **Chat asistido / Panel lateral** (burbujas para IA/usuario). 
- **Checklist interactivo** con verificación por paso y botón "Siguiente". ✅   
- **Pantalla de finalización** con opciones: guardar guía, volver al inicio. 

---

## Permisos, seguridad y logs
- **Control por rol:** toda acción sensible requiere verificación de permisos.   
- **Registro de incidentes:** cada corrección y error detectado se guarda en un log para análisis y mejora continua. 

---
