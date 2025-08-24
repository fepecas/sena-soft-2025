# Prompts STITCH AI
En esta sección, se encuentra los prompts que se le han pasado a STITCH AI para la creación de wireframes.

- prompt:

Diseña una app móvil educativa llamada *LUMINA, que actúa como un tutor personalizado con inteligencia artificial. Todo debe estar en **idioma español, tanto el texto visible como los placeholders, botones, notificaciones y cualquier mensaje. No debe haber nada en inglés. 

🎨 ESTILO GENERAL 
- Visual moderno, limpio y enfocado en experiencia tipo app nativa (SPA). - Mobile-first. - Animaciones suaves (entrada, transición de vistas, hover). - Paleta de colores basada en **OKLCH: tonos vibrantes (azul, morado, amarillo) compatibles con **modo oscuro y claro. - Tipografías similares a **GeistSans* y *GeistMono*. - Interfaz accesible y táctil. 

📲 FLUJO Y ESTADOS PRINCIPALES 
- SplashScreen: animada, pasa automáticamente a pantalla de bienvenida. 
- Welcome: presentación con CTA “Comenzar”. 
- Auth: login y registro. Validaciones visuales. Campos en español. Demo user visible solo en login. 
- Diagnosis: preguntas tipo test para adaptar la experiencia. 
- Dashboard: resumen del progreso y acceso a lecciones, grupos, logros. 
- Lesson: pantalla de tutor conversacional tipo chat IA. 
- Progress: vista de estadísticas, porcentaje, tarjetas de logros. 
- Groups: ver grupos, unirse, salir, enviar progreso. 
- Profile: selector de avatar animado, datos del usuario. 
- Settings: modo oscuro, cerrar sesión, ajustes generales. 

🔘 NAVEGACIÓN INFERIOR 
- Fija al fondo en móviles. 
- Íconos: Inicio, Lecciones, Progreso, Grupos, Perfil, Configuración, Chat. 
- Que cambien de estilo al estar activos (resaltado o sombreado). 
- Íconos simples tipo Lucide. 

🏆 COMPONENTES CLAVE 
- AchievementCard: 
    - Ícono dentro de un círculo con gradiente. 
    - Título, descripción (máx. 2 líneas), fecha de desbloqueo. 
    - Badge según rareza (común, rara, épica, legendaria), cada una con color diferente. 
    - Badge de “¡Nuevo!” arriba a la derecha con animación si aplica. 
    - Fondo animado de brillo si el logro es nuevo. 
- AvatarSelector: 
    - Modal centrado con fondo oscuro translúcido. 
    - Tarjeta con título “Elige tu Avatar”. 
    - Avatares de colores con inicial “U”. 
    - Borde resaltado cuando se selecciona uno. 
    - Botones “Cancelar” y “Guardar” abajo. 
    
🧠 ESTADO Y LÓGICA 
- Usa lógica de navegación por estado: 
    - Si no está autenticado → login. 
    - Si no ha hecho diagnóstico → pantalla de diagnóstico. 
    - Si ya pasó todo → dashboard con navegación inferior. 
- Todo controlado con algo similar a un AppContext. 

⚙ EXTRAS 
- Scroll personalizado.
- Interacción táctil con feedback (hover, tap, focus). 
- Accesibilidad visual: focus-visible, outline, etc. 
- Nada debe estar en inglés. Todos los textos, labels, botones y placeholders deben estar en *español latino neutro*. 

📦 TECNOLOGÍAS INSPIRADORAS 
- Inspirado en React + Tailwind CSS + Framer Motion. 
- Que Stitch genere vistas compatibles con esa estructura, pero puedes usar tu propia lógica mientras conserve la apariencia y experiencia móvil-first.