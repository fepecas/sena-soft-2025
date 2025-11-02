const mongoose = require('mongoose');

const aprendizSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  telefono: String,
  centroId: { type: String, ref: 'Centro', required: true },
  programaId: { type: String, ref: 'Programa', required: true },
  departamento: { type: String, required: true },
  ciudad: String,
  githubUser: String,
  nivelIngles: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', null] },
  fechaInscripcion: { type: Date, default: Date.now },
  estado: { type: String, enum: ['activo', 'inactivo', 'graduado'], default: 'activo' }
});

module.exports = mongoose.model('Aprendiz', aprendizSchema);