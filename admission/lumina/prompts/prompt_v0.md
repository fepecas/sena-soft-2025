# prompt V0 dev Vercel

En esta sección se encuentra el prompt principal y más sustancioso, el cual es el prompt base para la construcción del prototipo funcional por V0.

Prompt:

PROMPT FINAL – LUMINA: El Tutor Educativo Proactivo
Genera una Single Page Application (SPA) educativa llamada LUMINA, construida con React + TypeScript, con una interfaz que simula una experiencia de aplicación nativa. La aplicación debe estar optimizada para dispositivos de gama baja y conexiones inestables, priorizando la velocidad de carga y el rendimiento offline. La experiencia del usuario está guiada por un tutor de inteligencia artificial personal y proactivo.


Fundamentos Técnicos y Estilo

- Framework: React con TypeScript (.tsx), siguiendo una arquitectura modular.
- Estado: Gestión de estado con useState y useContext. Sin Redux.
- Estilos: Tailwind CSS (clases utilitarias puras) y CSS en JS para componentes dinámicos. Diseño responsive que se adapta a móviles y tablets.
- UI: Material 3 Design (Button, Card, Sheet, Typography, BottomNavigation, Chip). Componentes accesibles y táctiles.
- Animaciones: Framer Motion para transiciones suaves, efectos de entrada/salida y animaciones de "escribiendo..." y carga.
- Persistencia: localStorage para guardar el estado del usuario, progreso, diagnóstico, configuración y contenido para uso offline.
- Diseño: Mobile-first, vertical, con un layout flexible que se adapta a tablets (hasta 768px).
- Fuentes: font-family: system-ui, -apple-system, sans-serif; para una carga instantánea.
- Modos: Modo Oscuro Adaptativo Funcional que cambia con la configuración del sistema, con un toggle manual en el perfil.
- Colores: Paleta vibrante y amigable que combina tonos de azul, púrpura y amarillo (dorado). Por ejemplo: primary: #6366F1 (Índigo), secondary: #F59E0B (Ámbar), accent: #A855F7 (Púrpura).


Flujo de Usuario Detallado

1. Splash Screen y Bienvenida
- Pantalla de Carga (SplashScreen.tsx): Un logo de LUMINA animado con un degradado suave. Texto inferior que indica "Optimizando para tu conexión..." o "Preparando tu experiencia...".
- Pantalla de Bienvenida (Welcome.tsx): Avatar de LUMINA en el centro, con una animación de entrada. Título grande: “Bienvenido a tu camino de aprendizaje”. Botón principal animado con Framer Motion: “Continuar”.

2. Autenticación (Auth.tsx)
- Validación de Usuarios Mejorada: Se debe evitar el registro si el usuario no tiene una cuenta. La interfaz debe tener campos para "Correo" y "Contraseña", y un solo botón que diga "Iniciar Sesión". Si el usuario no tiene una cuenta, un mensaje de error claro debe aparecer. La única forma de iniciar es con una cuenta ya preexistente, simulando un sistema de registro cerrado.
- Flujo: El usuario existente es redirigido al Dashboard.
- Notificaciones: Toasts animados (Notification.tsx) para mensajes como "Error de autenticación: la cuenta no existe" o "Credenciales inválidas".

3. Diagnóstico Inicial – Interfaz Conversacional Inteligente (Diagnosis.tsx)
- Chat UI que simula una conversación con LUMINA, con burbujas animadas y el avatar del usuario.
- LUMINA guía la conversación con un tono cercano y motivador.
- Preguntas Clave (máximo 10):
    - Nivel académico (primaria, secundaria, universidad, autodidacta).
    - Estilo de aprendizaje (visual, auditivo, kinestésico).
    - Materias de interés (ej. matemáticas, ciencias, historia). La IA debe basar el contenido futuro en esta selección.
    - Objetivos de aprendizaje (ej. "pasar un examen", "aprender algo nuevo", "mejorar mis notas").
    - Hábitos de estudio (ej. "cuánto tiempo estudias").
- Mecanismos de Interacción:
    - Chips de respuestas predefinidas: Facilitan la interacción y agilizan el flujo.
    - Campo de texto opcional para respuestas personalizadas.
- Validación Lógica: LUMINA debe validar si las respuestas son coherentes antes de avanzar.
- Al finalizar: El diagnóstico se guarda en localStorage y se redirige al Dashboard. Se muestra un toast con el mensaje "¡Diagnóstico completado!".


Dashboard Principal (Dashboard.tsx)

- Saludo personalizado: "¡Hola, [Nombre]!" seguido de un mensaje motivador.
- Tutoriales Guiados (LUMINA Tips): Después del primer inicio de sesión, un carrusel de cards animadas con ilustraciones lineales. Cada card explica una función clave de la app (ej. "Tu Plan de Estudio", "Lecciones Offline", "Tutor 24/7").
- Plan de Estudio Adaptativo: Sección principal que muestra el último tema trabajado y el progreso. Incluye un botón central y grande: “Empezar Lección” con un efecto de brillo animado.
- Sección de Contenido Offline: Card con un icono de descarga y un mensaje como "Tienes 2 lecciones descargadas. ¡Aprende sin internet!".
- Navegación Inferior (BottomNav.tsx):
    - Dashboard (icono de inicio)
    - Progreso (icono de gráfico)
    - Grupos de Estudio (icono de personas)
    - Perfil (icono de usuario)
    - Icono central de LUMINA para iniciar una conversación rápida.


Sesión de Aprendizaje – Tutor Inteligente (Lesson.tsx)
- Chat UI tipo WhatsApp con burbujas de conversación animadas.
- Funcionalidades Clave:
    - Indicador de Avance: Un porcentaje visible en la parte superior que muestra el progreso de la lección actual. Este porcentaje se actualiza en tiempo real a medida que el usuario interactúa.
    - Guardado Automático: El progreso de la lección se guarda automáticamente en localStorage al salir de la vista.
- Comportamiento de LUMINA:
    - Genera contenido en tiempo real (con lógica predefinida) basado en el diagnóstico inicial y la materia seleccionada.
    - Se ajusta al tono del usuario: Si el usuario usa un lenguaje informal, LUMINA responde de forma cercana.
    - Detección de Inactividad y Frustración: Si el usuario se detiene, LUMINA envía un mensaje proactivo como "¿Necesitas un empujón?" o "¿Quieres que te explique de otra forma?".
    - Sugerencias Rápidas (QuickReply.tsx): Chips con frases útiles como "Dame un ejemplo", "Explícamelo de nuevo", "Pregúntame algo", "Quiero un ejercicio".
    - Microevaluación: Cada 3 lecciones, la IA propone 3 preguntas cortas para evaluar el entendimiento.


Vista de Progreso (Progress.tsx)
- Actualización de Métricas: Todos los logros y las horas de estudio deben actualizarse de manera funcional y visualmente representativa.
- Métricas de Progreso:
    - Gráfico Radial o de Dona para el porcentaje de dominio de un tema.
    - Gráfico de Barras para el tiempo de estudio semanal.
    - Indicadores de Habilidad: "Temas dominados", "Habilidades adquiridas".
- Sección de Logros: Cards animadas que muestran logros desbloqueados (ej. "¡Terminaste tu primera lección!", "¡Aprendiz de la semana!"). Los logros se actualizan al completar hitos.
- Botón “Compartir Progreso”: Genera una vista estilizada y lista para compartir de las métricas principales (gráficos, logros) para ser enviada a los grupos de estudio o redes sociales.


Grupos de Estudio (Groups.tsx)
- Funcionalidad Mejorada:
    - Listado de Grupos: Muestra los grupos a los que pertenece el usuario.
    - Crear y Unirse: Botones para "Crear un nuevo grupo" y "Unirse a un grupo".
    - Envío de Mensajes: Al entrar en un grupo, se muestra una interfaz de chat donde el usuario puede enviar mensajes y ver los mensajes de otros miembros (simulados).
    - Visualización de Miembros: Se puede ver la lista de miembros del grupo.
    - Opción de Salida: Un botón claro para "Salir del grupo".
    - Compartir Progreso en Grupo: Desde la vista de progreso, el usuario puede seleccionar un grupo para enviar su progreso de forma visual.


Contenido Offline (OfflineContent.tsx)
- Visualización de Contenido Descargado: Si el usuario está offline, debe poder acceder a la sección de "Contenido Offline" desde el Dashboard.
- Interfaz: Una lista de "Paquetes de Aprendizaje Descargados". Al seleccionar uno, se abre una vista de solo texto con un diseño limpio y agradable, mostrando la información del curso. Esto demuestra la funcionalidad de aprendizaje sin conexión.


Pantalla de Perfil (Profile.tsx)
- Cerrar Sesión Funcional: Un botón visible y con una animación de salida que borra el estado de la sesión y redirige a la pantalla de Autenticación.


Avatar del usuario editable (AvatarSelector.tsx).
- Información Básica: Nombre y correo electrónico.


Menú de Configuración (Settings.tsx):
- Tema: Toggle para cambiar entre modos (Claro / Oscuro).
- Idioma: Switch para cambiar entre Español (ES) e Inglés (EN). (Simulado: al cambiar, los textos de los botones y la UI se actualizan, mostrando el potencial de internacionalización).
- Animaciones: Toggle para activar/desactivar Framer Motion.
- Reiniciar Diagnóstico: Botón que borra el progreso y el diagnóstico en localStorage.
- Borrar Todo: Botón de "Reset Total" que limpia todo localStorage.