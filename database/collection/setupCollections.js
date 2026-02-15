const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

async function setupCollections() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || "learning_metrics");
    console.log(" Conexión MongoDB establecida");

    const collections = [
      {
        name: "aprendices",
        options: {
          validator: {
            $jsonSchema: {
              bsonType: "object",
              required: ["nombre", "correo_personal", "centro_formacion", "nivel_ingles"],
              properties: {
                nombre: { bsonType: "string" },
                correo_personal: { bsonType: "string", pattern: "^.+@.+\\..+$" },
                correo_institucional: { bsonType: "string", pattern: "^.+@.+\\..+$" },
                github: { bsonType: "bool" },
                usuario_github: { bsonType: "string" },
                nivel_ingles: { enum: ["A1", "A2", "B1", "B2", "C1", "C2"] },
                centro_formacion: { bsonType: "string" },
                programa: { bsonType: "string" },
                departamento: { bsonType: "string" },
                created_at: { bsonType: "date" },
                updated_at: { bsonType: "date" }
              }
            }
          }
        }
      },
      { name: "centros_formacion" },
      { name: "programas_formacion" },
      { name: "departamentos" },
      { name: "ciudades" },
      { name: "instructores" }
    ];

    const existing = await db.listCollections().toArray();
    const existingNames = existing.map(c => c.name);

    for (const { name, options } of collections) {
      if (!existingNames.includes(name)) {
        await db.createCollection(name, options || {});
        console.log(`Se creó la colección: ${name}`);
      } else {
        console.log(` Ya existía la colección: ${name}`);
      }
    }

    await db.collection("aprendices").createIndex({ correo_personal: 1 }, { unique: true });
    await db.collection("aprendices").createIndex({ correo_institucional: 1 }, { unique: true });
    await db.collection("aprendices").createIndex({ centro_formacion: 1, programa: 1 });
    await db.collection("aprendices").createIndex({ departamento: 1 });
    await db.collection("aprendices").createIndex({ github: 1 });
    await db.collection("aprendices").createIndex({ nivel_ingles: 1, centro_formacion: 1 });

    console.log(" Índices listos");

    const count = await db.collection("aprendices").countDocuments();
    if (count === 0) {
      await db.collection("aprendices").insertMany([
         {
    nombre: "Juan López",
    correo_personal: "juan@example.com",
    correo_institucional: "juan@sena.edu.co",
    centro_formacion: "CF Medellín",
    programa: "ADSI",
    departamento: "Antioquia",
    github: false,
    nivel_ingles: "A2",
    instructores_recomendados: [{ nombre: "Ana Torres", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "María Ruiz",
    correo_personal: "maria@example.com",
    correo_institucional: "maria@sena.edu.co",
    centro_formacion: "CF Medellín",
    programa: "Multimedia",
    departamento: "Antioquia",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Carlos Gómez", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Pedro Martínez",
    correo_personal: "pedro@example.com",
    correo_institucional: "pedro@sena.edu.co",
    centro_formacion: "CF Bogotá",
    programa: "Software",
    departamento: "Cundinamarca",
    github: true,
    nivel_ingles: "B1",
    instructores_recomendados: [{ nombre: "Lucía Herrera", especialidad: "IA" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Laura Fernández",
    correo_personal: "laura@example.com",
    correo_institucional: "laura@sena.edu.co",
    centro_formacion: "CF Cali",
    programa: "ADSI",
    departamento: "Valle del Cauca",
    github: false,
    nivel_ingles: "B1",
    instructores_recomendados: [{ nombre: "Andrés Pérez", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Diego Ramírez",
    correo_personal: "diego@example.com",
    correo_institucional: "diego@sena.edu.co",
    centro_formacion: "CF Bogotá",
    programa: "Multimedia",
    departamento: "Cundinamarca",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Mónica Castro", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Sofía Gómez",
    correo_personal: "sofia@example.com",
    correo_institucional: "sofia@sena.edu.co",
    centro_formacion: "CF Medellín",
    programa: "Software",
    departamento: "Antioquia",
    github: false,
    nivel_ingles: "C1",
    instructores_recomendados: [{ nombre: "Jorge Molina", especialidad: "IA" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Camila Torres",
    correo_personal: "camila@example.com",
    correo_institucional: "camila@sena.edu.co",
    centro_formacion: "CF Barranquilla",
    programa: "ADSI",
    departamento: "Atlántico",
    github: true,
    nivel_ingles: "B1",
    instructores_recomendados: [{ nombre: "Felipe Ruiz", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Andrés López",
    correo_personal: "andres@example.com",
    correo_institucional: "andres@sena.edu.co",
    centro_formacion: "CF Barranquilla",
    programa: "Software",
    departamento: "Atlántico",
    github: false,
    nivel_ingles: "A1",
    instructores_recomendados: [{ nombre: "Laura Martínez", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Valentina Ríos",
    correo_personal: "valentina@example.com",
    correo_institucional: "valentina@sena.edu.co",
    centro_formacion: "CF Cali",
    programa: "Multimedia",
    departamento: "Valle del Cauca",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Diego Herrera", especialidad: "IA" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Sebastián Moreno",
    correo_personal: "sebastian@example.com",
    correo_institucional: "sebastian@sena.edu.co",
    centro_formacion: "CF Medellín",
    programa: "ADSI",
    departamento: "Antioquia",
    github: true,
    nivel_ingles: "C2",
    instructores_recomendados: [{ nombre: "Camila Castro", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Martina García",
    correo_personal: "martina@example.com",
    correo_institucional: "martina@sena.edu.co",
    centro_formacion: "CF Bogotá",
    programa: "ADSI",
    departamento: "Cundinamarca",
    github: false,
    nivel_ingles: "B1",
    instructores_recomendados: [{ nombre: "Juan Pérez", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Tomás Vega",
    correo_personal: "tomas@example.com",
    correo_institucional: "tomas@sena.edu.co",
    centro_formacion: "CF Cali",
    programa: "Software",
    departamento: "Valle del Cauca",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Isabel Ramírez", especialidad: "IA" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Isabella Torres",
    correo_personal: "isabella@example.com",
    correo_institucional: "isabella@sena.edu.co",
    centro_formacion: "CF Barranquilla",
    programa: "Multimedia",
    departamento: "Atlántico",
    github: false,
    nivel_ingles: "A2",
    instructores_recomendados: [{ nombre: "Andrés Gómez", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Mateo Castro",
    correo_personal: "mateo@example.com",
    correo_institucional: "mateo@sena.edu.co",
    centro_formacion: "CF Bogotá",
    programa: "Multimedia",
    departamento: "Cundinamarca",
    github: true,
    nivel_ingles: "C1",
    instructores_recomendados: [{ nombre: "Sofía Ramírez", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Lucía Martínez",
    correo_personal: "lucia@example.com",
    correo_institucional: "lucia@sena.edu.co",
    centro_formacion: "CF Medellín",
    programa: "Software",
    departamento: "Antioquia",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Carlos Torres", especialidad: "IA" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Andrés Herrera",
    correo_personal: "andresh@example.com",
    correo_institucional: "andresh@sena.edu.co",
    centro_formacion: "CF Cali",
    programa: "ADSI",
    departamento: "Valle del Cauca",
    github: false,
    nivel_ingles: "B1",
    instructores_recomendados: [{ nombre: "Laura Gómez", especialidad: "Frontend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nombre: "Daniela Vargas",
    correo_personal: "daniela@example.com",
    correo_institucional: "daniela@sena.edu.co",
    centro_formacion: "CF Barranquilla",
    programa: "ADSI",
    departamento: "Atlántico",
    github: true,
    nivel_ingles: "B2",
    instructores_recomendados: [{ nombre: "Jorge Ramírez", especialidad: "Backend" }],
    created_at: new Date(),
    updated_at: new Date()
  },
      ]);
      console.log(" Datos de ejemplo cargados en aprendices");
    } else {
      console.log(" Ya existían datos en aprendices, no se insertaron ejemplos");
    }

    console.log(" Setup completado con éxito");
    process.exit(0);

  } catch (err) {
    console.error("Error en setupCollections:", err);
    process.exit(1);
  }
}

setupCollections();
