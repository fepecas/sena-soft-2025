
# 🌱🐄 AgroSage IA - Prototipo Funcional Completo

## Contexto del Proyecto  
Crea un prototipo funcional de **AgroSage IA**, una aplicación móvil tipo WhatsApp para campesinos colombianos que les ayuda a tomar mejores decisiones **agrícolas y ganaderas** usando inteligencia artificial de forma accesible.

---

## 👩‍🌾 Usuario Objetivo  
**María Elena, 48 años, caficultora y ganadera del Huila:**
- Maneja 2.5 hectáreas de café, plátano y 4 vacas lecheras  
- Usa WhatsApp básico, prefiere audios a textos largos  
- Conectividad intermitente en zona rural  
- Pierde $800,000/año por lluvias imprevistas o malas ventas  
- Necesita información práctica e inmediata sobre cultivos y ganado

---

## 🔧 Funcionalidades Core a Implementar

### 1. Onboarding/Registro de Finca y Ganado  
- Formulario paso a paso amigable  
- Campos: Nombre, ubicación, tipo de cultivo, área, tipo y número de animales (opcional)  
- Validaciones simples  
- Botón prominente: **"Empezar a Producir Mejor"**

### 2. Dashboard Principal  
- Saludo personalizado con el nombre del usuario  
- 4 botones principales:
  - 🌦️ **Alertas Climáticas**
  - 💰 **Precios y Compradores**
  - 🤖 **Asistente IA**
  - 📊 **Mi Finca y Mi Ganado**
- Estado de conexión (online/offline)

### 3. Módulo de Alertas Climáticas  
- Lista de alertas urgentes destacadas  
- Clima para 3 días  
- Recomendaciones prácticas según cultivo o ganado

### 4. Chat con Asistente IA  
- Interfaz tipo WhatsApp  
- Mensajes predefinidos frecuentes:  
  - "Mi vaca no come"
  - "¿Cuándo siembro plátano?"
  - "¿Está bien el precio del litro de leche?"  
- Respuestas inteligentes con contexto local  
- Historial de conversación

### 5. Directorio de Compradores  
- Lista de compradores por producto (agrícola y ganadero)  
- Precios actualizados  
- Información de contacto y filtros por ubicación

---

## 🎨 Especificaciones de Diseño

### Colores y Estilo  
- **Primarios:** Verde natural (#4CAF50), Marrón tierra (#8D6E63)  
- **Secundarios:** Azul cielo (#2196F3), Naranja alerta (#FF9800)  
- **Fondo:** Blanco o gris claro  
- Estilo moderno, familiar, similar a WhatsApp

### Tipografía y UX  
- Texto mínimo 16px  
- Botones grandes (mín. 48px)  
- Iconografía descriptiva  
- Navegación simple (máximo 3 niveles)

### Componentes  
- Cards con sombra suave  
- Badges rojos para alertas  
- Avatares para usuario  
- Barras de progreso en formularios  
- Toasts para confirmaciones

---

## 🧪 Datos de Ejemplo Realistas

### Alertas Climáticas
```
⚠️ URGENTE: Lluvia intensa mañana (20mm). Resguarda tu ganado y protege el café en secado.  
☀️ Tres días de sol. Ideal para secar café y pastorear.  
🌪️ Vientos fuertes el viernes. Revisa establos y tutores de cultivos.
```

### Precios del Mercado
```
Café pergamino: $4,800/kg (Cooperativa) vs $4,200/kg (Intermediario)  
Plátano hartón: $1,200/kg (Plaza Neiva) vs $800/kg (Vereda)  
Leche cruda: $1,650/L (Quesera regional) vs $1,400/L (Vecino comprador)  
Ternero macho: $1,200,000 (Subasta Pitalito)
```

### Chat IA Ejemplos
```
Usuario: Mi vaca no come y tiene diarrea  
IA: Puede ser un problema digestivo. ¿Ha comido pasto húmedo? Dale agua limpia y consulta un veterinario.

Usuario: ¿Cuándo siembro plátano?  
IA: En Huila, siembra al inicio de lluvias (marzo-abril). El plátano hartón es ideal a 1,400msnm.
```

---

## ⚙️ Funcionalidades Técnicas

### Estado y Persistencia  
- `useState` y `useReducer`  
- Simulación con `localStorage`  
- Sin APIs reales, todo simulado

### Navegación  
- Navegación tipo **bottom tab**  
- Stack navigation en flujos como registro  
- Breadcrumbs donde sea necesario

### Interactividad  
- Validaciones en tiempo real  
- Transiciones suaves  
- Confirmaciones y feedback inmediato

### Responsividad  
- Mobile-first (320px - 480px)  
- Touch-friendly  
- Scroll natural  
- Optimizado para portrait

---

## 🔄 Flujo de Usuario

### Primera vez  
1. Pantalla de bienvenida  
2. Onboarding de finca y ganado  
3. Dashboard con tutorial contextual  
4. Exploración guiada

### Uso diario  
1. Dashboard con alertas actualizadas  
2. Consulta rápida al Asistente IA  
3. Revisión de precios  
4. Toma de decisiones informada

---

## 📍 Simulación de Datos

### Perfil de Usuario  
```
Nombre: María Elena Rodríguez  
Finca: La Esperanza  
Ubicación: Pitalito, Huila  
Cultivos: Café arábica (2 ha), Plátano hartón (0.5 ha)  
Ganado: 4 vacas lecheras  
Altitud: 1,400 msnm
```

### Datos Simulados  
- Clima localizado para el Huila  
- Precios de mercado agrícolas y pecuarios  
- Respuestas IA contextualizadas  
- Directorio ficticio (cooperativas, compradores, subastas)

---

## 🎯 Objetivo del Prototipo  
Demostrar cómo **AgroSage IA** puede transformar la vida del campesinado colombiano integrando **información agrícola y ganadera confiable**, accesible y personalizada para usuarios como María Elena.
