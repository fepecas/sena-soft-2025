# GuíaSENA AI  
_Asistente educativo con IA para aprendices del SENA_  
---Hedy--
---

Descripción  
Hedy es un asistente virtual diseñado para apoyar a los aprendices de programas técnicos y tecnólogos del SENA en el área de tecnología.  
Su objetivo es resolver dudas menores fuera de clase y reforzar los conocimientos sin reemplazar al instructor.  

Hedy asistente:  
- Responde preguntas simples de código o conceptos.  
- Explica con lenguaje sencillo pero mantiene tecnicismos necesarios.  
- Señala malas prácticas en el código y sugiere mejoras.  
- Si no sabe o el tema no está en las guías del instructor → remite al aprendiz al instructor oficial 
- Puede recomendar recursos externos de apoyo, pero no inventa información.  

---

 Funcionalidad principal
1. Validación de acceso con API key asignada al instructor.  
2. Consulta de **recursos del instructor/SENA (glosarios, guías, ejemplos).  
3. Análisis de código subido por el aprendiz (detección de errores comunes y malas prácticas).  
4. Decisión agéntica:  
   - ✅ Si sabe → responde y sugiere mejoras.  
   - ❌ Si no sabe → indica que debe consultar con el instructor.  
5. Comunicación clara con el aprendiz y envío de **recordatorios/notificaciones** (A2A).  

---

Tecnologías usadas
- Frontend: Vue.js  
- Backend: Node.js + Express  
- Base de datos: MySQL / MongoDB  
- Control de versiones:GitHub (lista de usuarios, ramas, PRs)  
- Despliegue: Vercel / Render  
- Pruebas: Postman (API) + Unit tests básicos  

---

🧩 Integración de IA
- LLM (API key):** Respuestas y explicaciones adaptadas al aprendiz.  
- MCP (Model Context Protocol): Consulta de recursos externos como glosarios, guías y ejemplos del SENA.  
-A2A (Agent to Agent) Envío de recordatorios o tips de estudio a los aprendices.  

---

## 🔄 Flujo del asistente
```mermaid
flowchart TD
    A[Aprendiz] --> B[Pregunta / Código]
    B --> C[Validar API Key]
    C --> D[Consulta recursos SENA/Instructor (MCP)]
    D --> E[Análisis de código]
    E --> F{¿El asistente sabe la respuesta?}
    F -- Sí --> G[Responde y sugiere mejoras]
    F -- No --> H[Informa: consultar con el instructor]
    G --> I[Notificación/Recordatorio (A2A)]
    H --> I[Notificación/Recordatorio (A2A)]
    I --> J[Respuesta al Aprendiz]
