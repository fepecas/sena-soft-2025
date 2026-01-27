require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
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

// CORS desde ALLOWED_ORIGINS (mantengo tu lógica)
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
  metric: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');

/* ===== Endpoints ===== */

// GET /metrics/scalar  → JSON siempre, sin 304 y sin cache
app.get('/metrics/scalar', async (req, res) => {
  try {
    // Consultar los datos desde el endpoint de Vercel
    const response = await axios.get('https://endpoint-pearl.vercel.app/data');
    const data = response.data.data;

    // Crear un objeto para almacenar las métricas procesadas
    const metrics = {
      cantidadAprendicesPorCentro: {},
      instructoresPorCentro: {},
      cantidadAprendicesPorDepartamento: {},
      cantidadAprendicesConGitHub: 0,
      cantidadAprendicesNivelIngles: {}
    };

    // Procesar los datos
    data.forEach(record => {
      // 1. Contar aprendices por centro de formación
      if (!metrics.cantidadAprendicesPorCentro[record.centro_de_formacion]) {
        metrics.cantidadAprendicesPorCentro[record.centro_de_formacion] = 0;
      }
      metrics.cantidadAprendicesPorCentro[record.centro_de_formacion]++;

      // 2. Instructores recomendados por centro de formación
      if (!metrics.instructoresPorCentro[record.centro_de_formacion]) {
        metrics.instructoresPorCentro[record.centro_de_formacion] = [];
      }
      if (!metrics.instructoresPorCentro[record.centro_de_formacion].includes(record.nombre_instructor)) {
        metrics.instructoresPorCentro[record.centro_de_formacion].push(record.nombre_instructor);
      }

      // 3. Contar aprendices por departamento
      if (!metrics.cantidadAprendicesPorDepartamento[record.departamento_residencia]) {
        metrics.cantidadAprendicesPorDepartamento[record.departamento_residencia] = 0;
      }
      metrics.cantidadAprendicesPorDepartamento[record.departamento_residencia]++;

      // 4. Contar aprendices con GitHub
      if (record.usuario_github) {
        metrics.cantidadAprendicesConGitHub++;
      }

      // 5. Contar aprendices con nivel de inglés B1 o B2
      if (record.nivel_ingles === "B1" || record.nivel_ingles === "B2") {
        if (!metrics.cantidadAprendicesNivelIngles[record.nivel_ingles]) {
          metrics.cantidadAprendicesNivelIngles[record.nivel_ingles] = 0;
        }
        metrics.cantidadAprendicesNivelIngles[record.nivel_ingles]++;
      }
    });

    // Responder con las métricas procesadas
    res.status(200).json(metrics);

  } catch (err) {
    // En caso de error, devolver el mensaje de error
    res.status(500).json({ error: err.message });
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
