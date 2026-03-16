import express from "express";
import fs from "fs";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 3000;

// Conexión a MongoDB local (ajusta si usas Atlas o Docker)
const client = new MongoClient("mongodb://localhost:27017");

async function init() {
  await client.connect();
  console.log("✅ Conectado a MongoDB");

  const db = client.db("senasoft");
  const metrics = db.collection("metrics_scalar");

  // Leer dataset desde JSON
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

  // Si la colección está vacía, insertar datos
  if ((await metrics.countDocuments()) === 0) {
    await metrics.insertMany(data);
    console.log("📥 Datos cargados en MongoDB desde data.json");
  }

  // ------------------ ENDPOINTS ------------------

  // 1. Aprendices por centro
  app.get("/metrics/aprendices-por-centro", async (req, res) => {
    const docs = await metrics.find().toArray();
    const result = {};
    docs.forEach(aprendiz => {
      result[aprendiz.centro_formacion] =
        (result[aprendiz.centro_formacion] || 0) + 1;
    });
    res.json(result);
  });

  // 2. Instructores recomendados por centro
  app.get("/metrics/instructores-por-centro", async (req, res) => {
    const docs = await metrics.find().toArray();
    const result = {};
    docs.forEach(aprendiz => {
      if (!result[aprendiz.centro_formacion]) {
        result[aprendiz.centro_formacion] = new Set();
      }
      result[aprendiz.centro_formacion].add(aprendiz.instructor_recomendado);
    });

    // convertir Set a array
    const formatted = {};
    for (const [centro, instructores] of Object.entries(result)) {
      formatted[centro] = [...instructores];
    }

    res.json(formatted);
  });

  // 3. Aprendices por centro y programa
  app.get("/metrics/aprendices-centro-programa", async (req, res) => {
    const docs = await metrics.find().toArray();
    const result = {};
    docs.forEach(aprendiz => {
      if (!result[aprendiz.centro_formacion]) {
        result[aprendiz.centro_formacion] = {};
      }
      result[aprendiz.centro_formacion][aprendiz.programa_formacion] =
        (result[aprendiz.centro_formacion][aprendiz.programa_formacion] || 0) + 1;
    });
    res.json(result);
  });

  // 4. Aprendices por departamento
  app.get("/metrics/aprendices-por-departamento", async (req, res) => {
    const docs = await metrics.find().toArray();
    const result = {};
    docs.forEach(aprendiz => {
      result[aprendiz.departamento] =
        (result[aprendiz.departamento] || 0) + 1;
    });
    res.json(result);
  });

  // 5. Aprendices con GitHub
  app.get("/metrics/con-github", async (req, res) => {
    const cantidad = await metrics.countDocuments({ github: true });
    res.json({ cantidad });
  });

  // 6. Inglés B1 o B2 por centro
  app.get("/metrics/ingles-por-centro", async (req, res) => {
    const docs = await metrics.find({ nivel_ingles: { $in: ["B1", "B2"] } }).toArray();
    const result = {};
    docs.forEach(aprendiz => {
      if (!result[aprendiz.centro_formacion]) result[aprendiz.centro_formacion] = 0;
      result[aprendiz.centro_formacion]++;
    });
    res.json(result);
  });

  // 7. Aprendices con certificados
  app.get("/metrics/con-certificados", async (req, res) => {
    const cantidad = await metrics.countDocuments({ certificados: { $gt: 0 } });
    res.json({ cantidad });
  });

  // 8. Menores de edad
  app.get("/metrics/menores-edad", async (req, res) => {
    const menores = await metrics.find({ edad: { $lt: 18 } }).toArray();
    const total = menores.length;
    const ninas = menores.filter(a => a.genero === "F").length;
    const ninos = menores.filter(a => a.genero === "M").length;

    res.json({
      total,
      porcentaje_ninas: ((ninas / total) * 100).toFixed(2) + "%",
      porcentaje_ninos: ((ninos / total) * 100).toFixed(2) + "%"
    });
  });

  // 9. Uso de IA
  app.get("/metrics/uso-ia", async (req, res) => {
    const total = await metrics.countDocuments();
    const usanIA = await metrics.countDocuments({ usa_ia: true });
    const complementaria = await metrics.countDocuments({ ia_para_codificar: true });
    const instructoresIA = await metrics.countDocuments({ instructor_usa_ia: true });
    const instructoresFormanIA = await metrics.countDocuments({ instructor_ensenia_ia: true });

    res.json({
      cantidad: usanIA,
      porcentaje_usada_para_codificar: ((complementaria / total) * 100).toFixed(2) + "%",
      porcentaje_instructores_usanIA: ((instructoresIA / total) * 100).toFixed(2) + "%",
      porcentaje_instructores_formanIA: ((instructoresFormanIA / total) * 100).toFixed(2) + "%"
    });
  });

  // ------------------------------------------------

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

init();
