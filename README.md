![Framework de Programación Competitiva](https://github.com/fepecas/senasoft/blob/main/diagram02.png?raw=true)
[Sigue este enlace para ver el diagrama en Draw.io](https://drive.google.com/file/d/18TtAmJ8J3JPOQkRFg85l-nEeobs-Hc27/view?usp=sharing)

## 🔍 Solution Overview

#### 📂 [admission/](admission/)

Materials for the admission process, including forms and informational sections.

- [`form/`](admission/form/): forms used in the admission process.
- [`memes/`](admission/memes/): funny images related to the competition.

#### 📁 [community/](community/)

Resources for the community, shaping the look and feel of virtual spaces.

- [`github/`](community/github/): this platform will be used as a learning lab.
- [`meet/`](community/meet/): live streaming.
- [`spotify/`](community/spotify/): all the assets related to "Bitácora Sintética".
- [`suno/`](community/meet/): this AI was used to cread the opening theme for the podcast.
- [`whatsapp/`](community/whatsapp/): WhatsApp groups and resources.

#### 📁 [gpt/](gpt/)

AI assistants and materials related to the Synthetic Team.

- [`ada/`](gpt/ada/): advice about the tech stack used by the teams.
- [`alan/`](gpt/alan/): synthetic jury that evaluates tech requirements.
- [`eleanor/`](gpt/eleanor/): advice about presenting the MVP in the AI Arena.
- [`leonardo/`](gpt/leonardo/): answers frequent questions from participants.
- [`magnus/`](gpt/magnus/): profiles the social and technical skills of participants.
- [`quiliano/`](gpt/quiliano/): guides the ideation of AI-powered products.

#### 📁 [roadmap/](roadmap/)

This folder contains everything used to create the illustrated roadmap for the competition.

- [`assets/`](roadmap/assets/): graphic elements added layer by layer.
- [`deck/`](roadmap/deck/): assets used in the presentation deck.
- [`layers/`](roadmap/layers/): prompts and intermediate images organized by generation.
- [`reference/`](roadmap/reference/): [sketches and reference photos](roadmap/reference/photo_whiteboard_step6.jpg).
- [`tests/`](roadmap/tests/): initial conceptual tests.
- [`video/`](roadmap/video/): assets used in the offline-recording.

## 🚀 Backend API - SENASoft 2025

### Configuración del Proyecto

#### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB Atlas o instancia local de MongoDB
- npm o yarn

#### Instalación

1. Navega al directorio del backend:
```bash
cd backend/core/nodejs
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.development
```

4. Edita `.env.development` con tus credenciales de MongoDB:
```
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/senasoft
PORT=8080
ALLOWED_ORIGINS=*
```

#### Carga de Datos de Ejemplo

Para cargar los datos de inscripciones de ejemplo en MongoDB:

```bash
mongoimport --db senasoft --collection inscripciones --file ./database/inscripciones.json --jsonArray
```

#### Ejecutar el Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:8080`

### 📊 Endpoints de Métricas

#### Métricas Existentes

**GET** `/metrics/scalar`
- Devuelve métricas escalares básicas de inscripción
- Respuesta: Array de objetos con `description` y `value`

**GET** `/health`
- Healthcheck del servidor
- Respuesta: `{ "ok": true }`

#### Nuevas Métricas de Inscripciones

**GET** `/metrics/inscritos-por-centro`
- Cantidad de aprendices inscritos por centro de formación
- Respuesta:
```json
[
  { "centro_formacion": "Centro de Automatización Industrial", "count": 5 },
  { "centro_formacion": "Centro de Diseño y Metrología", "count": 4 }
]
```

**GET** `/metrics/instructores-por-centro`
- Instructores recomendados agrupados por centro de formación
- Respuesta:
```json
[
  { 
    "centro_formacion": "Centro de Automatización Industrial", 
    "instructores": ["Carlos Gómez", "Ana Torres"] 
  },
  { 
    "centro_formacion": "Centro de Diseño y Metrología", 
    "instructores": ["María Ruiz", "Ana Torres"] 
  }
]
```

**GET** `/metrics/inscritos-por-centro-programa`
- Cantidad de aprendices por centro y programa de formación
- Respuesta:
```json
[
  { 
    "centro_formacion": "Centro de Automatización Industrial", 
    "programa_formacion": "ADSO", 
    "count": 4 
  },
  { 
    "centro_formacion": "Centro de Diseño y Metrología", 
    "programa_formacion": "Multimedia", 
    "count": 3 
  }
]
```

**GET** `/metrics/inscritos-por-departamento`
- Cantidad de aprendices por departamento de Colombia
- Respuesta:
```json
[
  { "departamento": "Antioquia", "count": 6 },
  { "departamento": "Cundinamarca", "count": 4 },
  { "departamento": "Valle del Cauca", "count": 2 }
]
```

**GET** `/metrics/inscritos-con-github`
- Cantidad de aprendices con usuario de GitHub registrado
- Respuesta:
```json
{ "con_github": 9 }
```

**GET** `/metrics/inscritos-con-ingles`
- Cantidad de aprendices con nivel de inglés B1 o B2 por centro
- Respuesta:
```json
[
  { "centro_formacion": "Centro de Automatización Industrial", "count": 3 },
  { "centro_formacion": "Centro de Diseño y Metrología", "count": 2 }
]
```

### 🗄️ Estructura de Datos

#### Colección `inscripciones`
```json
{
  "aprendiz_id": "A001",
  "nombre": "Laura Martínez",
  "centro_formacion": "Centro de Automatización Industrial",
  "programa_formacion": "ADSO",
  "departamento": "Antioquia",
  "instructor_recomendado": "Carlos Gómez",
  "github_user": "lauramdev",
  "nivel_ingles": "B1"
}
```

**Programas de formación permitidos:**
- ADSO (Análisis y Desarrollo de Software)
- Multimedia
- Ciberseguridad
- Animación 3D

**Niveles de inglés:**
- A1, A2, B1, B2

### 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Base de datos:** MongoDB con Mongoose ODM
- **Agregaciones:** MongoDB Aggregation Pipeline
- **CORS:** Configurado para múltiples orígenes
- **Variables de entorno:** dotenv

👥 Equipo de Desarrollo – Three Amigos  SENA CEDE ALTO CAUCA POPAYAN

David Santiago Rengifo Guacheta – Líder de Grupo y Arquitecto de Prompt Web 

Bryan Andrés Hurtado Caicedo – Desarrollador Backend y Modelador de Datos

Darci Fernanda Gonzales Paz – Arquitecta de Prompts Moviles diseñadora UX