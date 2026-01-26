// database/metrics_scalar.js
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// ================== Datos globales ==================
const data = []; // métricas agregadas
const detalleAprendicesPath = path.join(__dirname, "detalleAprendices.json");
const detalleAprendices = JSON.parse(fs.readFileSync(detalleAprendicesPath, "utf-8"));

// ================== Cargar CSV ==================
const csvPath = path.join(__dirname, "metrics_scalar.csv");

function loadCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        let value = row.value;
        if (typeof value === "string" && value.includes("%")) {
          value = parseFloat(value.replace("%", ""));
        } else if (!isNaN(Number(value))) {
          value = Number(value);
        }
        data.push({
          metric: row.metric,
          description: row.description,
          value,
        });
      })
      .on("end", () => {
        console.log("✅ CSV cargado con éxito");
        resolve(data);
      })
      .on("error", reject);
  });
}

// ================== Funciones para endpoints ==================

// 1. Cantidad de aprendices por centro
function getAprendicesPorCentro() {
  const result = {};
  detalleAprendices.forEach((row) => {
    result[row.centro] = (result[row.centro] || 0) + 1;
  });
  return result;
}

// 2. Instructores recomendados por centro
function getInstructoresPorCentro() {
  const result = {};
  detalleAprendices.forEach((row) => {
    if (!result[row.centro]) result[row.centro] = new Set();
    result[row.centro].add(row.instructor_recomendado);
  });
  Object.keys(result).forEach((c) => (result[c] = Array.from(result[c])));
  return result;
}

// 3. Aprendices por centro y programa
function getAprendicesPorCentroPrograma() {
  const result = {};
  detalleAprendices.forEach((row) => {
    if (!result[row.centro]) result[row.centro] = {};
    const prog = row.programa;
    result[row.centro][prog] = (result[row.centro][prog] || 0) + 1;
  });
  return result;
}

// 4. Aprendices por departamento
function getAprendicesPorDepartamento() {
  const result = {};
  detalleAprendices.forEach((row) => {
    result[row.departamento] = (result[row.departamento] || 0) + 1;
  });
  return result;
}

// 5. Aprendices con GitHub
function getAprendicesConGithub() {
  return detalleAprendices.filter((row) => row.tiene_github).length;
}

// 6. Nivel de inglés por centro
function getNivelInglesPorCentro() {
  const result = {};
  detalleAprendices.forEach((row) => {
    if (!["B1", "B2"].includes(row.nivel_ingles)) return;
    if (!result[row.centro]) result[row.centro] = { B1: 0, B2: 0 };
    result[row.centro][row.nivel_ingles] += 1;
  });
  return result;
}

module.exports = {
  loadCSV,
  getAprendicesPorCentro,
  getInstructoresPorCentro,
  getAprendicesPorCentroPrograma,
  getAprendicesPorDepartamento,
  getAprendicesConGithub,
  getNivelInglesPorCentro,
};
