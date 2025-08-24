# 🎨 Wireframes y Mockups - BeaconHelp

## 📐 Arquitectura de Información

### Estructura de Navegación
```
BeaconHelp App
├── 🏠 Home (Pantalla Principal)
│   ├── Botón de Pánico Central
│   ├── Estado de Seguridad
│   ├── Accesos Rápidos
│   └── Widget de IA
├── 👥 Contactos
│   ├── Contactos de Emergencia
│   ├── Agregar/Editar Contactos
│   └── Verificación de Contactos
├── 📚 Recursos
│   ├── Líneas de Ayuda
│   ├── Centros de Apoyo
│   └── Información Legal
├── 🎓 Educación
│   ├── Cursos Interactivos
│   ├── Simulacros
│   └── Comunidad
├── 📊 Reportes
│   ├── Crear Reporte
│   ├── Mis Reportes
│   └── Seguimiento
├── 📍 Ubicación
│   ├── Mapa de Seguridad
│   ├── Rutas Seguras
│   └── Zonas de Riesgo
├── ⚙️ Configuración
│   ├── Perfil de Usuario
│   ├── Configuración de Emergencia
│   ├── Privacidad y Seguridad
│   └── Notificaciones
└── 🔐 Registro/Login
    ├── Crear Cuenta
    ├── Iniciar Sesión
    └── Recuperar Contraseña
```

## 📱 Wireframes de Pantallas Principales

### 1. Pantalla Principal (Home)
```
┌─────────────────────────────────────┐
│  ☰  BeaconHelp            🔔  👤   │
├─────────────────────────────────────┤
│                                     │
│        Estado: SEGURO ✅            │
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │      BOTÓN PÁNICO       │      │
│    │         🚨              │      │
│    │                         │      │
│    └─────────────────────────┘      │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ 👥  │ │ 📚  │ │ 📍  │ │ 📊  │   │
│  │Cont.│ │Rec. │ │Ubic.│ │Rep. │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
│              💬 IA Chat             │
└─────────────────────────────────────┘
```

### 2. Gestión de Contactos
```
┌─────────────────────────────────────┐
│  ←  Contactos de Emergencia    +    │
├─────────────────────────────────────┤
│                                     │
│  👤 María García                    │
│     📱 +57 300 123 4567            │
│     👨‍👩‍👧‍👦 Familia                      │
│                              ✏️ 🗑️  │
│  ─────────────────────────────────  │
│                                     │
│  👤 Carlos Rodríguez                │
│     📱 +57 301 987 6543            │
│     👮‍♂️ Policía                       │
│                              ✏️ 🗑️  │
│  ─────────────────────────────────  │
│                                     │
│  👤 Ana López                       │
│     📱 +57 302 456 7890            │
│     🏥 Médico                       │
│                              ✏️ 🗑️  │
│                                     │
└─────────────────────────────────────┘
```

### 3. Recursos de Apoyo
```
┌─────────────────────────────────────┐
│  ←  Recursos de Apoyo          🔍   │
├─────────────────────────────────────┤
│                                     │
│  🚨 LÍNEAS DE EMERGENCIA            │
│  ┌─────────────────────────────────┐ │
│  │ 📞 Policía Nacional - 123       │ │
│  │ 🚑 Cruz Roja - 132             │ │
│  │ 🚒 Bomberos - 119              │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🏥 CENTROS DE APOYO                │
│  ┌─────────────────────────────────┐ │
│  │ 🏥 Hospital San Juan            │ │
│  │    📍 Calle 45 #12-34          │ │
│  │    📱 +57 1 234 5678           │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ⚖️ INFORMACIÓN LEGAL               │
│  ┌─────────────────────────────────┐ │
│  │ 📋 Derechos de las Víctimas     │ │
│  │ 📋 Proceso de Denuncia          │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🎨 Mockups Detallados

### Pantalla Principal - Modo Seguro
- **Header**: Logo BeaconHelp, indicador de notificaciones, avatar de usuario
- **Estado de Seguridad**: Indicador visual verde con texto "SEGURO"
- **Botón de Pánico**: Elemento central, circular, color rojo intenso (#E53E3E)
- **Accesos Rápidos**: Grid 2x2 con iconos grandes y etiquetas
- **Widget IA**: Botón flotante en esquina inferior derecha

### Pantalla Principal - Modo Alerta
- **Fondo**: Cambio a tonos rojos/naranjas
- **Estado**: "ALERTA ACTIVADA" con animación pulsante
- **Botón**: Cambia a "CANCELAR ALERTA" en verde
- **Overlay**: Información de contactos notificados

### Chat con IA
- **Interfaz**: Estilo WhatsApp con burbujas de conversación
- **Respuestas Rápidas**: Botones predefinidos para emergencias comunes
- **Indicadores**: Estado de conexión y typing indicators

## 🎨 Paleta de Colores

### Colores Principales
- **Rojo Emergencia**: #E53E3E (Botón de pánico)
- **Verde Seguridad**: #38A169 (Estado seguro)
- **Azul Primario**: #3182CE (Navegación, enlaces)
- **Gris Oscuro**: #2D3748 (Texto principal)
- **Gris Claro**: #F7FAFC (Fondos)

### Colores Secundarios
- **Naranja Alerta**: #DD6B20 (Advertencias)
- **Amarillo Info**: #D69E2E (Información)
- **Púrpura Acento**: #805AD5 (IA Chat)
- **Blanco**: #FFFFFF (Fondos de tarjetas)

### Estados y Feedback
- **Éxito**: #48BB78
- **Error**: #F56565
- **Advertencia**: #ED8936
- **Información**: #4299E1

## 🧩 Componentes UI Principales

### Botón de Pánico
- **Tamaño**: 120px x 120px
- **Forma**: Circular con sombra pronunciada
- **Estados**: Normal, Pressed, Activado
- **Animación**: Pulso suave en estado normal
- **Feedback**: Vibración y sonido al presionar

### Tarjetas de Contacto
- **Layout**: Avatar + Información + Acciones
- **Altura**: 80px
- **Separadores**: Línea sutil entre elementos
- **Acciones**: Editar y eliminar alineados a la derecha

### Widget de IA
- **Posición**: Flotante, esquina inferior derecha
- **Tamaño**: 56px x 56px (FAB estándar)
- **Icono**: Robot/chat con indicador de estado
- **Expansión**: Se convierte en chat completo

### Navegación
- **Tipo**: Bottom Navigation con 5 tabs
- **Iconos**: Outline style, filled cuando activo
- **Labels**: Texto descriptivo bajo iconos
- **Indicador**: Color de acento para tab activo

## 📐 Consideraciones de UX/UI

### Principios de Diseño
1. **Accesibilidad**: Contraste mínimo 4.5:1, tamaños táctiles ≥44px
2. **Simplicidad**: Máximo 3 niveles de navegación
3. **Consistencia**: Patrones de interacción uniformes
4. **Feedback**: Respuesta inmediata a todas las acciones
5. **Seguridad**: Confirmaciones para acciones críticas

### Flujos de Usuario Críticos
1. **Activación de Pánico**: 1 tap → Confirmación → Envío
2. **Agregar Contacto**: Formulario simple con validación
3. **Chat IA**: Acceso rápido desde cualquier pantalla
4. **Configuración**: Agrupación lógica de opciones

### Estados de Error
- **Sin Conexión**: Banner informativo con retry
- **GPS Deshabilitado**: Prompt para activar ubicación
- **Permisos Faltantes**: Explicación clara y botón de configuración

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px (Diseño principal)
- **Tablet**: 768px - 1024px (Adaptación de layout)
- **Desktop**: 1024px+ (Versión web opcional)

### Adaptaciones Móviles
- **Orientación**: Soporte para portrait y landscape
- **Densidad**: Adaptación para diferentes DPI
- **Gestos**: Swipe, pinch-to-zoom donde aplique
- **Teclado**: Ajuste de viewport al mostrar teclado

### Consideraciones de Performance
- **Imágenes**: Lazy loading y compresión
- **Animaciones**: 60fps, reducción en dispositivos lentos
- **Carga**: Skeleton screens para estados de carga
- **Offline**: Funcionalidad básica sin conexión

## 🔧 Especificaciones Técnicas

### Tipografía
- **Primaria**: Inter (Sans-serif)
- **Tamaños**: 12px, 14px, 16px, 18px, 24px, 32px
- **Pesos**: Regular (400), Medium (500), Bold (700)

### Espaciado
- **Sistema**: Múltiplos de 8px (8, 16, 24, 32, 40, 48)
- **Padding**: Mínimo 16px en contenedores
- **Margins**: Consistentes entre elementos similares

### Iconografía
- **Librería**: Lucide React
- **Tamaños**: 16px, 20px, 24px, 32px
- **Estilo**: Outline con grosor 2px
- **Colores**: Heredan del texto o color específico

### Sombras y Elevación
- **Nivel 1**: `0 1px 3px rgba(0,0,0,0.12)`
- **Nivel 2**: `0 4px 6px rgba(0,0,0,0.07)`
- **Nivel 3**: `0 10px 15px rgba(0,0,0,0.1)`
- **Nivel 4**: `0 20px 25px rgba(0,0,0,0.15)`