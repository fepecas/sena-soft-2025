# ⚙️ Funcionalidad Técnica de "Alivio"

## 🌟 Descripción general
**Alivio** es un agente conversacional con IA diseñado para brindar primeros auxilios emocionales de forma empática, ética y segura.  
Además de acompañar en el presente, Alivio permite crear **recordatorios y metas motivacionales** que el usuario podrá recuperar cuando lo necesite, funcionando como un apoyo emocional en momentos difíciles o alegres.

---

## 🛠️ Arquitectura propuesta
- **Frontend**  
  - Interfaz tipo chat para web y móvil.  
  - En una primera versión puede implementarse como **aplicación web ligera** (ej. HTML, CSS, JS) y en fases futuras migrar a **React**.  
  - Diseño amigable, accesible y centrado en la experiencia del usuario.  

- **Backend**  
  - Puede implementarse en **Python + FastAPI** o en **PHP (nativo o con Laravel)** 
  - Manejo de rutas para chat, generación de música y recursos externos.  
  - Seguridad básica en MVP (control de sesiones simples). En una versión escalable, uso de JWT u otros mecanismos.  

- **IA (Inteligencia Artificial)**  
  - **Modelos de Lenguaje (LLM):** integración con la API de OpenAI (ej. GPT-4o mini) para generar respuestas empáticas y contextuales.  
  - **Música generada por IA:** conexión con modelos como MusicGen o Riffusion para crear melodías según el estado emocional detectado.  
  - Flujo básico: el backend recibe la solicitud → genera el audio con IA → entrega un archivo `.mp3` reproducible en la interfaz.  

- **Base de datos**  
  - El MVP inicial puede funcionar **sin base de datos** ya que no se almacenan conversaciones.  
  - Una BD ligera (ej. SQLite) puede usarse para guardar configuraciones internas o recursos predefinidos (frases motivadoras).  
  - En una versión ampliada se puede usar MySQL o MongoDB, siempre evitando datos sensibles.  

---

## 🔑 Funcionalidades detalladas

1. **Chat empático con IA**  
   - Respuestas naturales, humanas y cálidas.  
   - Prompt engineering y context engineering para asegurar coherencia.  

2. **Ejercicios de respiración y relajación**  
   - Instrucciones guiadas paso a paso.  
   - Integración con recursos visuales (ej: animaciones en frontend).  

3. **Generación de música con IA 🎶**  
   - Clasificación del estado emocional del usuario: ansiedad, tristeza, motivación.  
   - Generación de música en tiempo real con modelos de IA.  
   - Entrega como archivo `.mp3` o streaming para escuchar directamente desde la app.  

4. **Frases motivadoras y mensajes positivos**  
   - Selección aleatoria desde un dataset propio.  
   - Mezclado con contenido generado dinámicamente por el LLM.  

5. **Detección de urgencias 🚨**  
   - Palabras clave asociadas a riesgo.  
   - Activación de respuesta especial con enlaces a líneas de atención oficiales en Colombia.  

6. **Privacidad y ética**  
   - No se piden datos personales.  
   - Cumplimiento con los lineamientos del **CONPES 4144** sobre IA responsable.  

---

## 🧩 Posibles extensiones futuras
- Conexión a wearables (ej. smartwatches) para medir ritmo cardíaco y sugerir técnicas de relajación personalizadas.  
- Creación de playlists generadas por IA según estados de ánimo prolongados.
- Integración con servicios de teleorientación psicológica del SENA o con los asistentes Quiliano y Magnus.  
