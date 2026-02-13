//Cambiamos la configuración del dotenv porque no se
//podian leer las variables de entorno
require('dotenv').config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* ===== Hardening y headers ===== */
// 1) Desactiva ETag para que NUNCA devuelva 304
app.set('etag', false);

// 2) Desactiva X-Powered-By (higiene)
app.disable('x-powered-by');

// 3) Fuerza no-cache a nivel global (puedes afinar por ruta si prefieres)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');     // sin cache
  next();
});

/* ===== Middlewares ===== */
app.use(express.json());

// CORS desde ALLOWED_ORIGINS (manteniendo la lógica inicial)
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  }
}));

/* ===== Conexión a MongoDB ===== */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

/* ===== Modelo (colección metrics_scalar) ===== */
const metricSchema = new mongoose.Schema({
  aprendiz: String,
  centroFormacion: String,
  programa: String,
  departamento: String,
  instructorRecomendado: String,
  github: Boolean,
  nivelIngles: String
});

const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');

/** Generamos el esquema para los datos genericos */
const Generic = mongoose.model('pruebaLeonardo', metricSchema, 'InfoSenaSoft')

/* ===== Endpoints ===== */

// GET /metrics/scalar  → JSON siempre, sin 304 y sin cache
app.get('/metrics/scalar', async (req, res) => {
  try {
    const data = await Generic.find({}).lean(); // Colección 'InfoSenaSoft'

    // Métrica 1: Cantidad de aprendices por centro
    const aprendicesPorCentro = {};
    const instructoresPorCentro = {};
    const programasPermitidos = [
      "Desarrollo de Software",
      "Análisis y Desarrollo de Sistemas",
      "Diseño de Software",
      "Administración de Redes"
    ];
    const centroPrograma = {};
    const aprendicesPorDepartamento = {};
    let conGitHub = 0;
    const inglesPorCentro = {};

    data.forEach(aprendiz => {
      const centro = aprendiz.centroFormacion;
      const programa = aprendiz.programa;
      const depto = aprendiz.departamento;
      const tieneGitHub = aprendiz.github === true;
      const nivelIngles = aprendiz.nivelIngles;
      const instructor = aprendiz.instructorRecomendado;

      // 1. Por centro
      aprendicesPorCentro[centro] = (aprendicesPorCentro[centro] || 0) + 1;

      // 2. Instructores recomendados por centro
      if (!instructoresPorCentro[centro]) instructoresPorCentro[centro] = [];
      if (!instructoresPorCentro[centro].includes(instructor)) {
        instructoresPorCentro[centro].push(instructor);
      }

      // 3. Por centro y programa (solo 4 permitidos)
      if (programasPermitidos.includes(programa)) {
        if (!centroPrograma[centro]) centroPrograma[centro] = {};
        centroPrograma[centro][programa] = (centroPrograma[centro][programa] || 0) + 1;
      }

      // 4. Por departamento
      aprendicesPorDepartamento[depto] = (aprendicesPorDepartamento[depto] || 0) + 1;

      // 5. GitHub
      if (tieneGitHub) conGitHub++;

      // 6. Inglés B1 o B2 por centro
      if (nivelIngles === "B1" || nivelIngles === "B2") {
        if (!inglesPorCentro[centro]) inglesPorCentro[centro] = 0;
        inglesPorCentro[centro]++;
      }
    });

    const response = [
      {
        description: "Cantidad de aprendices inscritos por centro de formación",
        value: aprendicesPorCentro
      },
      {
        description: "Instructores recomendados por aprendices inscritos por centro de formación",
        value: instructoresPorCentro
      },
      {
        description: "Cantidad de aprendices inscritos por centro y programa de formación",
        value: centroPrograma
      },
      {
        description: "Cantidad de aprendices que reportan tener un usuario de GitHub",
        value: conGitHub
      },
      {
        description: "Cantidad de aprendices por departamento de Colombia donde residen",
        value: aprendicesPorDepartamento
      },
      {
        description: "Cantidad de aprendices con nivel de inglés B1 o B2 por centro de formación",
        value: inglesPorCentro
      }
    ];

    res
      .status(200)
      .type('application/json; charset=utf-8')
      .set('Cache-Control', 'no-store')
      .json(response);

  } catch (err) {
    console.error("Error en /metrics/scalar:", err);
    res
      .status(500)
      .type('application/json; charset=utf-8')
      .json({ error: err.message });
  }
});

/* (Opcional) Healthcheck rápido */
app.get('/health', (_req, res) => {
  res
    .status(200)
    .type('application/json; charset=utf-8')
    .set('Cache-Control', 'no-store')
    .json({ ok: true });
});

/* ===== Iniciar servidor ===== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});