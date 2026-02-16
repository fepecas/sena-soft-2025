# 🟢 Reto Clasificación Directa – SENASoft 2025

Este proyecto implementa nuevas métricas en el backend de **Leonardo 🚥** usando **NodeJS + Express + MongoDB (Mongoose)**. Con estas métricas, Leonardo puede responder preguntas más detalladas sobre los aprendices inscritos.

Este proyecto implementa un backend en **Node.js** para exponer métricas sobre aprendices, instructores y centros de formación, usando **MongoDB Atlas** como base de datos y desplegado en **Render** para ser accesible vía endpoints HTTP.

## 🚀 Requisitos

- NodeJS v18 o superior
- MongoDB (local o Atlas)
- Git

## ⚙️ Instalación

1. Clonar tu fork del repositorio oficial:

```bash
git clone https://github.com/<tu-usuario>/senasoft.git
cd senasoft/backend/core/nodejs
npm install
```

2. Crear archivo `.env.development` en la raíz con tus variables:

```env
MONGO_URI=mongodb://localhost:27017/learning_metrics
DB_NAME=learning_metrics
ALLOWED_ORIGINS=*
PORT=8080
```

## 🗄️ Preparar la base de datos

Ejecuta el script de configuración (crea colecciones, índices y datos de ejemplo):

```bash
cd database/collection
node setupCollections.js
```

## 🌐 Levantar el servidor

Desde la carpeta `backend/core/nodejs`:

```bash
node server.js
```

Si todo va bien, verás en consola:

```
✅ Conectado a MongoDB Atlas
🚀 Servidor corriendo en el puerto 8080
```

## 📊 Endpoints disponibles

- **Aprendices por centro** → `GET /metrics/inscritos/centro`
- **Instructores recomendados por centro** → `GET /metrics/instructores/centro`
- **Aprendices por centro y programa** → `GET /metrics/inscritos/centro-programa`
- **Aprendices por departamento** → `GET /metrics/inscritos/departamento`
- **Aprendices con GitHub** → `GET /metrics/inscritos/github`
- **Aprendices con inglés B1/B2 por centro** → `GET /metrics/inscritos/ingles`
- **Métricas escalares (existente en repo oficial)** → `GET /metrics/scalar`

## 🏗️ Archivos principales

### `server.js`
- Configura un servidor **Express** que escucha en un puerto definido por `process.env.PORT` o `3000`
- Conecta con **MongoDB** usando la variable de entorno `MONGO_URI` y la base de datos definida en `DB_NAME`
- Expone varios **endpoints GET** que permiten consultar métricas:

| Endpoint | Descripción |
|----------|-------------|
| `/metrics/inscritos/centro` | Cantidad de aprendices por centro de formación |
| `/metrics/instructores/centro` | Nombres de instructores recomendados por aprendices de cada centro |
| `/metrics/inscritos/centro-programa` | Cantidad de aprendices por centro y programa de formación |
| `/metrics/inscritos/departamento` | Cantidad de aprendices por departamento |
| `/metrics/inscritos/github` | Cantidad de aprendices que reportan tener usuario de GitHub |
| `/metrics/inscritos/ingles` | Cantidad de aprendices con nivel de inglés B1 o B2 por centro |

- Cada endpoint ejecuta **agregaciones en MongoDB** para devolver los datos en **formato JSON**

### `setupCollections.js`
- Script para crear las **colecciones necesarias** en MongoDB y establecer **validaciones e índices**
- **Colecciones principales**: `aprendices`, `centros_formacion`, `programas_formacion`, `departamentos`, `ciudades`, `instructores`
- Crea **índices únicos y compuestos** para optimizar las consultas
- Inserta **datos de ejemplo** en la colección `aprendices` si no existen previamente, incluyendo:
  - Nombres, correos, centro, programa, departamento, GitHub, nivel de inglés, instructores recomendados
- Permite inicializar la base de datos de forma **reproducible y consistente**

### `.env`
Contiene las **variables de entorno** para la conexión segura a MongoDB y configuración del puerto.

## 🌐 Despliegue del Servidor y Base de Datos

El archivo `server.js` se despliega en **Render**, donde se ejecuta el servidor Node.js y expone la API públicamente en la URL raíz:

**🔗 [https://reto-leonardo.onrender.com](https://reto-leonardo.onrender.com)**

Los datos utilizados por la API están almacenados y gestionados en **MongoDB Atlas**, los cuales fueron gestionados previamente desde `setupCollections.js`.

## 👥 Equipo
- Diego Alejandro Paloma Diaz
- Eimy Yuliana Yate Quesada
- Juan David Caicedo Robles
