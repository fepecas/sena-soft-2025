Crea un prototipo funcional de InfoMultas - una aplicación web para consulta y gestión de fotomultas en Colombia.

## Tecnologías requeridas:
- React con TypeScript
- Tailwind CSS para estilos
- Componentes Material Design 3 (Buttons, Cards, Sheets, Typography)
- Framer Motion para animaciones
- Leaflet/Mapbox para el mapa interactivo
- Integración con API de chatbot (simulada para el prototipo)
- Fuente Plus Jakarta Sans

## Estructura del proyecto:
- Componentes modulares en archivos separados: Navbar.tsx, Map.tsx, MultaCard.tsx, CameraCard.tsx, ChatBot.tsx, ReportForm.tsx
- Diseño responsivo que funcione en desktop y móvil
- Tema claro/oscuro con variables CSS semánticas

## Funcionalidades a implementar:
1. Barra de navegación superior con:
   - Logo de InfoMultas
   - Navegación a: Inicio, Mapa, Consulta, Asistente
   - Selector de tema claro/oscuro

2. Sección de consulta por placa:
   - Campo de entrada para placa de vehículo
   - Botón de consulta
   - Visualización de resultados en cards con: fecha, lugar, valor y estado

3. Mapa interactivo:
   - Implementar con Leaflet o Mapbox
   - Marcadores de cámaras con iconos coloreados (rojo=activa, verde=inactiva)
   - Popup al hacer clic en cámara con detalles
   - Controls de zoom y tipo de mapa

4. Asistente de IA integrado:
   - Interfaz de chat en sidebar o modal
   - Área de mensajes con burbujas de conversación
   - Campo de entrada para preguntas
   - Respuestas simuladas para preguntas frecuentes

5. Sistema de reportes ciudadanos:
   - Formulario para reportar cámaras nuevas o errores
   - Campos: ubicación, tipo de reporte, comentarios, subida opcional de imagen
   - Botón de enviar

6. Diseño y estilos:
   - Paleta de colores: primario (#2563eb), secundario (#64748b), éxito (#22c55e), error (#ef4444)
   - Animaciones suaves para transiciones entre secciones
   - Tipografía Plus Jakarta Sans
   - Cards con sombras y bordes redondeados
