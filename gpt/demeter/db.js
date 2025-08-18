import { MongoClient } from "mongodb";
import fs from "fs";

// --- CONFIG DE CONEXIÓN ---
const DB_USER = "user";
const DB_PASSWORD = "password";
const DB_NAME = "NameDB";

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zagfq6p.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let dbInstance = null;

export async function connectDB() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(DB_NAME);
  }
  return dbInstance;
}

// 🔹 Guardar o actualizar mensajes de una conversación (Lyra/Demeter)
export async function saveToDB(messages, conversationId) {
  const db = await connectDB();
  const collection = db.collection("conversations"); // siempre aquí
  await collection.updateOne(
    { conversationId },
    { $set: { conversationId, messages } },
    { upsert: true }
  );
  console.log(`💾 Conversación ${conversationId} guardada en MongoDB`);
}

// 🔹 Guardar data según el agente (Quiliano/Magnus/otros)
export async function saveAgentConversation(agent, data, conversationId) {
  const db = await connectDB();

  let collectionName = "conversations"; // por defecto

  if (agent === "quiliano") {
    collectionName = "profiles";   // perfiles
  } else if (agent === "magnus") {
    collectionName = "ideas";      // ideas
  }

  const collection = db.collection(collectionName);

  await collection.insertOne({
    agent,
    conversationId,
    data,
    createdAt: new Date()
  });

  console.log(`💾 Guardado en colección [${collectionName}] con conversationId=${conversationId}`);
}