# PlanBert: Asistente Educativo Multimodal

<p align="center">
  <img src="PlanBert.Profile.png" alt="PlanBert" width="320" height="320"/>
</p>

## Descripción General

**PlanBert** es un agente educativo que combina la explicación de conceptos con la práctica mediante retos personalizados.  
Su enfoque **multimodal** adapta las explicaciones al estilo de aprendizaje de cada usuario (**visual, auditivo o kinestésico**) y refuerza el conocimiento con desafíos progresivos que simulan problemas reales del área de estudio.

Si el aprendiz no logra superar un reto, el agente aplicará las llamadas **"penitencias de aprendizaje"**: microejercicios, trivias rápidas o mini proyectos adicionales que refuercen la competencia antes de avanzar.

---

## Funciones Principales

- 📚 **Explicaciones adaptadas** a distintos estilos de aprendizaje.  
- 🎯 **Retos graduados** según nivel y tema.  
- ⚡ **Retroalimentación inmediata** y sugerencias de mejora.  
- 📊 **Registro de progreso** y evaluación del usuario.  
- 🔄 **Penitencias interactivas** para afianzar lo no aprendido.

---

## Estructura del Proyecto

- **[PlanBert_Prompt.md](PlanBert_Prompt.md)**  
  Contiene las instrucciones base y reglas de interacción del asistente.

- **[planbert_metricas.schema.json](planbert_metricas.schema.json)**  
  Define el esquema de datos para almacenar métricas como penitencias, estilos de aprendizaje y niveles de conocimiento.

- **[PlanBert_Metrics_Guide.md](PlanBert_Metrics_Guide.md)**  
  Guía de integración para saber cómo y cuándo registrar las métricas, asegurando una experiencia personalizada.

- **Imagen del personaje**  
  Representación visual híbrida entre **Albert Einstein** y **Platón**, usada como identidad visual del asistente.

---

## Flujo de Trabajo del Asistente

1. **Identificar** el tema, nivel y estilo de aprendizaje del usuario.  
2. **Explicar** el contenido adaptado al estilo preferido.  
3. **Proponer** un reto práctico ajustado al nivel actual.  
4. **Evaluar** la respuesta del usuario.  
   - Si es correcta → Felicitar y subir el nivel de dificultad.  
   - Si es incorrecta → Aplicar penitencia de aprendizaje.  
5. **Registrar** el progreso en base a `planbert_metricas.schema.json`.  
6. **Repetir** el ciclo con retos progresivos.

---

## Créditos

- **Diseño del concepto y flujo**: Basado en metodología de aprendizaje adaptativo.  
- **Ilustración**: Imagen generada digitalmente con estilo semi-realista, combinando rasgos de Einstein y Platón.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## Integrantes de Grupo
-Jose Ali Zapata
-Miguel Santiago Velasquez Ramirez
-Nicolás Tamayo Jiménez

---

# PlanBert: Multimodal Educational Assistant

<p align="center">
  <img src="PlanBert.Profile.png" alt="PlanBert" width="320" height="320"/>
</p>

## General Description

**PlanBert** is an educational agent that combines concept explanations with practice through personalized challenges.  
Its **multimodal** approach adapts explanations to each user's learning style (**visual, auditory, or kinesthetic**) and reinforces knowledge with progressive challenges that simulate real-world problems in the field of study.

If the learner fails to overcome a challenge, the agent will apply so-called **"learning penalties"**: micro-exercises, quick quizzes, or small additional projects that strengthen the skill before moving forward.

---

## Main Features

- 📚 **Adapted explanations** for different learning styles.  
- 🎯 **Graded challenges** according to level and topic.  
- ⚡ **Immediate feedback** and improvement suggestions.  
- 📊 **Progress tracking** and user evaluation.  
- 🔄 **Interactive penalties** to reinforce unlearned content.

---

## Project Structure

- **[PlanBert_Prompt.md](PlanBert_Prompt.md)**  
  Contains the base instructions and interaction rules for the assistant.

- **[planbert_metricas.schema.json](planbert_metricas.schema.json)**  
  Defines the data schema for storing metrics such as penalties, learning styles, and knowledge levels.

- **[PlanBert_Metrics_Guide.md](PlanBert_Metrics_Guide.md)**  
  Integration guide explaining how and when to record metrics, ensuring a personalized experience.

- **Character image**  
  A hybrid visual representation between **Albert Einstein** and **Plato**, used as the assistant's visual identity.

---

## Assistant Workflow

1. **Identify** the topic, level, and learning style of the user.  
2. **Explain** the content adapted to the preferred style.  
3. **Propose** a practical challenge suited to the current level.  
4. **Evaluate** the user's response.  
   - If correct → Congratulate and increase the difficulty level.  
   - If incorrect → Apply a learning penalty.  
5. **Record** progress based on `planbert_metricas.schema.json`.  
6. **Repeat** the cycle with progressive challenges.

---

## Credits

- **Concept and workflow design**: Based on adaptive learning methodology.  
- **Illustration**: Digitally generated image in a semi-realistic style, combining the features of Einstein and Plato.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Group Members
- Jose Ali Zapata  
- Miguel Santiago Velasquez Ramirez  
- Nicolás Tamayo Jiménez  
