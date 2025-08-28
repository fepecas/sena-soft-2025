require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ===== IMPORTAR NUEVAS RUTAS =====
const learnersMetricsRoutes = require('./routes/learners-metrics');

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

// ===== REGISTRAR NUEVAS RUTAS =====
app.use('/api/learners-metrics', learnersMetricsRoutes);

/* ===== Conexión a MongoDB ===== */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

/* ===== Modelo (colección metrics_scalar) ===== */
const metricSchema = new mongoose.Schema({}, { strict: false });
const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');

/* ===== Endpoints ===== */

// GET /metrics/scalar  → JSON siempre, sin 304 y sin cache
app.get('/metrics/scalar', async (req, res) => {
  try {
    const data = await Metric.find({}).lean();

    // Si quieres devolver SOLO los campos que usa el GPT:
    // const projected = data.map(({ description, value }) => ({ description, value }));

    res
      .status(200)
      .type('application/json; charset=utf-8')   // Content-Type explícito
      .set('Cache-Control', 'no-store')          // refuerzo por ruta
      .json(data);                               // o .json(projected)
  } catch (err) {
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

// ===== MANEJO DE ERRORES GLOBAL =====
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    code: 'UNHANDLED_ERROR'
  });
});

// ===== MANEJAR RUTAS NO ENCONTRADAS =====
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    code: 'ENDPOINT_NOT_FOUND'
  });
});

/* ===== Iniciar servidor ===== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
