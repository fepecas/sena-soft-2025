require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

/* ===== Modelos ===== */
const metricSchema = new mongoose.Schema({}, { strict: false });
const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');

const aprendizSchema = new mongoose.Schema({}, { strict: false });
const Aprendiz = mongoose.model("aprendices", aprendizSchema, "aprendices");

/* ===== Endpoints existentes ===== */
app.get('/metrics/scalar', async (req, res) => {
  try {
    const data = await Metric.find({}).lean();
    res
      .status(200)
      .type('application/json; charset=utf-8')
      .set('Cache-Control', 'no-store')
      .json(data);
  } catch (err) {
    res
      .status(500)
      .type('application/json; charset=utf-8')
      .json({ error: err.message });
  }
});

app.get('/health', (_req, res) => {
  res
    .status(200)
    .type('application/json; charset=utf-8')
    .set('Cache-Control', 'no-store')
    .json({ ok: true });
});

/* ===== Endpoints nuevos (reto) ===== */

// 1) inscritos por centro
app.get("/metrics/inscritos/centro", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      { $group: { _id: "$centro_formacion", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2) instructores por centro
app.get("/metrics/instructores/centro", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      { $unwind: "$instructores_recomendados" },
      {
        $group: {
          _id: "$centro_formacion",
          instructores: { $addToSet: "$instructores_recomendados.nombre" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3) inscritos por centro y programa
app.get("/metrics/inscritos/centro-programa", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      {
        $group: {
          _id: { centro: "$centro_formacion", programa: "$programa" },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.centro": 1, "_id.programa": 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4) inscritos por departamento
app.get("/metrics/inscritos/departamento", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      { $group: { _id: "$departamento", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5) aprendices con GitHub
app.get("/metrics/inscritos/github", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      { $match: { github: true } },
      { $count: "total_con_github" }
    ]);
    res.json(result[0] || { total_con_github: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6) aprendices con inglés B1/B2 por centro
app.get("/metrics/inscritos/ingles", async (req, res) => {
  try {
    const result = await Aprendiz.aggregate([
      { $match: { nivel_ingles: { $in: ["B1", "B2"] } } },
      { $group: { _id: "$centro_formacion", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===== Iniciar servidor ===== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
});
