import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;
  if (!uri || !dbName) throw new Error('Missing MONGODB_URI or DB_NAME');

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to MongoDB db=${dbName}`);
}

export function getDb(): Db {
  if (!db) throw new Error('Mongo not initialized');
  return db;
}

export function collection<T = any>(name: string) {
  return getDb().collection<T>(name);
}