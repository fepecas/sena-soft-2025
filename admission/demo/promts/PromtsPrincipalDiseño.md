
## TUTOR IA
## PROMT PRINCIPAL
**Promt Usado en V0.dev**
Quiero que esta aplicación use la interfaz que diseñé en Figma.
Aquí está el enlace: https://www.figma.com/design/CL53R8yttTWa7xFgXDxMJT/Untitled?node-id=0-1&m=dev&t=vccrr93FyRty2i6t-1 
Adáptala para que sea funcional:
- Los botones deben tener acciones reales (login, registro, chat).
- Los formularios deben guardar la información en JSON.
- Los menús laterales deben navegar entre pantallas.
- El diseño debe mantenerse igual al de Figma. colores tipo de letra todo 
### Título: "Tutor IA - Asistente de Aprendizaje Personalizado"
### Descripción:
Aplicación web educativa donde un estudiante puede interactuar con un tutor de inteligencia artificial.  
El tutor ofrece apoyo académico, seguimiento del progreso, generación de ejercicios, explicación de temas difíciles y recomendaciones de estudio personalizadas.  
El enfoque principal es ayudar a los estudiantes de secundaria y universidad a mejorar sus resultados y organizar su tiempo de estudio.

---

### Funcionalidades principales:

1. **Chat Inteligente con el Tutor IA**
   - El alumno puede hacer preguntas de cualquier materia (matemáticas, inglés, ciencias, historia, etc.)
   - Respuestas claras, con ejemplos y explicaciones paso a paso.
   - Soporte para preguntas abiertas o ejercicios específicos.

2. **Generador de Ejercicios y Exámenes**
   - El tutor crea preguntas tipo quiz, opción múltiple y ejercicios prácticos.
   - Retroalimentación inmediata con explicación de las respuestas.
   - Banco de preguntas generado dinámicamente.

3. **Planificador de Estudio Inteligente**
   - El estudiante ingresa metas de aprendizaje.
   - El sistema sugiere un cronograma de estudio personalizado.
   - Recordatorios automáticos para cumplir con las metas.

4. **Seguimiento de Progreso**
   - Estadísticas de avance en cada materia.
   - Reportes semanales de tiempo de estudio, nivel de aciertos y áreas de mejora.
   - Gráficos dinámicos de rendimiento.

5. **Recursos Recomendados**
   - Sugerencias de videos, artículos, ejercicios externos y simuladores.
   - Filtrado según la dificultad y el tiempo disponible del estudiante.

6. **Modo Examen / Práctica**
   - Simulación de evaluaciones con límite de tiempo.
   - Resultados y análisis inmediato.
   - Comparativa con intentos anteriores.

---

### Interfaz esperada (UI/UX):

- **Pantalla principal (Dashboard del Estudiante)**
  - Bienvenida personalizada con nombre del estudiante.
  - Botón principal: "Preguntar al Tutor IA".
  - Tarjetas rápidas con:
    - Progreso semanal 📊
    - Próximos recordatorios ⏰
    - Últimos recursos recomendados 📚

- **Chat Tutor IA**
  - Caja de entrada para escribir preguntas.
  - Respuestas del tutor con texto, ejemplos y pasos.
  - Botones rápidos: "Explicar más simple", "Dame un ejemplo extra", "Generar ejercicio".

- **Sección Planificador**
  - Calendario interactivo.
  - Botón “Agregar meta”.
  - Lista de recordatorios y sugerencias de horarios.

- **Sección Estadísticas**
  - Gráfico de barras para progreso por materia.
  - Gráfico circular para tiempo invertido.
  - Línea de tendencia de aciertos.

---

### Estructura del Dashboard:

- Barra lateral con secciones:
  - Inicio 🏠
  - Tutor IA 🤖
  - Planificador 📅
  - Progreso 📊
  - Recursos 📚
  - Configuración ⚙️

- Sección central dinámica que cambia según la opción seleccionada.
- Estilo visual minimalista, colores claros, tipografía legible.

---

### Datos en JSON simulados (para pruebas):

{
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "nivel": "Secundaria",
    "metas": ["Mejorar matemáticas", "Practicar inglés 30 min/día"]
  },
  "progreso": {
    "matematicas": 70,
    "ingles": 50,
    "ciencias": 80,
    "historia": 65
  },
  "recordatorios": [
    {"fecha": "2025-08-24", "tarea": "Practicar 10 ejercicios de álgebra"},
    {"fecha": "2025-08-25", "tarea": "Leer un artículo en inglés"}
  ],
  "recursos": [
    {"materia": "Matemáticas", "tipo": "video", "titulo": "Ecuaciones paso a paso"},
    {"materia": "Inglés", "tipo": "quiz", "titulo": "Vocabulario básico de viajes"}
  ]
}

---



