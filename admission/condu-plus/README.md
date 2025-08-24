# Condu+ 🏍️

**Tu compañero para una conducción más segura**

Condu+ es una aplicación web educativa diseñada para enseñar normas de tránsito y mejorar la seguridad vial de manera divertida e interactiva. La plataforma está enfocada en motociclistas y conductores que quieren aprender las mejores prácticas de conducción.

## 🚀 Características

### Sistema de Aprendizaje
- **Módulos interactivos** con lecciones estructuradas
- **Sistema de progreso** que guarda tu avance
- **Contenido multimedia** con imágenes y explicaciones detalladas
- **Evaluaciones tipo quiz** para reforzar el aprendizaje

### Gamificación
- **Sistema de puntos de experiencia (XP)** por actividades completadas
- **Niveles de usuario** que aumentan con el progreso
- **Insignias y logros** desbloqueables
- **Rachas de aprendizaje** para mantener la consistencia
- **Retos diarios** para mantener el conocimiento fresco

### Módulos Disponibles
- **Señales de Tránsito** - Identificación y comprensión de señales viales
- **Uso del Casco** - Seguridad y tipos de cascos para motociclistas
- **Normas de Circulación** - Reglas básicas de tránsito

### Funcionalidades del Usuario
- **Perfil personalizable** con avatar y estadísticas
- **Dashboard principal** con resumen de progreso
- **Sistema de notificaciones** para recordatorios
- **Historial de actividades** y logros obtenidos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS 4, CSS Modules
- **Componentes**: Radix UI (accesibles y personalizables)
- **Formularios**: React Hook Form con validación Zod
- **Iconos**: Lucide React
- **Fuentes**: Geist Sans y Geist Mono
- **Gestión de Estado**: React Hooks (useState, useEffect)
- **Almacenamiento**: LocalStorage para persistencia local

## 📱 Características Técnicas

- **Arquitectura**: App Router de Next.js 15
- **Responsive**: Diseño adaptativo para móviles y desktop
- **Accesibilidad**: Componentes Radix UI con estándares WCAG
- **Performance**: Lazy loading y optimizaciones de Next.js
- **SEO**: Metadatos optimizados y estructura semántica

## 🚀 Demo en Línea

**Prototipo funcional:** [Condu+ Demo](https://v0-ayuda-con-vercel-weld.vercel.app)

> 🎯 **¡Prueba la aplicación ahora mismo!** Navega por todas las funcionalidades sin necesidad de instalar nada.

### 🔑 Credenciales de Prueba
```
Email: john.doe@contoso.com
Contraseña: 123
```

> 💡 **Nota:** Usa estas credenciales para acceder directamente al dashboard y probar todas las funcionalidades.

## 🎥 Video Demo del Proyecto

**Demo en 2 minutos:** [Condu+ Video Demo](https://www.youtube.com/watch?v=5Yjj4IaT4MQ)

> 🎬 **¡Mira el proyecto en acción!** Video completo que demuestra todas las funcionalidades y el proceso de desarrollo.

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación
```bash

# Navegar al directorio
cd admission/condu-plus

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar en producción
pnpm start
```

### Scripts Disponibles
- `pnpm dev` - Servidor de desarrollo
- `pnpm build` - Construcción para producción
- `pnpm start` - Servidor de producción
- `pnpm lint` - Verificación de código

## 📁 Estructura del Proyecto

```
condu-plus/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/             # Componentes React
│   ├── ui/                # Componentes base (Radix UI)
│   ├── dashboard.tsx      # Dashboard principal
│   ├── learning-module.tsx # Módulos de aprendizaje
│   ├── onboarding.tsx     # Proceso de bienvenida
│   ├── achievements-page.tsx # Página de logros
│   ├── user-profile.tsx   # Perfil de usuario
│   └── notification-system.tsx # Sistema de notificaciones
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades y configuraciones
├── public/                # Archivos estáticos
│   ├── motorcycle-helmet-safety.png
│   ├── full-face-helmet.png
│   ├── circular-no-entry-sign.png
│   └── [otros assets]
├── styles/                # Estilos adicionales
└── package.json           # Dependencias y scripts
```

## 🎯 Funcionalidades Principales

### Dashboard
- Resumen de progreso diario
- Estadísticas de XP y nivel
- Acceso rápido a módulos
- Retos diarios
- Sistema de rachas

### Módulos de Aprendizaje
- Lecciones paso a paso
- Contenido multimedia
- Quizzes interactivos
- Progreso guardado automáticamente
- Feedback inmediato

### Sistema de Logros
- Insignias desbloqueables
- Celebración de logros
- Progreso visual
- Estadísticas detalladas

## 🔧 Configuración

### Variables de Entorno
El proyecto utiliza variables de entorno para configuraciones específicas. Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuraciones específicas del proyecto
NEXT_PUBLIC_APP_NAME=Condu+
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Personalización de Temas
El proyecto incluye soporte para temas claros y oscuros usando `next-themes`.

## 📊 Estado del Proyecto

- **Versión**: 0.1.0
- **Estado**: En desarrollo activo
- **Framework**: Next.js 15 (última versión estable)
- **React**: 18.3.1
- **TypeScript**: 5.x

## 🤝 Contribución

Este es un proyecto educativo enfocado en mejorar la seguridad vial. Las contribuciones son bienvenidas, especialmente en:

- Nuevos módulos de aprendizaje
- Mejoras en la accesibilidad
- Optimizaciones de performance
- Nuevas funcionalidades de gamificación

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

**MIT License** - Permite uso comercial, modificación, distribución y uso privado, solo requiere mantener el copyright y la licencia.

---

**Condu+** - Aprende, practica y conduce de manera más segura 🛡️
