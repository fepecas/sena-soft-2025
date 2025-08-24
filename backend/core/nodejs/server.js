require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
  loadCSV,
  getAprendicesPorCentro,
  getInstructoresPorCentro,
  getAprendicesPorCentroPrograma,
  getAprendicesPorDepartamento,
  getAprendicesConGithub,
  getNivelInglesPorCentro,
} = require("../database/metrics_scalar");

const app = express();

/* ===== Hardening y headers ===== */
app.set('etag', false);
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

/* ===== Middlewares ===== */
app.use(express.json());

// CORS desde ALLOWED_ORIGINS
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

/* ===== Modelo metrics_scalar (solo para CSV) ===== */
const metricSchema = new mongoose.Schema({}, { strict: false });
const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');

/* ===== Endpoints globales ===== */
app.get('/metrics/scalar', async (req, res) => {
  try {
    const data = await Metric.find({}).lean();
    res.status(200).type('application/json; charset=utf-8').set('Cache-Control', 'no-store').json(data);
  } catch (err) {
    res.status(500).type('application/json; charset=utf-8').json({ error: err.message });
  }
});

app.get('/health', (_req, res) => {
  res.status(200).type('application/json; charset=utf-8').set('Cache-Control', 'no-store').json({ ok: true });
});

/* ===== Endpoints dinámicos para Leonardo ===== */
app.get("/api/aprendices/centro", (req, res) => {
  const cantidad = getAprendicesPorCentro();
  res.json({ cantidad });
});

app.get("/api/instructores/centro", (req, res) => {
  const instructores = getInstructoresPorCentro();
  res.json(instructores);
});

app.get("/api/aprendices/centro-programa", (req, res) => {
  const data = getAprendicesPorCentroPrograma();
  res.json(data);
});

app.get("/api/aprendices/departamento", (req, res) => {
  const cantidad = getAprendicesPorDepartamento();
  res.json({ cantidad });
});

app.get("/api/aprendices/github", (req, res) => {
  const cantidad = getAprendicesConGithub();
  res.json({ cantidad });
});

app.get("/api/aprendices/ingles", (req, res) => {
  const niveles = getNivelInglesPorCentro();
  res.json(niveles);
});

/* ===== Iniciar servidor ===== */
const PORT = process.env.PORT || 3000;

loadCSV().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
