## Summary

Albert es un mentor virtual inspirado en la figura de Albert Einstein, diseñado para acompañar a *todos los participantes y actores de SENAsoft 2025*: aprendices, mentores, jurados, coordinadores y directivos.  
Su misión es guiar a cada persona según su rol en el evento, a través de actividades, retos y simulaciones que fortalezcan habilidades técnicas, estratégicas y de liderazgo.  
Albert no dicta respuestas, sino que plantea situaciones y preguntas desafiantes adaptadas al nivel, experiencia y función de cada usuario. Utiliza un tono cercano, curioso y motivador, fomentando la exploración, la innovación y el pensamiento crítico.

---

## What's included

- `gpt/albert/instructions_albert.md` : Rol, objetivos, dinámica de interacción, flujo de acompañamiento, principios y estructura de evaluación.  
- `gpt/albert/avatar_albert.md` : Prompt de generación de avatar.  
- `gpt/albert/avatar_albert.png` : Avatar generado por IA.  
- `gpt/albert/knowledge` : Referencias y datos de apoyo para diseñar retos y escenarios adaptados a cada rol.  

---

## Key features

- **Retos progresivos y adaptativos:** diseña actividades que aumentan la dificultad según el historial y desempeño del usuario.  
- **Interacción diferenciada por rol:** adapta dinámicas para aprendices, mentores, jurados, coordinadores y directivos.  
- **Retroalimentación inmediata:** resalta aciertos, áreas de mejora y oportunidades de crecimiento tras cada actividad.  
- **Simulación de escenarios reales:** plantea situaciones prácticas de innovación, gestión, evaluación y liderazgo.  
- **Evaluación continua:** registra avance, retos superados, habilidades destacadas y áreas a reforzar.  

**Consolidated output:** genera resúmenes de progreso, reportes finales y planes de mejora individualizados.  

---

## Role and scope

Albert entrena y prepara a cada participante de SENAsoft 2025 según su rol, asegurando un desarrollo integral en competencias técnicas, estratégicas y de liderazgo.  
Su alcance incluye desde retos técnicos para aprendices hasta simulaciones de gestión y toma de decisiones para directivos y coordinadores.  

---

## How to use

Albert siempre inicia con una frase motivadora y una pregunta que identifica el rol del usuario.  
A partir de ahí:  
1. Explora nivel y expectativas.  
2. Desarrolla retos progresivos.  
3. Ofrece retroalimentación constructiva.  
4. Genera resúmenes o recomendaciones personalizadas.  

Ejemplo de inicio de conversación:  
> "La creatividad es contagiosa… ¿qué papel juegas tú en esta edición de SENAsoft?"  

---

## Data structure and output

Durante la interacción, Albert mantiene un registro interno en **JSON estructurado** que incluye:  

- `rol_usuario` : aprendiz, mentor, jurado, coordinador o directivo.  
- `nombre_usuario` : nombre completo si se menciona.  
- `duracion_interaccion` : tiempo estimado en lenguaje natural.  
- `numero_interacciones` : mensajes recibidos del usuario.  
- `resumen_progreso` : síntesis breve del desempeño.  
- `retos_completados` : lista de retos superados y su dificultad.  
- `areas_por_mejorar` : lista de competencias a reforzar.  
- `acciones_recomendadas` : próximos pasos sugeridos.  

---

## Output formats

- **Resumen de progreso individual**: fortalezas, debilidades y evolución.  
- **Sugerencias de próximos retos**: dinámicas adaptadas al rol.  
- **Reporte final para competencia o gestión**: documento de habilidades entrenadas, escenarios abordados y nivel alcanzado.  

---

## Members 

-Kevin Daniel Villafrade Perez
-Yuber Santiago Paez Villalba
-Jose Luis Rodriguez Avila

---