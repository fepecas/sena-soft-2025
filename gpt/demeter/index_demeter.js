import fs from "fs";
import path from "path";

// Ruta donde se guarda el histórico de mensajes JSON
const demeterPath = path.resolve("./gpt/demeter/response_demeter.json");

// 🔹 Mantén aquí tu código original de demeter (receive, validate, storeData, etc.)

// 🔹 Nueva función para agregar mensajes crudos a response_demeter.json
export async function appendToDemeter(message) {
  let data = [];
  if (fs.existsSync(demeterPath)) {
    data = JSON.parse(fs.readFileSync(demeterPath, "utf-8"));
  }
  data.push(message);
  fs.writeFileSync(demeterPath, JSON.stringify(data, null, 2));
}
