# 🏗️ Arquitectura de Componentes - BeaconHelp

## Visión General

La arquitectura de BeaconHelp sigue un patrón de componentes modulares con React, priorizando la reutilización, mantenibilidad y escalabilidad. Cada componente tiene una responsabilidad específica y bien definida.

## 🎯 Principios Arquitectónicos

### 1. Separación de Responsabilidades
- **Componentes de UI**: Solo presentación y interacción
- **Páginas**: Lógica de negocio y estado
- **Contextos**: Estado global compartido
- **Utilidades**: Funciones puras reutilizables

### 2. Composición sobre Herencia
- Componentes pequeños y enfocados
- Composición flexible de funcionalidades
- Props drilling mínimo
- Hooks personalizados para lógica compartida

### 3. Mobile-First Design
- Responsive por defecto
- Progressive enhancement
- Touch-friendly interfaces
- Optimización para dispositivos móviles

## 📦 Estructura de Componentes

### Componentes Core

#### 1. App.jsx
```jsx
// Componente raíz de la aplicación
- Router principal
- Configuración de rutas
- ThemeProvider wrapper
- Layout base
```

**Responsabilidades:**
- Configuración del enrutamiento
- Inicialización de contextos globales
- Definición de rutas protegidas
- Layout principal de la aplicación

#### 2. Header.jsx
```jsx
// Barra de navegación superior
- Logo y branding
- Menú de navegación
- Botón de menú móvil
- Estado de usuario
```

**Props Interface:**
```typescript
interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isLoggedIn: boolean;
  userLocation: string;
}
```

**Funcionalidades:**
- Navegación responsive
- Indicador de estado de conexión
- Menú hamburguesa para móviles
- Breadcrumbs contextuales

#### 3. Sidebar.jsx
```jsx
// Panel de navegación lateral
- Menú principal
- Enlaces de navegación
- Estado activo
- Collapse