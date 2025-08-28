const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  formation_center: {
    type: String,
    required: true,
    trim: true
  },
  formation_program: {
    type: String,
    required: true,
    enum: ['Desarrollo de Software', 'Mecánica Industrial', 'Diseño Gráfico', 'Electrónica']
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  has_github: {
    type: Boolean,
    default: false
  },
  github_username: {
    type: String,
    default: null,
    trim: true
  },
  english_level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', null],
    default: null
  },
  recommended_instructors: [{
    type: String,
    trim: true
  }],
  survey_completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'learners',
  timestamps: false
});

// Índices para optimizar consultas
learnerSchema.index({ formation_center: 1 });
learnerSchema.index({ formation_program: 1 });
learnerSchema.index({ department: 1 });
learnerSchema.index({ has_github: 1 });
learnerSchema.index({ english_level: 1 });
learnerSchema.index({ survey_completed: 1 });
learnerSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Learner', learnerSchema);
