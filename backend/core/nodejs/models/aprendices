
const mongoose = require('mongoose');

const aprendizSchema = new mongoose.Schema({
  id_aprendiz: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  centro_formacion: { type: String, required: true },
  programa_formacion: { 
    type: String, 
    enum: [
      "Análisis y Desarrollo de Software",
      "Gestión de Redes de Datos",
      "Diseño e Integración de Multimedia",
      "Seguridad de la Información"
    ],
    required: true
  },
  departamento_residencia: { type: String, required: true },
  github_usuario: { type: Boolean, required: true },
  nivel_ingles: { 
    type: String, 
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], 
    required: true 
  },
  instructor_recomendado: { type: String, required: true }
}, { collection: 'aprendices' }); 

module.exports = mongoose.model('Aprendiz', aprendizSchema);
