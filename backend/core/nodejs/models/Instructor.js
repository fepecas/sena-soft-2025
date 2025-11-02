const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  especialidades: [String],
  centroId: { type: String, ref: 'Centro', required: true },
  experiencia: Number, // años
  calificacion: { type: Number, min: 1, max: 5 },
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Instructor', instructorSchema);