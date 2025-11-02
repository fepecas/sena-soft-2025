const mongoose = require('mongoose');

const centroSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  ciudad: { type: String, required: true },
  direccion: String,
  telefono: String,
  email: String,
  activo: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Centro', centroSchema);