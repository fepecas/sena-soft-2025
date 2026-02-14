## Ruta Sugerida:
## Tu Primer producto Con IA

***Paso_1 :Enterder la nesesidad ¿Que Problema real del mundo vamos a solucionar**
Los pequeños campesinos colombianos están desconectados de la información y tecnología que necesitan para ser productivos y sostenibles, lo que perpetúa la pobreza rural y afecta la seguridad alimentaria del país.

**Datos Concretos del Problema**

- 3.3 millones de personas viven en zonas rurales de Colombia sin acceso adecuado a tecnología agrícola
- 70% de los pequeños productores no tienen acceso a información climática actualizada
- Pérdidas del 40% en cosechas por falta de planificación y alertas tempranas
- Intermediarios se quedan con 60-80% de las ganancias por falta de conexión directa con compradores

**Paso_2 : Proto usuarios**
**Prompt de Gemini**
Escribe como si fuera una historia escrita por un periodista que ha conversado con ella:

Nombre: María Elena Rodríguez
Edad: 48 años
Ubicación: Vereda La Esperanza, Pitalito, Huila
Educación: Primaria completa
Familia: Casada, 3 hijos (2 migraron a Neiva, 1 estudia)
Experiencia: 25 años cultivando café
Finca: 2.5 hectáreas, cultiva café arábica y plátano hartón, tiene 4 gallinas y 1 cerdo, a 1.400 metros de altitud, con casa básica y beneficiadero artesanal

el problema , No puede predecir el clima, el café no se seca bien, los intermediarios pagan poco, y no tiene acceso a información confiable. Siente que sus vecinos están en la misma lucha, pero aislados.



**Paso_3 : Crear esntrevista realizar**
- Prompt

1. Hazme el guion Guión de Entrevista Estructurado
Crea 5 preguntas clave que me permitan descubrir:

Sus dolores reales con la agricultura actual
Cómo toman decisiones sobre qué sembrar/cuándo
Su relación actual con la tecnología
Sus fuentes actuales de información agrícola
Qué los motivaría a usar una nueva herramienta

2. Interpreta a  María Elena y dame respuesta de esta preguntas para ayudarla en su problema



## Paso_4: CREAR EL USER JOURNEY: Dibuja el Viaje de tu Usuario 

### **Prompt para User Journey:**

```
Contexto del Proyecto:
AgroSage IA es una app móvil tipo WhatsApp para campesinos colombianos que ayuda a planear y mejorar la producción agrícola usando IA. 

Usuario Principal:
- María Elena, 48 años, caficultora del Huila
- 2.5 hectáreas de café y plátano
- Usa WhatsApp básico, conectividad limitada
- Pierde $800,000/año por no saber cuándo llueve
- Vende a intermediarios por $4,000/arroba (sabe que vale más)

Tarea:
Crea un User Journey completo que muestre el viaje de María Elena desde que descubre AgroSage IA hasta que se convierte en usuaria activa.

Estructura requerida:
1. DESCUBRIMIENTO: ¿Cómo conoce la app?
2. PRIMERA INTERACCIÓN: Primer contacto con AgroSage IA
3. ONBOARDING: Registro y configuración inicial
4. PRIMER VALOR: Primera funcionalidad que usa y le aporta
5. ADOPCIÓN: Cómo se convierte en usuaria regular
6. ADVOCACY: Cómo recomienda a otros campesinos

Para cada etapa incluye:
- Contexto/situación específica
- Emociones de María Elena
- Acciones que realiza
- Puntos de fricción/dolor
- Oportunidades de mejora
- Touchpoints (WhatsApp, boca a boca, etc.)

Considera:
- Su baja confianza en tecnología nueva
- Conectividad intermitente en zona rural
- Necesidad de resultados inmediatos y tangibles
- Importancia de recomendación de vecinos
- Preferencia por audios vs texto
```

---

## Paso_5: DEFINIR FLUJOS Y FUNCIONALIDADES CLAVE: Cómo No Inventar Funcionalidades. Enfócate en el "Core"

### **Prompt para Definir Core Features:**

```
Contexto:
Basado en las entrevistas de usuario, sabemos que María Elena (caficultora típica) tiene estos dolores prioritarios:
1. Pierde $800,000/año por incertidumbre climática
2. Vende 40% más barato a intermediarios por falta de conexiones
3. No sabe qué hacer cuando plantas se enferman (espera semanas por técnico)

Problema de Enfoque:
Tengo 15 ideas de funcionalidades para AgroSage IA, pero necesito enfocarme SOLO en las 2-3 que realmente resolverán los problemas core de mis usuarios.

Tarea:
Ayúdame a priorizar funcionalidades usando el marco "Problema-Solución-Evidencia":

Funcionalidades propuestas:
- Alertas climáticas por WhatsApp
- Calculadora de costos de siembra
- Directorio de compradores con precios
- Chat IA para consultas agrícolas
- Calendario de actividades agrícolas
- Marketplace para vender productos
- Sistema de crédito rural
- Red social de campesinos
- Curso de agricultura digital
- Análisis de suelo con IA

Criterios de evaluación:
1. IMPACTO: ¿Resuelve dolor principal de usuarios?
2. FRECUENCIA: ¿Lo usarían semanalmente?
3. FEASIBILIDAD: ¿Podemos construirlo en 2 meses?
4. DIFERENCIACIÓN: ¿Es único vs competencia?
5. MONETIZACIÓN: ¿Genera valor económico medible?

Entrega:
- Ranking de top 3 funcionalidades core
- Justificación basada en evidencia de usuario
- Secuencia de desarrollo (cuál construir primero)
- Métricas de éxito para cada funcionalidad
```

---

## Paso_ 6. GENERAR WIREFRAMES CON IA: Ahora Sí, ¡A Crear!

### **Prompt para Wireframes con IA:**

```
Proyecto: AgroSage IA - App móvil para campesinos colombianos

Funcionalidades Core Priorizadas:
1. Alertas climáticas específicas por WhatsApp
2. Directorio de compradores con precios reales
3. Chat IA para consultas agrícolas urgentes

Usuario: María Elena, 48 años, caficultora, usa WhatsApp, prefiere audios a textos largos

Tarea: Genera wireframes detallados para app móvil que incluyan:

PANTALLA 1: ONBOARDING
- Logo AgroSage IA con elementos rurales
- Formulario simple: Nombre, ubicación, tipo de cultivo, área
- Botón grande "Empezar a cultivar mejor"
- Diseño familiar tipo WhatsApp

PANTALLA 2: HOME/DASHBOARD
- Saludo personalizado: "Hola María Elena"
- 4 botones principales con iconos grandes:
  * 🌦️ Alertas del Clima (badge con número de alertas)
  * 💰 Precios y Compradores  
  * 🤖 Pregunta al Asistente
  * 📊 Mi Finca
- Notificaciones importantes arriba
- Navegación bottom bar simple

PANTALLA 3: ALERTAS CLIMÁTICAS
- Alerta urgente destacada: "⚠️ Lluvia fuerte mañana - Guarda tu café"
- Lista de próximas condiciones climáticas (3 días)
- Recomendaciones específicas para cada alerta
- Botón "Recibir por audio" para cada alerta

PANTALLA 4: CHAT IA ASISTENTE
- Interfaz tipo WhatsApp
- Mensajes pre-escritos comunes: "Mi café tiene manchas amarillas"
- Opción de enviar foto de planta enferma
- Respuestas del IA con audios opcionales
- Historial de consultas anteriores

Especificaciones de Diseño:
- Colores: Verde natural, marrón tierra, azul cielo
- Tipografía: Grande, alto contraste, fácil lectura
- Botones: Grandes (mínimo 44px), fácil toque con dedos
- Iconografía: Rural colombiana, reconocible
- Offline-first: Indicadores de conexión claros
- Accesibilidad: Contraste alto, textos grandes

Consideraciones UX:
- Máximo 3 taps para cualquier función principal
- Loading states para conectividad lenta
- Confirmaciones claras para acciones importantes
- Tutoriales contextuales (no videos largos)
- Estados de error amigables en lenguaje rural

Entrega específica:
Wireframes de baja fidelidad para las 4 pantallas principales, con anotaciones de interacción y flujos entre pantallas.
```

---



### **Prompt para Describir Herramienta IA:**

```
Contexto del Proyecto:
He validado con campesinos reales que AgroSage IA debe tener un asistente conversacional inteligente que entienda el contexto rural colombiano.

Información de Usuario Real (María Elena):
- Prefiere audios a textos largos
- Usa términos rurales: "maticas", "embarrarla", "berraco"
- Necesita respuestas inmediatas para emergencias ("mi café tiene manchas")
- Desconfía de tecnología que no entiende
- Valora explicaciones simples con razones ("por qué")

Casos de Uso Validados:
1. Consulta urgente: "A mi café le salieron unas manchas negras"
2. Planificación: "¿Cuándo debo sembrar plátano en Huila?"
3. Emergencia climática: "Va a llover, ¿qué hago con el café secando?"
4. Precios: "¿$4,000 por arroba de pergamino está bien?"

Tarea:
Describe detalladamente el Asistente IA de AgroSage necesario para servir a usuarios como María Elena.

Incluye:
PERSONALIDAD Y TONO:
- Cómo debe "hablar" el IA
- Nivel de formalidad/cercanía
- Manejo de términos técnicos vs rurales

CAPACIDADES TÉCNICAS:
- Procesamiento de lenguaje natural en español rural
- Reconocimiento de imágenes de cultivos
- Base de conocimiento agrícola específica
- Integración con datos climáticos locales

FLUJOS DE CONVERSACIÓN:
- Cómo manejar consultas vagas: "mi planta está rara"
- Protocolo para emergencias agrícolas
- Seguimiento de recomendaciones anteriores
- Escalación a expertos humanos

LIMITACIONES Y SALVAGUARDAS:
- Qué NO debe hacer o recomendar
- Cómo manejar consultas fuera de scope
- Disclaimers necesarios para consejos agrícolas

MÉTRICAS DE ÉXITO:
- Cómo medir si el IA realmente ayuda
- KPIs de satisfacción y adopción
- Indicadores de confianza del usuario

Formato de entrega:
Documento técnico-funcional que un desarrollador de IA pueda usar para construir el asistente.
```

---


### **Prompt para Validación Final:**

```
Contexto Final:
He completado el User Journey, definido funcionalidades core, creado wireframes, y especificado el IA. Ahora necesito validar que todo el sistema funciona cohesivamente.

Elementos Desarrollados:
- User Journey de María Elena (caficultora)
- 3 funcionalidades core: Alertas clima, precios, chat IA  
- Wireframes de 4 pantallas principales
- Especificaciones del asistente IA rural

Tarea de Validación:
Simula ser María Elena usando AgroSage IA por primera vez y identifica:

ESCENARIO: "Son las 6 AM, María Elena está decidiendo si secar café hoy o no. Abre AgroSage IA por segunda vez (ya se registró ayer)."

Valida:
1. COHERENCIA: ¿El flujo UX coincide con su User Journey?
2. USABILIDAD: ¿Puede completar su tarea en 2-3 taps?
3. VALOR: ¿Recibe información que le ahorra dinero inmediatamente?
4. CONFIANZA: ¿El IA habla como ella espera?
5. ADOPCIÓN: ¿Querría usar esto mañana también?

Identifica:
- Gaps entre wireframes y funcionalidades
- Problemas de flujo no considerados
- Oportunidades de mejora basadas en contexto rural
- Siguiente funcionalidad a priorizar basado en uso

Entrega:
Reporte de validación con recomendaciones específicas para mejorar la cohesión del producto antes del desarrollo técnico.
```

---

## **Cómo Use Estoy Prompt**

### 📋 **Orden de Ejecución:**
1. **User Journey** → Entender el viaje completo
2. **Core Features** → Priorizar funcionalidades 
3. **Wireframes** → Diseñar la experiencia
4. **IA Description** → Especificar la inteligencia
5. **Validación Final** → Asegurar coherencia

### ✅ **Consejos de Uso:**
- Usar un prompt a la vez, completar antes de seguir
- Adaptar cada prompt con tus hallazgos específicos
- Mantener siempre el contexto de usuario real (María Elena)
- Validar cada etapa antes de avanzar

### 🎯 **Resultado Final:**
Al completar estos 5 prompts tendrás un blueprint completo y validado para desarrollar AgroSage IA, enfocado en resolver problemas reales de campesinos colombianos.