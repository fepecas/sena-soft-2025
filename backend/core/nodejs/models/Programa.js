const mongoose = require('mongoose');

const programaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  codigo: { type: String, required: true },
  duracion: Number, // en meses
  modalidad: { type: String, enum: ['presencial', 'virtual', 'mixta'] },
  nivel: { type: String, enum: ['tecnico', 'tecnologo', 'especializacion'] },
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Programa', programaSchema);