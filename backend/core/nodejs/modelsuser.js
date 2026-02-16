const mongoose = require('mongoose');

const aprendizSchema = new mongoose.Schema({
    nombre: String,
    centroFormacion: String,
    programaFormacion: String,
    departamento: String,
    tieneGithub: Boolean,
    nivelIngles: String,
    instructorRecomendado: String
});

const Aprendiz = mongoose.model('Aprendiz', aprendizSchema);
module.exports = Aprendiz;
