
const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');

//  Cantidad de aprendices por centro de formación
router.get('/por-centro', metricsController.aprendicesPorCentro);

//  Instructores recomendados por centro
router.get('/instructores-por-centro', metricsController.instructoresPorCentro);

// Cantidad de aprendices por centro y programa
router.get('/por-programa-centro', metricsController.aprendicesPorProgramaCentro);

// Cantidad de aprendices por departamento
router.get('/por-departamento', metricsController.aprendicesPorDepartamento);

// Cantidad de aprendices con usuario GitHub
router.get('/con-github', metricsController.aprendicesConGithub);

//  Nivel de inglés B1/B2 por centro
router.get('/nivel-ingles', metricsController.nivelInglesPorCentro);

module.exports = router;
