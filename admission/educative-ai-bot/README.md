# 📱 ¿Y si agendamos un 5.0?

Aplicación móvil educativa juvenil diseñada para ayudar a estudiantes de secundaria a organizar sus tareas y clases.  
Inspirada en tableros tipo **Trello**, con un estilo **moderno, fresco y colorido** (azul, verde, naranja), bordes redondeados, sombras suaves e íconos ilustrativos.  
Modo claro con toques de **glassmorphism**.

---

## 📂 Estructura de Carpetas

```bash
educative-ai-bot/
├── figma-maker/
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── vite.config.ts
│
├── links/
│   ├── figma-maker-link.txt
│   └── youtube-link.txt
│
├── prompt-figma/
│   └── prompt-specific.txt
│
├── prompt-web/
│   └── prompt-web.txt
│
└── readme.md
```

---

## 🎯 Público objetivo
Estudiantes de secundaria que necesitan organizar tareas y clases de forma visual y divertida.

## 🎨 Estilo
- Juvenil, alegre y vibrante (colores azul, verde, naranja).  
- Bordes redondeados y sombras suaves.  
- Íconos ilustrativos y tipografía clara.  
- Toques de **glassmorphism**.  
- Navegación siempre **vertical** para mayor naturalidad en móviles.  

---

## 🖼️ Pantallas y Componentes

### 🟢 Pantalla de inicio / Onboarding
- Nombre: **¿Y si agendamos un 5.0?**  
- Ilustración juvenil (estudiantes usando celular/cuaderno).  
- Botón principal degradado (azul-verde-naranja): **Comenzar**  
- Tres tarjetas horizontales con íconos:  
  - 📘 Organiza materias (azul)  
  - 🎯 Metas claras (verde)  
  - 🤝 Colabora (naranja)  
- Fondo con degradado vivo + glassmorphism.

---

### 🔑 Pantalla de Login / Sesión
- Campos: correo electrónico, contraseña.  
- Botón principal degradado: **Iniciar sesión**  
- Enlace: ¿Olvidaste tu contraseña?  
- Fondo ilustrado (estudiante con celular/cuaderno).  

---

### 🏠 Dashboard / Vista general
- Estilo tablero tipo **Trello** con columnas:  
  - 🔴 Urgente  
  - 🟠 Hoy  
  - 🟢 Próximas  
- Widget de calendario semanal en la parte superior:  
  - Permite moverse entre días y acceder a vista global.  
- Tareas organizadas en lista **vertical** (no scroll horizontal).  
- Tarjetas compactas con: título, asignatura (ícono), fecha límite, estado (✅ ❌).  
- Botón flotante **+ Agregar tarea**.  
- Cerrar sesión: botón pequeño junto al ícono de perfil.  
- Perfil accesible desde el ícono superior.

---

### ➕ Agregar tarea
- Campos: asignatura (lista con íconos), descripción, fecha límite (selector calendario).  
- Botón degradado: **Guardar tarea**.  
- Fondo ilustrado con estudiante escribiendo.

---

### 📌 Detalle de tarea
- Muestra asignatura, fecha límite (🔴/🟢), descripción.  
- Acciones:  
  - ✅ Marcar como completada (activa micro-quiz).  
  - ✏️ Editar tarea (abre pantalla de edición con datos precargados).  

---

### ✏️ Edición de tarea
- Campos precargados (asignatura, descripción, fecha).  
- Acciones:  
  - Guardar cambios (botón degradado azul-verde-naranja).  
  - Cancelar / volver.  
- Validaciones claras con mensajes de error.  

---

### 💡 Micro-quiz / Momento de reflexión
- Aparece tras completar una tarea.  
- Pregunta breve + espacio de respuesta.  
- Botón naranja: **Enviar respuesta**.  

---

### 🔔 Recordatorio inteligente
- Notificación emergente con ícono 🔔/⏰.  
- Texto motivacional: “¡No olvides tu próxima tarea de Matemáticas!”.  
- Botón brillante: **Iniciar ahora**.  

---

### 📅 Navegación inferior (Navbar)
- **Calendario** → vista global con todas las tareas organizadas por día y color.  
- **Materias** → lista de materias con ❌ o ✅ según tareas pendientes.  
- **Logros** → racha diaria tipo 🔥 y módulo de progreso.  

---

### 👤 Perfil del estudiante
- Foto/avatar circular (borde degradado).  
- Datos: nombre, colegio, grado, correo.  
- Racha de tareas completadas (🔥 streak).  
- Tarjetas estilo glassmorphism.  
- Botón para editar perfil.  

---

### 📘 Materias
- Lista vertical de materias con ícono, nombre y número de tareas.  
- Botón **+ Agregar materia** → formulario simple (nombre, ícono, color).  
- Se agrega a la lista y queda disponible para asignar tareas.  

---

## 🔑 Objetivo del diseño
Crear una aplicación juvenil, fresca y motivadora que:  
- Organice tareas y materias.  
- Permita iniciar sesión y gestionar un perfil.  
- Use navegación vertical intuitiva.  
- Motive con logros y recordatorios.  
- Active un **micro-quiz** tras completar tareas.  
- Mantenga un estilo moderno y vibrante con degradados y glassmorphism.  

---


## 🔑 Prompt General
Diseña una aplicación móvil educativa juvenil llamada “¿Y si agendamos un 5.0?”, con estilo moderno, fresco y colorido, inspirada en tableros tipo Trello.

🎯 Público objetivo: estudiantes de secundaria que necesitan organizar tareas y clases.
🎨 Estilo: juvenil, alegre, con colores vibrantes (azul, verde, naranja), bordes redondeados, sombras suaves, íconos ilustrativos y toques de glassmorphism. En modo claro.

Incluye las siguientes pantallas y componentes:

Pantalla de inicio / Onboarding

Nombre de la app: ¿Y si agendamos un 5.0?

Ilustración juvenil (estudiantes usando el celular/cuadernos).

Botón principal brillante: Comenzar (degradado azul-verde-naranja).

Tres tarjetas seguidas horizontal con íconos:

📘 Organiza materias (azul)

🎯 Metas claras (verde)

🤝 Colabora (naranja)

Fondo con degradado vivo y toques de glassmorphism.

1.5 Pantalla de Login / Sesión

Campos:

Correo electrónico

Contraseña

Botón principal: Iniciar sesión (degradado azul-verde-naranja).

Enlace opcional: ¿Olvidaste tu contraseña?

Fondo ilustrado con un estudiante usando celular/cuaderno.

Al iniciar sesión correctamente, el usuario accede al Dashboard.

Dashboard / Vista general (tipo tablero)

Tablero estilo Trello con columnas:

🔴 Urgente

🟠 Hoy

🟢 Próximas

Widget de calendario semanal en la parte superior:

Colorido y con días de la semana visibles.

Permite moverse entre los días de la semana directamente desde el widget.

Al pulsar sobre el calendario, lleva al usuario a una vista global del calendario con todas las tareas organizadas por día y por color según asignatura.

Debajo del calendario:

📌 Las tarjetas de tareas deben organizarse en una lista vertical apilada (una debajo de la otra).

❌ No debe existir scroll horizontal para las tareas.

✅ El único desplazamiento permitido es vertical para explorar más tareas.

Cada tarjeta ocupa casi todo el ancho de la pantalla (con márgenes de 8-12px a cada lado).

Tarjetas compactas: incluyen título de tarea, asignatura con ícono, fecha límite y estado (✅ completada / ❌ pendiente).

Botón flotante (+) grande y brillante para Agregar tarea, alineado abajo a la derecha.

Botón de cerrar sesión: pequeño, ubicado en la parte superior al lado del ícono de perfil, reemplazando el antiguo botón de lupa. Al pulsarlo, cierra la sesión y vuelve al Onboarding.

Acceso al perfil: al pulsar el ícono de perfil en la parte superior, se abre la pantalla de Perfil del estudiante.

Nota de diseño: dado que es una app móvil, el desplazamiento principal debe ser natural hacia abajo (scroll vertical).

Pantalla de agregar tarea

Campos:

Asignatura (lista desplegable con íconos).

Descripción.

Fecha límite (selector visual tipo calendario emergente).

Botón destacado: Guardar tarea (azul-verde degradado).

Fondo ilustrado con un estudiante escribiendo en un cuaderno.

Nota: aquí no aparece el micro-quiz / reflexión, solo se crea la tarea.

Detalle de tarea

Nombre de la asignatura con ícono.

Fecha límite resaltada:

🔴 rojo si está próxima.

🟢 verde si hay tiempo.

Descripción breve de la tarea.

Botones de acción:

✅ Marcar como completada (verde brillante).

Al marcar la tarea como completada, se activa la pantalla de micro-quiz / momento de reflexión.

✏️ Editar tarea (botón secundario).

Al pulsar Editar tarea, se abre la pantalla de edición con la información previa de la tarea ya cargada (ver 4.1). No redirige a “Agregar tarea”.

4.1 Pantalla de edición de tarea (con información previa)

Carga previa obligatoria al abrir: los campos Asignatura, Descripción y Fecha límite deben mostrarse pre-rellenados con la información actual de la tarea seleccionada.

Campos:

Asignatura (lista desplegable con íconos, manteniendo la selección actual).

Descripción (texto pre-cargado editable).

Fecha límite (selector visual tipo calendario emergente con la fecha actual marcada).

Acciones:

Guardar cambios (botón principal con degradado azul-verde-naranja). Al guardar, se actualiza la tarea y se retorna al Detalle de tarea.

Cancelar / Volver (acción secundaria) sin aplicar cambios.

Comportamiento:

No debe navegar ni reutilizar la pantalla de “Agregar tarea”.

Validaciones claras y mensajes de error visibles bajo los campos en caso de datos faltantes.

Estilo:

Mantener diseño juvenil, moderno y vibrante, con bordes redondeados, sombras suaves y fondo ilustrado.

Micro-quiz / Momento de reflexión (post-tarea)

Se activa solo después de completar una tarea.

Ilustración divertida (estudiante pensando 💡).

Una pregunta corta con espacio para respuesta abierta sobre lo aprendido o la experiencia de la tarea.

Botón: Enviar respuesta (naranja brillante).

Recordatorio inteligente

Notificación tipo pop-up con ícono 🔔 o ⏰.

Texto motivacional: “¡No olvides tu próxima tarea de Matemáticas!”.

Botón brillante: Iniciar ahora.

Navegación inferior (Navbar)

Barra inferior con 3 pestañas principales:

📅 Calendario → al pulsar, se abre una vista global del calendario con todas las tareas organizadas por día y color según asignatura.

📘 Materias → pestaña con la lista de materias del usuario.

Cada materia muestra el número de tareas pendientes.

Visual:

❌ si hay tareas pendientes.

✅ si no hay tareas.

Las materias se presentan en tarjetas compactas, ordenadas en lista vertical.

🏆 Logros → pantalla sencilla (por ahora).

Incluye un módulo de racha de tareas diarias:

Ejemplo visual tipo contador 🔥 con los días consecutivos que el usuario ha cumplido tareas.

Perfil del estudiante

Acceso: desde el ícono de perfil en la parte superior del Dashboard.

Contenido visible:

Foto/Avatar de perfil (circular, con borde en degradado azul-verde-naranja).

Nombre completo del estudiante (título claro y legible).

Colegio (texto destacado en tarjeta).

Grado (texto destacado en tarjeta).

Correo asociado (si aplica al inicio de sesión).

Racha de tareas completadas (streak):

Contador visual tipo 🔥 mostrando los días consecutivos.

Elemento visual adicional (barra o anillo de progreso) con los colores vibrantes de la app.

Tarjetas estilo glassmorphism para presentar los datos (colegio, grado, nombre), con bordes redondeados y sombras suaves.

Acciones:

Botón secundario para editar información del perfil.

Botón de volver o navegación para regresar al Dashboard.

Estilo:

Presentación agradable a la vista, juvenil, con jerarquía tipográfica (títulos medianos, datos en texto base) y acentos de color en la racha.

Materias (con opción para agregar materias)

Ubicación: pestaña “📘 Materias” de la barra inferior.

Lista vertical de materias en tarjetas compactas, cada una con:

Ícono representativo de la materia.

Nombre de la materia.

Número de tareas pendientes.

Indicador visual:

❌ si hay tareas pendientes.

✅ si no hay tareas.

Acción para agregar materia:

Botón visible “+ Agregar materia” (degradado azul-verde-naranja, ícono + grande).

Flujo de agregar:

Al presionar, se abre un formulario sencillo con:

Nombre de la materia.

Selección de ícono representativo (ilustrativo y juvenil).

Color asociado (coherente con la paleta de la app).

Al guardar, la nueva materia se agrega a la lista y queda disponible para asignarla en tareas.

Desplazamiento:

Solo vertical para recorrer la lista de materias.

Estilo global

Colores vibrantes (azul, verde, naranja) en degradados.

Bordes redondeados 16-24px.

Sombras suaves.

Íconos juveniles e ilustrativos.

Toques de glassmorphism en tarjetas y widgets.

Tipografía clara, legible y amigable.

Desplazamiento siempre vertical para tareas y materias.

Botones principales siempre brillantes y llamativos (degradados azul-verde-naranja).

🔑 Objetivo del diseño:
Crear una app juvenil, fresca y motivadora que organice tareas, motive con logros, mantenga la navegación limpia en dispositivos móviles, 
permita iniciar sesión de usuario, respete el desplazamiento vertical, que el widget del calendario permita moverse por los días y acceder a la 
vista global del calendario, que el momento de reflexión / micro-quiz aparezca solo después de completar la tarea, que el apartado de Materias permita agregar 
materias, y que la edición de una tarea se realice en una pantalla de edición con información previa cargada (sin redirigir a Agregar tarea), además de
contar con acceso al Perfil donde se vea la información del estudiante (colegio, grado, nombres) y su racha de forma agradable a la vista.