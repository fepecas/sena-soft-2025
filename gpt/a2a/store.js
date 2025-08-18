import { validateMessage } from "./validator.js";
import { saveToDB } from "../demeter/db.js";

let history = [];

export async function saveExchange(message, conversationId) {
  if (!validateMessage(message)) return false;
  history.push({ ...message, conversationId });
  return true;
}

export function getHistory({ fromAgent = null, conversationId = null } = {}) {
  return history.filter(m => 
    (!fromAgent || m.from_agent === fromAgent) &&
    (!conversationId || m.conversationId === conversationId)
  );
}

// Simulación: cuando se finaliza conversación, envía a Demeter para DB
export async function finalizeConversation(conversationId) {
  const convMessages = history.filter(m => m.conversationId === conversationId);
  if (convMessages.length > 0) {
    await saveToDB(convMessages, conversationId);
  }
}
