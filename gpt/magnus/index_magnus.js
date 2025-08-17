import { createAgent } from "../agents/createAgent.js";

export const magnus = {
  ...createAgent("magnus"),

  run: async (input, sendToDemeter, userAccepted = false) => {
    const response = magnus.generateResponse(input);

    console.log("\n🤖 Magnus generó este JSON (ideación):");
    console.log(response);

    if (userAccepted) {
      console.log("✅ Usuario aceptó guardar idea en Demeter.");
      sendToDemeter({
        agent: "magnus",
        data: response
      });
    } else {
      console.log("❌ Usuario NO quiso guardar la idea.");
    }

    return response;
  }
};
