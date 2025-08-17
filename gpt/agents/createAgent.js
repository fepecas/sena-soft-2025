import { v4 as uuidv4 } from "uuid";
import { saveExchange, getHistory, finalizeConversation } from "../a2a/store.js";

export function createAgent(agentName) {
  return {
    name: agentName,

    async sendUserMessage(content, conversationId = null) {
      const id = conversationId || uuidv4();
      const userMsg = {
        exchange_id: id,
        from_agent: "user",
        to_agent: agentName,
        timestamp: new Date().toISOString(),
        payload: { type: "conversation_update", content, metadata: { confidence: 1, context: "user", tags: [] } }
      };
      await saveExchange(userMsg, id);

      // IA responde automáticamente para la simulación
      const iaContent = `Respuesta de ${agentName} a "${content}"`;
      const iaMsg = {
        exchange_id: id,
        from_agent: agentName,
        to_agent: "user",
        timestamp: new Date().toISOString(),
        payload: { type: "conversation_update", content: iaContent, metadata: { confidence: 1, context: "IA", tags: [] } }
      };
      await saveExchange(iaMsg, id);

      return id; // retorna el ID de la conversación
    },

    async requestHistory(conversationId) {
      const messages = getHistory({ fromAgent: this.name, conversationId });
      console.log(`📜 Historial de ${this.name}:`, messages.map(m => m.payload.content));
    },

    async requestStats() {
      const messages = getHistory();
      const countByAgent = {};
      messages.forEach(m => {
        countByAgent[m.from_agent] = (countByAgent[m.from_agent] || 0) + 1;
      });
      console.log(`📊 Estadísticas de mensajes para ${this.name}:`, countByAgent);
    },

    async endConversation(conversationId) {
      await finalizeConversation(conversationId);
      console.log(`✅ Conversación finalizada para ${conversationId} con ${this.name}`);
    }
  };
}
