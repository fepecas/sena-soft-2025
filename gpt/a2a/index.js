// a2a/index.js
import { validateMessage } from "./validator.js";
import { saveExchange, getHistory } from "./store.js";

const agents = {}; // simulación de agentes conectados

// Registrar un agente (ej: assistant1, demeter, etc.)
export function registerAgent(name, handler) {
  agents[name] = handler;
}

// Enviar un mensaje A2A
export function sendMessage(message) {
  if (!validateMessage(message)) {
    console.error("❌ Mensaje inválido según schema");
    return;
  }

  // Guardar en historial
  saveExchange(message);

  const to = message.to_agent;
  if (agents[to]) {
    agents[to](message); // entrega al agente destino
  } else {
    console.error(`❌ Agente ${to} no encontrado`);
  }
}

// Consultar historial (usado por Demeter)
export function fetchHistory(filter = {}) {
  return getHistory(filter);
}
