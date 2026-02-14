# Leidi - Funcionalidades

## 1. **Funcionalidades Principales**

### **1.1 Acceso Histórico y Analítico**
- Consulta de ediciones pasadas: sedes, competencias, ganadores, tecnologías, estadísticas
- Análisis de tendencias (ej. tecnologías más usadas a lo largo de los años)
- Comparación de resultados entre ediciones
- Búsqueda semántica y filtros por año, sede, competencia, institución y tecnología

### **1.2 Procesamiento en Tiempo Real del Evento Actual**
- Captura de audio y texto de charlas, conferencias y competencias mediante speech-to-text y OCR
- Resúmenes automáticos por charla, competencia o conferencia
- Traducción en vivo a múltiples idiomas (texto y voz)
- Identificación y registro de herramientas, lenguajes y frameworks mencionados
- Análisis en vivo con ingestión de audio/voz (STT) y OCR de diapositivas

### **1.3 Modo Interactivo de Consulta**
- Búsqueda histórica: "¿Qué sede tuvo más competencias en 2018?"
- Análisis en vivo: "¿Cuál es el tema central de esta conferencia?"
- Recomendaciones: enlaces a documentación oficial, tutoriales y recursos sobre tecnologías mencionadas

### **1.4 Memoria Inteligente**
- Registro y archivo de todos los datos históricos y del evento actual
- Recuperación por palabras clave o filtros ("Ganadores desarrollo web", "Tecnologías IA en los últimos 5 años")
- Almacenar y versionar transcripciones, resúmenes y metadatos por sesión/charla/edición

### **1.5 Personalización por Usuario**
- Explicaciones adaptadas al nivel del usuario (básico, intermedio, avanzado)
- Resúmenes más técnicos o más simplificados según el perfil
- Resúmenes jerárquicos (bullet TL;DR, resumen ejecutivo, y versión técnica)

---

## 2. **Sistema de Comandos**

### **Comandos de Consulta Histórica**
- `/historia [filtros]` – consulta histórica
- `/comparar [año1] vs [año2] [competencia?]` – comparación histórica

### **Comandos de Análisis en Vivo**
- `/charla start` / `/charla stop` – inicia/termina sesión de captura en vivo
- `/resumen [nivel=básico|intermedio|experto]` – resume la última captura o charla seleccionada

### **Comandos de Procesamiento de Contenido**
- `/traducir [idioma]` – traduce el último bloque o respuesta
- `/tecnologias` – lista tecnologías detectadas con 1-línea por ítem + enlaces oficiales

### **Comandos de Exportación y Utilidades**
- `/exportar [pdf|md|csv]` – genera archivo descargable con metadatos
- `/coach [jurado|competidor]` – activa plantillas de evaluación o preparación

---

## 3. **Capacidades de Análisis Avanzado**

### **3.1 Análisis de Tendencias**
- Comparativas y tendencias entre ediciones
- Detección de patrones tecnológicos a través del tiempo
- Evolución de competencias y metodologías

### **3.2 Detección de Tecnologías**
- Identificación automática de herramientas/tecnologías (lenguajes, frameworks, servicios cloud)
- Enlaces oficiales a documentación
- Clasificación por categorías técnicas

### **3.3 Traducción Multiidioma**
- Traducción (texto y/o voz) a/es/en/pt
- Soporte en tiempo real para eventos multilingües
- Adaptación cultural del contenido

---

## 4. **Modos Especializados**

### **4.1 Modo Jurado/Coach**
- Rubricas rápidas para evaluación
- Checklist técnico
- Mapa de riesgos y viabilidad
- Plantillas de evaluación estructurada

### **4.2 Modo Competidor**
- Análisis de tendencias históricas para preparación
- Recomendaciones tecnológicas basadas en ganadores pasados
- Insights de estrategia de competencia

### **4.3 Modo Organizador**
- Gestión centralizada de datos históricos y del evento en curso
- Monitoreo de eventos en tiempo real
- Reportes estadísticos y analíticos

---

## 5. **Características de Procesamiento**

### **5.1 Procesamiento en Tiempo Real**
- Segmentación en ventanas de 30–60 s
- Actualización de TL;DR incremental
- Captura simultánea de audio + OCR
- Procesamiento paralelo de múltiples fuentes

### **5.2 Gestión de Datos**
- Esquemas estructurados para ediciones y charlas
- Versionado de contenido
- Indexación semántica para búsquedas
- Persistencia de metadatos

### **5.3 Calidad y Precisión**
- Marcado de incertidumbres (⚠️)
- Distinción entre datos confirmados vs. inferidos
- Sugerencias de validación
- Control de calidad automático

---

## 6. **Formatos de Respuesta Estructurada**

### **6.1 Estructura Estándar**
- **TL;DR** (≤5 bullets)
- **Detalles** (información comprensiva)
- **Tecnologías detectadas** (con breves descripciones)
- **Acciones sugeridas** (siguientes pasos)
- **Fuentes/Contexto** (si están disponibles)

### **6.2 Adaptación por Nivel**
- **Básico**: Explicaciones simplificadas, analogías
- **Intermedio**: Balance técnico-conceptual
- **Experto**: Detalles técnicos profundos, especificaciones

---

## 7. **Seguridad y Privacidad**

### **7.1 Protección de Datos**
- Anonimización de datos personales en transcripciones
- No exposición de correos/teléfonos
- Cumplimiento de políticas de protección de datos

### **7.2 Transparencia**
- Marcado claro de datos inferidos vs. confirmados
- Trazabilidad de fuentes
- Niveles de confianza explícitos

---

## 8. **Integraciones y Exportación**

### **8.1 Formatos de Exportación**
- **PDF**: Reportes completos con metadatos
- **Markdown**: Documentación técnica
- **CSV**: Datos estructurados para análisis

### **8.2 Conectividad**
- APIs de traducción profesionales
- Servicios de speech-to-text
- Bases de datos vectoriales para búsqueda semántica
- Sistemas de documentación oficial

---

## 9. **Objetivos de Rendimiento**

### **9.1 Métricas de Éxito**
- Respuesta clara en segundos
- Acción siguiente definida
- Artefacto reutilizable generado
- Cobertura comprensiva de datos SENASOFT

### **9.2 Experiencia de Usuario**
- Propuesta de filtros útiles cuando falta contexto
- Flujo conversacional natural
- Sugerencias proactivas de acciones siguientes
- Interfaz adaptable según necesidades del usuario