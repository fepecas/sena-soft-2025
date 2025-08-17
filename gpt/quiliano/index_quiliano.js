import { createAgent } from "../agents/createAgent.js";

export const quiliano = {
  ...createAgent("quiliano"),

  run: async (input, sendToDemeter, userAccepted = false) => {
    const response = quiliano.generateResponse(input);

    console.log("\n🤖 Quiliano generó este JSON (perfil):");
    console.log(response);

    if (userAccepted) {
      console.log("✅ Usuario aceptó guardar perfil en Demeter.");
      sendToDemeter({
        agent: "quiliano",
        data: response
      });
    } else {
      console.log("❌ Usuario NO quiso guardar el perfil.");
    }

    return response;
  }
};
