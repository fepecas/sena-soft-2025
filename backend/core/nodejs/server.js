require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
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
  .catch(err => console.error("❌ Error de conexión:", err))


// 📦 Modelo genérico para aprendices
const aprendizSchema = new mongoose.Schema({}, { strict: false });
const Aprendiz = mongoose.model("Aprendiz", aprendizSchema, "aprendices");

/* ===== Modelo (colección metrics_scalar) ===== */
const metricSchema = new mongoose.Schema({}, { strict: false });
const Metric = mongoose.model('metrics_scalar', metricSchema, 'metrics_scalar');


/* ===== Endpoints ===== */
app.get('/metrics/scalar', async (req, res) => {
  try {
    const { tipo } = req.query;

    let resultado = [];

    // Tipo 1: métricas ya cargadas en la colección 'metrics_scalar'
    if (!tipo) {
      const data = await Metric.find({}).lean();
      resultado = data.map(({ description, value }) => ({
        description,
        value
      }));
    }

    // Tipo 2: cantidad de aprendices por centro
    else if (tipo === 'por-centro') {
      const data = await Aprendiz.find({}).lean();
      const agrupado = {};
      for (const doc of data) {
        const centro = doc.centro?.nombre_centro || 'Desconocido';
        agrupado[centro] = (agrupado[centro] || 0) + 1;
      }
      resultado = Object.entries(agrupado).map(([centro, count]) => ({
        description: `Aprendices en ${centro}`,
        value: count
      }));
    }

    // Tipo 3: instructores recomendados por centro
    else if (tipo === 'instructores-por-centro') {
      const data = await Aprendiz.find({}).lean();
      const agrupado = {};
      for (const doc of data) {
        const centro = doc.centro?.nombre_centro || 'Desconocido';
        const instructor = doc.instructor_recomendado;
        if (instructor) {
          if (!agrupado[centro]) agrupado[centro] = new Set();
          agrupado[centro].add(instructor.nombre_instructor);
        }
      }
      resultado = Object.entries(agrupado).map(([centro, instructores]) => ({
        description: `Instructores recomendados en ${centro}`,
        value: Array.from(instructores).join(', ')
      }));
    }

    // Tipo 4: cantidad de aprendices por centro y programa (máx 4 programas)
    else if (tipo === 'por-centro-programa') {
      const data = await Aprendiz.find({}).lean();
      const agrupado = {};
      for (const doc of data) {
        const centro = doc.centro?.nombre_centro || 'Desconocido';
        const programa = doc.programa_formacion || 'Sin programa';
        if (!agrupado[centro]) agrupado[centro] = {};
        agrupado[centro][programa] = (agrupado[centro][programa] || 0) + 1;
      }
      for (const [centro, programas] of Object.entries(agrupado)) {
        const top4 = Object.entries(programas).slice(0, 4);
        for (const [programa, count] of top4) {
          resultado.push({
            description: `Aprendices en ${centro} - ${programa}`,
            value: count
          });
        }
      }
    }

    // Tipo 5: cantidad por departamento (de los que respondieron)
    else if (tipo === 'por-departamento') {
      const data = await Aprendiz.find({ "departamento_residencia": { $exists: true, $ne: null } }).lean();
      const agrupado = {};
      for (const doc of data) {
        const dpto = doc.departamento_residencia || 'Desconocido';
        agrupado[dpto] = (agrupado[dpto] || 0) + 1;
      }
      resultado = Object.entries(agrupado).map(([departamento, count]) => ({
        description: `Aprendices en ${departamento}`,
        value: count
      }));
    }

    // Tipo 6: cantidad con usuario GitHub
    else if (tipo === 'con-github') {
      const data = await Aprendiz.find({}).lean();
      const count = data.filter(d => d.tiene_github === true).length;
      resultado.push({
        description: "Aprendices con usuario de GitHub",
        value: count
      });
    }

    // Tipo 7: nivel de inglés B1 o B2 por centro
    else if (tipo === 'ingles-b1-b2-por-centro') {
      const data = await Aprendiz.find({}).lean();
      const agrupado = {};
      for (const doc of data) {
        if (["B1", "B2"].includes(doc.nivel_ingles)) {
          const centro = doc.centro?.nombre_centro || 'Desconocido';
          agrupado[centro] = (agrupado[centro] || 0) + 1;
        }
      }
      resultado = Object.entries(agrupado).map(([centro, count]) => ({
        description: `Aprendices con inglés B1 o B2 en ${centro}`,
        value: count
      }));
    }

    // Tipo no válido
    else {
      return res
        .status(400)
        .type('application/json; charset=utf-8')
        .json({ error: `Tipo de métrica no válido: ${tipo}` });
    }

    // Respuesta final
    res
      .status(200)
      .type('application/json; charset=utf-8')
      .set('Cache-Control', 'no-store')
      .json(resultado);

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


/* ===== Iniciar servidor ===== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});