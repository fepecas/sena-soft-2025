# 🎯 Prompt Engineering para Condu+

## 📋 Contexto del Prompt

Este documento detalla el proceso de **prompt engineering** utilizado para desarrollar **Condu+**, un prototipo funcional de aplicación educativa para mototaxistas en Colombia. El desarrollo siguió la metodología de la **sesión N° 5 de la Ruta Habilitadora: "Del boceto al prototipo funcional"**.

## 🚀 Prompt Principal del Proyecto

### 1. Contexto General del Proyecto

```
Queremos diseñar una página web responsiva (demo navegable) que funcione como prototipo de una futura aplicación educativa.

El usuario final son mototaxistas en Colombia, que suelen desconocer muchas normas de tránsito y prácticas de seguridad vial.

El objetivo principal es educarlos de manera práctica y entretenida, utilizando actividades cortas, retos diarios y módulos de aprendizaje, con un enfoque en seguridad vial.
```

### 2. Requerimientos Funcionales

```
La web debe incluir:

● Pantalla de bienvenida / registro (logo, nombre, acceso rápido).
● Onboarding (2–3 pantallas introductorias).
● Dashboard principal con:
  ○ Reto del día (quiz rápido).
  ○ Barra de progreso del usuario.
  ○ Colección de insignias.
  ○ Acceso a módulos de aprendizaje.
● Módulos de aprendizaje con micro-lecciones, quizzes y actividades visuales (ejemplo: seleccionar el casco correcto).
● Sistema de gamificación ligera: puntos, insignias y rachas.
● Perfil de usuario con avatar, nivel, insignias y rachas activas.

Flujo de usuario esperado:
1. Registro → 2. Onboarding → 3. Dashboard → 4. Reto del día / módulos → 5. Ganar insignias y puntos → 6. Revisar perfil → 7. Mantener racha con notificaciones simples.
```

### 3. Requerimientos de UI/UX

```
● Estilo visual: moderno, llamativo y educativo. Minimalista pero con elementos gráficos atractivos.

● Referencia: experiencia similar a Duolingo pero enfocada en motos y seguridad vial.

● Paleta de colores:
  ○ Modo claro: fondo blanco cálido, texto gris carbón, primario amarillo tráfico (#FACC15), secundario rojo señal (#EF4444), verde semáforo (#22C55E).
  ○ Modo oscuro: fondo gris asfalto (#111827), texto claro, amarillo tráfico (#FACC15), rojo (#F87171), verde (#4ADE80).

● Componentes específicos:
  ○ Cards para módulos.
  ○ Botones redondeados para interacción principal.
  ○ Progreso en barras o medidores circulares.
  ○ Insignias ilustradas (ejemplo: 🛡️ "Guerrero del Casco").
  ○ Feedback visual inmediato al responder preguntas.
```

### 4. Detalles Técnicos

```
● Framework sugerido: React con TailwindCSS (mobile-first y responsivo).

● No requiere integraciones externas en esta fase demo.

● Restricción: debe verse bien en desktop y móvil para el video de presentación.
```

### 5. Formato de Entrega Esperado

```
● Mockups de las pantallas.
● Prototipo navegable básico (flujo principal: registro → onboarding → dashboard → reto del día → módulo 1 → insignia).
● Código base opcional en React/Tailwind.
```

## 🔄 Proceso de Desarrollo con Prompts

### Fase 1: Ideación y Estructura
**Prompt utilizado:** Definición del contexto general y requerimientos funcionales
**Resultado:** Estructura base de la aplicación con flujo de usuario definido

### Fase 2: Diseño Visual
**Prompt utilizado:** Especificaciones de UI/UX con paleta de colores y referencias
**Resultado:** Sistema de diseño coherente inspirado en Duolingo pero adaptado a seguridad vial

### Fase 3: Implementación Técnica
**Prompt utilizado:** Detalles técnicos y restricciones de framework
**Resultado:** Prototipo funcional en React + TailwindCSS con enfoque mobile-first

### Fase 4: Validación y Refinamiento
**Prompt utilizado:** Formato de entrega y criterios de evaluación
**Resultado:** Prototipo navegable completo con flujo principal funcional

## 🎨 Elementos Generados por Prompt Engineering

### Componentes de UI
- **Cards para módulos** - Diseño responsivo y atractivo
- **Botones redondeados** - Interacción principal intuitiva
- **Barras de progreso** - Visualización clara del avance
- **Insignias ilustradas** - Sistema de gamificación visual

### Paleta de Colores
- **Modo claro:** Fondo blanco cálido con colores de tráfico
- **Modo oscuro:** Fondo gris asfalto con contraste optimizado
- **Colores semánticos:** Amarillo tráfico, rojo señal, verde semáforo

### Flujo de Usuario
- **Onboarding simplificado** - 2-3 pantallas introductorias
- **Dashboard intuitivo** - Acceso rápido a todas las funcionalidades
- **Gamificación ligera** - Puntos, insignias y rachas motivadoras

## 📱 Resultado del Prompt Engineering

### Prototipo Funcional
✅ **Página web responsiva** que funciona en desktop y móvil
✅ **Demo navegable** con flujo completo de usuario
✅ **Sistema de gamificación** implementado
✅ **Módulos de aprendizaje** con micro-lecciones
✅ **Onboarding y dashboard** funcionales

### Tecnologías Implementadas
- **React 18** con hooks modernos
- **Next.js 15** para routing y optimizaciones
- **Tailwind CSS 4** para estilos responsivos
- **Radix UI** para componentes accesibles
- **TypeScript** para tipado estático

## 🎯 Cumplimiento del Reto

### Requisitos del Reto Vibe Coding
✅ **Equipos de 3 personas** - Three Amigos
✅ **Producto funcional** - Prototipo navegable completo
✅ **Prompts documentados** - Este archivo muestra el proceso
✅ **Prototipo funcionando** - Demo navegable con todas las funcionalidades
✅ **Video demo 2 minutos** - Listo para presentación

### Valor del Producto
✅ **Resuelve problema real** - Seguridad vial para mototaxistas en Colombia
✅ **Enfoque educativo** - Aprendizaje práctico y entretenido
✅ **Gamificación efectiva** - Sistema de motivación y retención
✅ **Accesibilidad** - Diseño inclusivo y fácil de usar

---

**Condu+** es el resultado exitoso de un proceso de prompt engineering bien estructurado, que transformó una idea conceptual en un prototipo funcional que resuelve un problema real de seguridad vial en Colombia. 🛡️🏍️✨
