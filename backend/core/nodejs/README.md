# SENASoft Metrics API - Enhanced System

API Express + TypeScript + MongoDB para métricas avanzadas de inscripción SENASoft. Sistema mejorado que responde específicamente a las 6 preguntas del reto con endpoints especializados.

## 🚀 Características Nuevas

### Endpoints Especializados
- ✅ **6 endpoints específicos** para el reto SENASoft
- ✅ **Agregaciones en tiempo real** desde datos de inscripción
- ✅ **Validaciones precisas** por endpoint
- ✅ **Cache HTTP** para performance
- ✅ **Manejo de errores** estructurado

### Integración Leonardo GPT
- ✅ **6 OpenAI Actions** específicos
- ✅ **Respuestas estructuradas** y claras
- ✅ **Compatibilidad** con sistema legacy

## 📊 Endpoints Disponibles

| Endpoint | Descripción | Parámetros |
|----------|-------------|------------|
| `GET /metrics/centers` | Aprendices por centro | Ninguno |
| `GET /metrics/centers/:centerId/instructors` | Instructores por centro | `centerId` (requerido) |
| `GET /metrics/centers-programs` | Programas por centro | `programCodes` (opcional, máx 4) |
| `GET /metrics/departments` | Aprendices por departamento | Ninguno |
| `GET /metrics/github` | Total con GitHub | Ninguno |
| `GET /metrics/english` | Niveles B1/B2 por centro | `levels` (opcional, default: B1,B2) |
| `GET /health` | Estado del servidor | Ninguno |

## 🛠 Requisitos

- Node.js 18+
- MongoDB 6+
- TypeScript 5+

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
```bash
cp .env.example .env
# Editar .env con tu configuración de MongoDB
```

### 3. Configurar Base de Datos
```bash
# Importar datos de ejemplo
cd ../../../database/collection
mongoimport --db senasoft --collection enrollments --file enrollments.sample.json --jsonArray

# Crear índices
cd ..
mongosh senasoft ./indexes.js
```

### 4. Ejecutar en Desarrollo
```bash
# Nuevo sistema TypeScript
npm run dev

# Sistema legacy (compatibilidad)
npm run legacy:dev
```

### 5. Compilar para Producción
```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Probar endpoints manualmente
curl -s http://localhost:3001/health
curl -s http://localhost:3001/metrics/centers
curl -s http://localhost:3001/metrics/github
```

## 📁 Estructura del Proyecto

```
/backend/core/nodejs/
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración TypeScript
├── server.ts            # Servidor principal (nuevo)
├── server.js            # Servidor legacy
├── .env.example         # Variables de entorno
├── src/                 # Código fuente TypeScript
│   ├── db/mongo.ts      # Conexión MongoDB
│   ├── types/           # Definiciones TypeScript
│   ├── utils/           # Utilidades
│   ├── services/        # Lógica de negocio
│   ├── controllers/     # Controladores HTTP
│   ├── middleware/      # Middleware personalizado
│   └── routes/          # Definición de rutas
└── test/                # Tests automatizados
```

## 🔧 Configuración de Producción

### Variables de Entorno
```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017
# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=senasoft

# HTTP
PORT=3001
CORS_ORIGIN=*
# En producción usar dominio específico:
# CORS_ORIGIN=https://tu-dominio.com
```

### Despliegue
```bash
# Compilar
npm run build

# Ejecutar en producción
NODE_ENV=production npm start
```

## 📊 Ejemplos de Uso

### Consultas Básicas
```bash
# Todos los centros con aprendices
curl -s http://localhost:3001/metrics/centers

# Instructores recomendados en un centro específico
curl -s http://localhost:3001/metrics/centers/CALI-01/instructors

# Aprendices con GitHub
curl -s http://localhost:3001/metrics/github
```

### Consultas Avanzadas
```bash
# Programas específicos por centro (máximo 4)
curl -s "http://localhost:3001/metrics/centers-programs?programCodes=P001,P002,P003,P004"

# Niveles de inglés específicos
curl -s "http://localhost:3001/metrics/english?levels=B1,B2"

# Distribución por departamentos
curl -s http://localhost:3001/metrics/departments
```

## 🤖 Integración con Leonardo GPT

Este sistema está optimizado para trabajar con Leonardo GPT a través de OpenAI Actions:

- **6 Actions específicos** para consultas precisas
- **Respuestas estructuradas** fáciles de interpretar
- **Manejo de errores** claro para Leonardo
- **Compatibilidad** con consultas existentes

## 🔄 Migración desde Sistema Legacy

El sistema mantiene **compatibilidad completa** con el servidor legacy:

- **Servidor TypeScript**: `npm run dev` (recomendado)
- **Servidor Legacy**: `npm run legacy:dev` (compatibilidad)
- **Ambos sistemas** pueden coexistir

## 📚 Documentación Adicional

- **Base de Datos**: Ver `../../../database/README.md`
- **Leonardo GPT**: Ver `../../../gpt/leonardo/`
- **Documentación Completa**: Ver archivos `*.md` en la raíz del proyecto

## 🎯 Beneficios del Sistema Mejorado

✅ **Responde específicamente** las 6 preguntas del reto SENASoft
✅ **Métricas granulares** por centro, programa y departamento
✅ **Arquitectura escalable** TypeScript
✅ **Tests automatizados** incluidos
✅ **Documentación completa**
✅ **Compatibilidad** con sistema existente

---

*Este sistema representa una evolución significativa del backend de métricas SENASoft, proporcionando capacidades avanzadas específicamente diseñadas para el reto 2025.*