import { saveToDB, saveAgentConversation } from "./gpt/demeter/db.js";

// Simulación de mensajes de conversación (Lyra/Demeter)
const demoMessages = [
  { sender: "user", text: "Hola IA, ayúdame con un proyecto" },
  { sender: "quiliano", text: "Claro, te haré un perfil de aprendiz" },
];

// Simulación de respuesta de Quiliano (perfil)
const demoProfile = {
  General: {
    nombre_aprendiz: "Carlos",
    duracion_total: "6 meses",
    numero_interacciones: 5,
    sentimiento: "positivo",
    pegar_de_internet: 0
  },
  Especifico: {
    habilidades: ["Java", "MySQL"],
    proyectos_previos: ["Sistema hospitalario"],
    motivacion: "Participar en SENASoft"
  }
};

// Simulación de respuesta de Magnus (idea)
const demoIdea = {
  titulo: "Sistema de Gestión de Hospitales",
  descripcion: "Una plataforma para mejorar la gestión de pacientes y recursos",
  impacto: "Facilitar la atención médica",
  tecnologias: ["Laravel", "MySQL", "Docker"]
};

async function runTests() {
  // 1. Guardar conversación general
  await saveToDB(demoMessages, "conv_test_001");

  // 2. Guardar perfil generado por Quiliano
  await saveAgentConversation("quiliano", demoProfile, "conv_test_001");

  // 3. Guardar idea generada por Magnus
  await saveAgentConversation("magnus", demoIdea, "conv_test_001");

  console.log("✅ Test finalizado: datos guardados en MongoDB");
}

runTests().catch(console.error);
