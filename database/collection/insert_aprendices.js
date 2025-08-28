// Archivo: insert_aprendices.js

// Importa los datos del archivo JSON.
// Asegúrate de que el archivo 'aprendices.json' esté en el mismo directorio.
const aprendicesData = require('./aprendices.json');

// Define una función asincrónica para la conexión e inserción.
async function insertAprendices() {
  const { MongoClient } = require('mongodb');

  // URL de conexión a tu base de datos MongoDB.
  // Reemplaza <username>, <password> y <cluster> con tus credenciales si usas Atlas.
  const uri = "mongodb://localhost:27017/senasoft";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conecta el cliente al servidor.
    await client.connect();
    console.log("Conectado exitosamente a la base de datos.");

    // Selecciona la base de datos y la colección.
    const database = client.db('senasoft');
    const collection = database.collection('aprendices');

    // Inserta los documentos.
    const result = await collection.insertMany(aprendicesData);
    console.log(`${result.insertedCount} documentos insertados en la colección 'aprendices'.`);

  } finally {
    // Cierra la conexión cuando termines o si ocurre un error.
    await client.close();
    console.log("Conexión cerrada.");
  }
}

// Llama a la función para ejecutar el script.
insertAprendices().catch(console.error);