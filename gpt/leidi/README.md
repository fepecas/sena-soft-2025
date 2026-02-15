# 🤖 Leidi - Asistente IA para SENASOFT

 **Leidi** es la asistente inteligente oficial para eventos SENASOFT, especializada en análisis histórico y procesamiento en tiempo real de competencias tecnológicas del SENA.

## 🚀 Características Principales

### 📚 Acceso Histórico Integral
- **5 ediciones documentadas** (2020-2024)
- **1,600+ participantes** registrados
- **26 regionales** de Colombia
- **50+ categorías** de competencia
- **Análisis de tendencias** tecnológicas

### ⚡ Procesamiento en Tiempo Real
- **Speech-to-text** para charlas y conferencias
- **OCR** de diapositivas y contenido visual
- **Traducción automática** (ES/EN/PT)
- **Resúmenes inteligentes** por nivel de experiencia
- **Detección de tecnologías** con enlaces oficiales

### 🎯 Personalización Adaptativa
- **3 niveles de usuario**: Básico, Intermedio, Experto
- **4 roles especializados**: Competidor, Jurado, Organizador, Visitante
- **Respuestas contextuales** según perfil
- **Exportación multi-formato** (PDF, Markdown, CSV)

## 📋 Sistema de Comandos

### 🔍 Consulta Histórica
```bash
/historia [filtros]                    # Consultar datos históricos
/comparar [año1] vs [año2]            # Comparación entre ediciones
/tecnologias                          # Tecnologías detectadas con documentación
```

### 🎥 Procesamiento en Vivo
```bash
/charla start [título] [ponente]      # Iniciar captura de sesión
/charla stop                          # Finalizar sesión actual
/resumen [básico|intermedio|experto]  # Generar resumen por nivel
```

### 🌐 Utilidades
```bash
/traducir [es|en|pt]                  # Traducir contenido
/exportar [pdf|md|csv]                # Generar reporte descargable
/coach [jurado|competidor]            # Plantillas especializadas
```

## 📊 Base de Conocimiento

### Ediciones Documentadas

| Año | Ubicación | Participantes | Regionales | Modalidad |
|-----|-----------|---------------|------------|-----------|
| 2024 | Cali, Valle del Cauca | 300+ | 23 | Presencial |
| 2023 | Risaralda | 335 | 26 | Presencial |
| 2022 | Bogotá D.C. | 307 | 25 | Presencial |
| 2021 | Valle del Cauca | - | Multiple | Virtual |
| 2020 | Híbrido | 400 | 23 | Híbrido |

### Tecnologías Más Populares
- **Desarrollo Web**: PHP, Python, JavaScript
- **IA & Machine Learning**: TensorFlow, Python, Data Engineering
- **Diseño & UX**: Adobe Suite, Figma, Animación 3D
- **Infraestructura**: Cloud, Cybersecurity, Redes

## 🏗️ Estructura del Proyecto

leidi/
├── README.md                          
├── avatar_leidi.md                    # prompt del avatar
├── funcionalidades.md                 # Especificación detallada de funcionalidades
├── instrucciones_leidi.md             # Prompt principal de la IA
└── knowledge/
    ├── Información_clave_SENASOFT_2020-2024.json  # Base de conocimiento estructurada
    └── Información_clave_SENASOFT_2020-2024.pdf  # Documentación histórica original
```

## 💡 Ejemplos de Uso

### Consulta Histórica
```
Usuario: ¿Qué tecnologías han ganado más competencias en los últimos 3 años?

Leidi: **TL;DR**
• Desarrollo Web (PHP/Python) - 6 victorias
• Inteligencia Artificial - Tendencia creciente desde 2022  
• Audiovisuales (Adobe) - Consistente en todas las ediciones
• UX/Diseño - Regional Cauca líder en 2022-2023

**Tecnologías Detectadas**
• Python: [Documentación oficial](https://python.org)
• Adobe Creative Suite: [Recursos](https://adobe.com)
• TensorFlow: [Guías ML](https://tensorflow.org)
```

### Procesamiento en Vivo
```
Usuario: /charla start "IA en el Desarrollo Web" "Dr. Juan Pérez"

Leidi: ✅ **Sesión iniciada**
📝 Capturando: IA en el Desarrollo Web
👨‍🏫 Ponente: Dr. Juan Pérez
🎯 Nivel: Intermedio (configurable con /resumen [nivel])

*[Procesando audio y diapositivas en tiempo real...]*
```

## 🎯 Modos Especializados

### 👨‍⚖️ Modo Jurado
- Rúbricas de evaluación rápida
- Checklist técnico estructurado
- Análisis de viabilidad y riesgos
- Comparativa con ganadores históricos

### 🏆 Modo Competidor
- Análisis de tendencias ganadoras
- Recomendaciones tecnológicas
- Insights de preparación estratégica
- Histórico de categorías por región

### 🎪 Modo Organizador
- Dashboard de eventos en tiempo real
- Reportes estadísticos automáticos
- Gestión centralizada de datos
- Análisis de participación y engagement

## 🔧 Instalación y Configuración

### Requisitos
- Base de datos vectorial para búsqueda semántica
- API de Speech-to-Text (Google/Azure)
- Servicio de traducción automática
- Almacenamiento para transcripciones

### Configuración Básica
```yaml
# config.yml
senasoft:
  version: "1.0.0"
  data_source: "./data/senasoft_historical_data.json"
  
processing:
  audio_segments: 30  # segundos
  languages: ["es", "en", "pt"]
  export_formats: ["pdf", "md", "csv"]
  
user_levels:
  - básico
  - intermedio  
  - experto
```

## 📈 Métricas y Rendimiento

### Objetivos de Calidad
- ✅ **Respuesta < 3 segundos** para consultas históricas
- ✅ **Precisión > 95%** en detección de tecnologías
- ✅ **Cobertura 100%** de datos SENASOFT documentados
- ✅ **Disponibilidad 99.9%** durante eventos en vivo

### Indicadores de Éxito
1. **Claridad**: Respuesta accionable con pasos siguientes
2. **Completitud**: Cobertura comprensiva de datos históricos  
3. **Utilidad**: Artefactos reutilizables generados
4. **Adaptabilidad**: Personalización efectiva por usuario

## 🛡️ Seguridad y Privacidad

- **Anonimización automática** de datos personales
- **No exposición** de emails/teléfonos en transcripciones
- **Marcado de incertidumbre** (⚠️) para datos inferidos
- **Trazabilidad** de fuentes y nivel de confianza
- **Cumplimiento** de políticas de protección de datos

## 🤝 Contribución

### Agregar Datos Históricos
1. Actualizar `data/senasoft_historical_data.json`
2. Seguir esquema establecido de ediciones
3. Validar con herramientas de JSON Schema
4. Documentar fuentes y fechas de actualización

### Reportar Issues
- Datos incorrectos o desactualizados
- Comandos que no funcionan como esperado
- Sugerencias de nuevas funcionalidades
- Mejoras en personalización por usuario



## 📄 Licencia

Este proyecto está desarrollado para el SENA (Servicio Nacional de Aprendizaje) como herramienta oficial para eventos SENASOFT.

---
**Leidi** - *Tu compañera inteligente para dominar SENASOFT* 🚀