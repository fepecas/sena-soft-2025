const mongoose = require('mongoose');
const Centro = require('../models/Centro');
const Programa = require('../models/Programa');
const Instructor = require('../models/Instructor');
const Aprendiz = require('../models/Aprendiz');

const departamentosColombia = [
  'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Cauca', 'César', 'Córdoba',
  'Cundinamarca', 'Huila', 'La Guajira', 'Magdalena', 'Meta',
  'Nariño', 'Norte de Santander', 'Quindío', 'Risaralda', 'Santander',
  'Sucre', 'Tolima', 'Valle del Cauca'
];

async function seedDatabase() {
  try {
    // Limpiar datos existentes
    await Centro.deleteMany({});
    await Programa.deleteMany({});
    await Instructor.deleteMany({});
    await Aprendiz.deleteMany({});

    // Crear centros de formación
    const centros = [];
    for (let i = 1; i <= 25; i++) {
      const departamento = departamentosColombia[i % departamentosColombia.length];
      centros.push({
        id: `CENTRO_${i.toString().padStart(3, '0')}`,
        nombre: `Centro de Formación ${departamento} ${i}`,
        departamento,
        ciudad: `Ciudad ${i}`,
        direccion: `Calle ${i} #${i}-${i}`,
        telefono: `300${i.toString().padStart(7, '0')}`,
        email: `centro${i}@sena.edu.co`
      });
    }
    await Centro.insertMany(centros);

    // Crear programas de formación
    const programas = [
      { id: 'PROG_001', nombre: 'Desarrollo de Software', codigo: 'DS001', duracion: 24, modalidad: 'presencial', nivel: 'tecnologo' },
      { id: 'PROG_002', nombre: 'Redes y Telecomunicaciones', codigo: 'RT002', duracion: 18, modalidad: 'mixta', nivel: 'tecnico' },
      { id: 'PROG_003', nombre: 'Inteligencia Artificial', codigo: 'IA003', duracion: 30, modalidad: 'virtual', nivel: 'especializacion' },
      { id: 'PROG_004', nombre: 'Ciberseguridad', codigo: 'CS004', duracion: 24, modalidad: 'presencial', nivel: 'tecnologo' }
    ];
    await Programa.insertMany(programas);

    // Crear instructores
    const instructores = [];
    for (let i = 1; i <= 100; i++) {
      instructores.push({
        id: `INST_${i.toString().padStart(3, '0')}`,
        nombre: `Instructor${i}`,
        apellido: `Apellido${i}`,
        email: `instructor${i}@sena.edu.co`,
        especialidades: ['JavaScript', 'Python', 'Bases de Datos'],
        centroId: centros[i % centros.length].id,
        experiencia: Math.floor(Math.random() * 10) + 1,
        calificacion: Math.floor(Math.random() * 2) + 4 // 4 o 5
      });
    }
    await Instructor.insertMany(instructores);

    // Crear aprendices
    const aprendices = [];
    const nivelesIngles = ['A1', 'A2', 'B1', 'B2', 'C1', null];
    const githubUsers = ['user1', 'dev2', 'coder3', null, null]; // 60% sin GitHub

    for (let i = 1; i <= 1000; i++) {
      const centroSeleccionado = centros[Math.floor(Math.random() * centros.length)];
      aprendices.push({
        id: `APREN_${i.toString().padStart(4, '0')}`,
        nombre: `Aprendiz${i}`,
        apellido: `Apellido${i}`,
        email: `aprendiz${i}@sena.edu.co`,
        telefono: `310${i.toString().padStart(7, '0')}`,
        centroId: centroSeleccionado.id,
        programaId: programas[Math.floor(Math.random() * programas.length)].id,
        departamento: centroSeleccionado.departamento,
        ciudad: centroSeleccionado.ciudad,
        githubUser: githubUsers[Math.floor(Math.random() * githubUsers.length)],
        nivelIngles: nivelesIngles[Math.floor(Math.random() * nivelesIngles.length)],
        fechaInscripcion: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      });
    }
    await Aprendiz.insertMany(aprendices);

    console.log('Base de datos poblada exitosamente');
    console.log(`Centros creados: ${centros.length}`);
    console.log(`Programas creados: ${programas.length}`);
    console.log(`Instructores creados: ${instructores.length}`);
    console.log(`Aprendices creados: ${aprendices.length}`);

  } catch (error) {
    console.error('Error poblando la base de datos:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Conectar y ejecutar el seed
async function runSeed() {
  try {
    require('dotenv').config();
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/senasoft');
    console.log('Conectado a MongoDB');
    await seedDatabase();
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
}

if (require.main === module) {
  runSeed();
}

module.exports = seedDatabase;