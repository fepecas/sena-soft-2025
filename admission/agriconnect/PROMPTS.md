# Documentación de Prompts - AgriConnect Colombia
## Equipo "Three Amigos" - Centro SENA Agroturístico San Gil, Santander

### 👥 **Desarrollado por:**
- **Samuel Gomez Gomez** - Líder de Producto y Validación
- **Anderson Jair Romero Afanador** - Arquitecto de Prompts y Desarrollo  
- **Maryamm Andrea Piza Moncada** - Diseñadora UX y Documentación

**Centro:** SENA Agroturístico San Gil, Santander - Sede Principal

## 🎯 Metodología Seguida
Seguimos **exactamente** el proceso "Del boceto al prototipo funcional" de la Ruta Habilitadora SENASoft 2025, presentado por Diego Ardila y Alexander "Kilx" Moreno.

---
## anderson romero
## 📝 PASO 1: Proto-Usuario

### Prompt utilizado en Gemini:
```
Tengo un usuario con las siguientes características:

Carlos Gómez, 45 años, caficultor de Caldas, tiene 2 hectáreas de café y 0.5 hectáreas de aguacate. Perdió el 30% de su producción de aguacates (5,500 frutos) por enfermedades no identificadas, representando pérdidas de $5.5 millones de pesos. Enfrenta pérdidas recurrentes por falta de tecnificación y necesita soluciones digitales para identificar enfermedades a tiempo.

Crea un guión para entrevista de una persona con el perfil de Carlos. Quiero que tenga cinco preguntas.
```

---

## 🎤 PASO 2: Entrevista Simulada

### Prompt utilizado en Gemini:
```
Actúa como el usuario Carlos y dame las respuestas a la entrevista que acabamos de crear.

Recuerda que eres: Carlos Gómez, 45 años, caficultor de Caldas, tienes 2 hectáreas de café y 0.5 hectáreas de aguacate. Perdiste el 30% de tu producción de aguacates (5,500 frutos) por enfermedades no identificadas, representando pérdidas de $5.5 millones de pesos. Enfrentas pérdidas recurrentes por falta de tecnificación y necesitas soluciones digitales para identificar enfermedades a tiempo.

Responde las 5 preguntas del guión como si fueras Carlos, con su personalidad, preocupaciones y manera de hablar de un campesino colombiano.
```

---

## 🗺️ PASO 3: Viaje del Usuario

### Prompt utilizado en Gemini:
```
Basándote en las respuestas de Carlos Gómez que acabamos de obtener, crea el viaje del usuario (user journey).

Es decir, una proyección de lo que siente Carlos desde que siente esa necesidad hasta que la resuelve con un futuro producto digital (AgriConnect Colombia).

Incluye:
1. Los momentos clave del proceso
2. Las emociones que siente en cada etapa
3. Los puntos de dolor (dificultades que encuentra)
4. Las oportunidades donde una solución digital podría ayudar

El viaje debe ir desde "Carlos nota algo raro en sus plantas" hasta "Carlos previene futuras pérdidas con tecnología"
```

---

## ⚡ PASO 4: Flujos Funcionales

### Prompt utilizado en Gemini:
```
Basándote en el viaje del usuario de Carlos que acabamos de crear, define los flujos funcionales clave para AgriConnect Colombia.

No necesitamos construir todo el ecosistema, solo las 3-4 funcionalidades MÁS importantes que resuelvan los principales puntos de dolor de Carlos.

Del viaje del usuario, identifica:
1. Las funcionalidades esenciales que Carlos necesita
2. Los flujos más críticos para prevenir las pérdidas 
3. Las acciones principales que debe poder hacer en la app

Recuerda: Solo las funcionalidades fundamentales, no todo el sistema complejo. ¿Cuáles son las 3-4 acciones clave que Carlos debe poder hacer para evitar perder sus 5,500 aguacates?
```

---
## maryamm piza

## 📱 PASO 5: Wireframes con Stitch

### Prompt utilizado en Stitch:
```
Genera wireframes para AgriConnect Colombia, una app para agricultores colombianos que necesitan identificar enfermedades en sus cultivos.

CONTEXTO DEL PRODUCTO:
Carlos Gómez, 45 años, caficultor de Caldas, perdió 30% de producción de aguacates (5,500 frutos = $5.5 millones COP) por enfermedades no identificadas. Necesita solución digital para identificar enfermedades a tiempo.

SISTEMA DE 4 AGENTES COORDINADOS:

1. AgroExpert - Diagnóstico de Enfermedades (PRIORIDAD 1):
   - Proceso 3 pasos: Seleccionar cultivo → Capturar foto → Análisis resultado
   - Cultivos: Café, Cacao, Papa, Maíz, Frijol, Plátano, Aguacate
   - Diagnósticos con % confianza (80-95%)
   - Historial cronológico con estados: Saludable ✅, Enfermedad ⚠️, Crítico 🚨

2. ClimateAI - Reportes Colectivos:
   - Formulario rápido: Estado clima + temperatura + observaciones
   - Mapa interactivo con 15+ reportes de usuarios cercanos
   - Alertas inteligentes por zona geográfica

3. MarketAI - Precios y Mercado:
   - Precios tiempo real con tendencias
   - Predicciones 30 días con gráficos
   - Compradores cercanos con distancias

4. FinanceAI - Microcréditos:
   - Ofertas contextualizadas según diagnósticos
   - Montos $200,000 - $2,500,000 COP
   - Simulador de pagos

PANTALLAS REQUERIDAS:
1. Login/Registro con usuarios simulados
2. Dashboard coordinado mostrando los 4 agentes
3. AgroExpert: Selección cultivo → Cámara → Diagnóstico → Tratamiento
4. ClimateAI: Reportar clima + Mapa con reportes colectivos
5. MarketAI: Precios + Predicciones + Compradores
6. FinanceAI: Ofertas crédito + Simulador
7. Perfil usuario con datos de Carlos
8. Historial de diagnósticos con filtros

NAVEGACIÓN:
Footer fijo con 5 secciones: Dashboard | AgroExpert | Clima | Mercado | Perfil

USUARIO OBJETIVO:
Carlos Gómez, Caldas, Colombia, cultiva café + aguacate, smartphone básico, perdió $5.5M por falta tecnificación.

DISEÑO:
- Mobile-first, botones grandes (44px mínimo) 
- Colores verdes/naturales agricultura
- Iconos claros para rural
- Texto grande, interfaces simples
- Optimizado para conexión rural
```

---

## 🚀 PASO 6: Desarrollo en v0

### Prompt Principal utilizado en v0:
```
Importa desde Figma: https://www.figma.com/design/b2Mdv1kotcMpGsxEASeCG0/agriconnect?node-id=2-354&m=dev&t=JCA2nFC3cabXkLMt-1

[PROMPT COMPLETO DE 5000+ PALABRAS CON TODAS LAS ESPECIFICACIONES TÉCNICAS DETALLADAS - Ver archivo PROMPT_COMPLETO_V0.md para el contenido completo]

CONTEXTO DEL PRODUCTO VALIDADO:
AgriConnect Colombia es un ecosistema de apoyo integral para pequeños productores rurales que enfrentan pérdidas del 40% por falta de tecnificación...

[Continúa con todas las especificaciones de los 4 agentes, autenticación, navegación, etc.]
```

---

## 🔧 PROMPTS DE MEJORAS ITERATIVAS

### 1. Gestión de Cultivos:
```
Agrega una nueva sección "Mis Cultivos" donde Carlos pueda:

1. Ver cultivos registrados:
   - Café (2 hectáreas) - Registrado hace 2 años
   - Aguacate (0.5 hectáreas) - Registrado hace 1 año

2. Agregar nuevo cultivo:
   - Selector: Café, Cacao, Papa, Maíz, Frijol, Plátano, Aguacate
   - Hectáreas: [Input numérico]
   - Fecha siembra: [Date picker]
   - Ubicación específica: [Input texto]

3. Gestionar cultivos existentes:
   - Editar información
   - Marcar como cosechado
   - Eliminar cultivo

4. Integración con agentes:
   - AgroExpert: Solo mostrar cultivos registrados
   - ClimateAI: Alertas específicas por cultivo
   - MarketAI: Precios solo de cultivos del usuario
   - FinanceAI: Créditos contextualizados

Agrega botón "Gestionar Cultivos" en el Perfil o como nueva sección en el footer.
```

### 2. Modo Dark + Offline:
```
Implementa MODO DARK y MODO OFFLINE para AgriConnect Colombia:

🌙 MODO DARK:
1. Toggle en Header: Botón sol/luna junto al perfil
2. Persistencia: Guardar preferencia en localStorage
3. Colores dark optimizados:
   - Fondo: #0a0f0a (verde muy oscuro)
   - Tarjetas: #1a2e1a 
   - Texto: #e8f3e8
   - Verde principal: #22c55e (más brillante)
   - Verde secundario: #16a34a

📶 MODO OFFLINE:
1. Indicador conectividad: 
   - Header: "🟢 Conectado" / "🔴 Sin conexión"
   - Detectar navigator.onLine

2. Funcionalidad offline:
   - Diagnósticos: Usar base de datos local simulada
   - Reportes clima: Guardar en cola para enviar después
   - Datos cultivos: Funcionar completamente offline
   - Precios: Mostrar "Última actualización" + datos cached

3. Sincronización:
   - Al recuperar conexión: "Sincronizando datos..."
   - Enviar reportes pendientes
   - Actualizar precios

4. PWA Service Worker simulado:
   - Cache de pantallas principales
   - Funcionamiento básico sin internet

UI/UX:
- Toast notifications: "Modo oscuro activado" / "Trabajando sin conexión"
- Transiciones suaves entre temas
- Iconos adaptativos según conectividad
```

### 3. Logout Automático:
```
Actualiza la función de logout para que redirija automáticamente al login:

CAMBIO EN LA FUNCIÓN LOGOUT:
```javascript
const logout = () => {
  setCurrentUser(null)
  setIsAuthenticated(false)
  localStorage.removeItem('agriconnect_user')
  // AGREGAR: Redirigir automáticamente al login
  setCurrentView('login') // o como manejes las vistas
}
```

FLUJO MEJORADO:
1. Usuario hace clic en "Cerrar Sesión" en Perfil
2. Automáticamente regresa a pantalla de Login
3. Puede probar inmediatamente con otro usuario:
   - carlos@gmail.com / 123456
   - maria@gmail.com / 123456  
   - admin@agriconnect.com / admin123

BENEFICIO PARA DEMO:
- Cambios rápidos entre usuarios
- Mostrar diferentes perspectivas
- Flow perfecto para video
```

---

## 📊 Resultados Obtenidos

### Wireframes Generados (Stitch):
- ✅ 6 pantallas principales
- ✅ Navegación coherente
- ✅ Colores verdes agricultura
- ✅ Mobile-first design

### Prototipo Funcional (v0):
- ✅ 10+ funcionalidades implementadas
- ✅ PWA completa con offline
- ✅ 4 agentes coordinados
- ✅ Sistema autenticación
- ✅ Gestión completa cultivos

### Iteraciones Realizadas:
- **v1:** Implementación inicial con 4 agentes
- **v2:** Agregado "Mis Cultivos"
- **v3:** Modo Dark implementado
- **v4:** Modo Offline funcional
- **v5:** Logout automático al login

---

## 🎯 Lecciones Aprendidas

1. **Metodología efectiva:** El proceso de Diego funciona perfectamente
2. **Iteración es clave:** v0 requiere múltiples mejoras
3. **Contexto es crítico:** Prompts detallados = mejores resultados
4. **Validación real:** Problema auténtico mejora la solución
5. **Coordinación IA:** 4 agentes trabajando juntos > apps separadas

---

## 🏆 Equipo "Three Amigos" - Centro SENA San Gil

### **Samuel Gomez Gomez** - Líder de Producto
- **Contribución:** Proto-usuario Carlos, problema real, coordinación general
- **Prompts desarrollados:** Entrevistas simuladas, validación de casos de uso

### **Anderson Jair Romero Afanador** - Tech Lead  
- **Contribución:** Prompts optimizados, desarrollo v0.dev, iteraciones técnicas
- **Prompts desarrollados:** Prompt completo v0 (5000+ palabras), mejoras iterativas

### **Maryamm Andrea Piza Moncada** - UX Lead
- **Contribución:** Wireframes, diseño UX, documentación completa
- **Prompts desarrollados:** Wireframes Stitch, flujos funcionales, user journey

### 🌱 **Desde San Gil, Santander, para Colombia**

Como equipo del **Centro SENA Agroturístico San Gil**, aplicamos nuestro conocimiento directo del sector agrícola santandereano para crear una solución que beneficie a todos los pequeños productores rurales de Colombia. Cada prompt fue diseñado pensando en las necesidades reales de nuestros agricultores locales.

---

*Total de prompts utilizados: 15+ | Tiempo desarrollo: 6 horas | Resultado: PWA profesional completa*  
*Centro SENA Agroturístico San Gil, Santander - Sede Principal*