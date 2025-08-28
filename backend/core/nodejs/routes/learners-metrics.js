const express = require('express');
const router = express.Router();
const Learner = require('../models/Learner');

// Manejo estandarizado de errores
const handleError = (res, error, code = 'INTERNAL_ERROR') => {
  console.error(`Error [${code}]:`, error.message);
  return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    code: code,
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// 1. Aprendices por centro de formación
router.get('/by-center', async (req, res) => {
  try {
    const result = await Learner.aggregate([
      { 
        $group: { 
          _id: "$formation_center", 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);
    
    const response = result.map(item => ({
      description: `Aprendices en ${item._id}`,
      value: item.count
    }));
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'LEARNERS_BY_CENTER_ERROR');
  }
});

// 2. Instructores recomendados por centro
router.get('/instructors-by-center/:center', async (req, res) => {
  try {
    const { center } = req.params;
    
    if (!center || center.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'El parámetro "center" es requerido',
        code: 'MISSING_CENTER_PARAM'
      });
    }
    
    const decodedCenter = decodeURIComponent(center);
    const result = await Learner.aggregate([
      { 
        $match: { 
          formation_center: decodedCenter,
          recommended_instructors: { $exists: true, $ne: [] }
        } 
      },
      { $unwind: "$recommended_instructors" },
      { 
        $group: { 
          _id: "$recommended_instructors", 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);
    
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No se encontraron instructores para el centro: ${decodedCenter}`,
        code: 'NO_INSTRUCTORS_FOUND'
      });
    }
    
    const response = result.map(item => ({
      description: `Instructor ${item._id} en ${decodedCenter}`,
      value: item.count
    }));
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'INSTRUCTORS_BY_CENTER_ERROR');
  }
});

// 3. Aprendices por centro y programa de formación (Top 4 programas)
router.get('/by-center-program', async (req, res) => {
  try {
    const result = await Learner.aggregate([
      { 
        $group: { 
          _id: { 
            center: "$formation_center", 
            program: "$formation_program" 
          }, 
          count: { $sum: 1 } 
        }
      },
      {
        $group: {
          _id: "$_id.center",
          programs: {
            $push: {
              program: "$_id.program",
              count: "$count"
            }
          },
          total: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          center: "$_id",
          topPrograms: {
            $slice: [
              {
                $sortArray: {
                  input: "$programs",
                  sortBy: { count: -1 }
                }
              },
              0,
              4
            ]
          },
          total: 1
        }
      }
    ]);
    
    const response = result.flatMap(center => 
      center.topPrograms.map(program => ({
        description: `${program.program} en ${center.center}`,
        value: program.count
      }))
    );
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'CENTER_PROGRAM_ERROR');
  }
});

// 4. Aprendices por departamento (solo encuesta completada)
router.get('/by-department', async (req, res) => {
  try {
    const result = await Learner.aggregate([
      { 
        $match: { 
          survey_completed: true,
          department: { $exists: true, $ne: "" }
        } 
      },
      { 
        $group: { 
          _id: "$department", 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);
    
    const response = result.map(item => ({
      description: `Aprendices en ${item._id}`,
      value: item.count
    }));
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'DEPARTMENT_QUERY_ERROR');
  }
});

// 5. Aprendices con GitHub
router.get('/with-github', async (req, res) => {
  try {
    const count = await Learner.countDocuments({ 
      has_github: true 
    });
    const total = await Learner.countDocuments();
    const percentage = ((count / total) * 100).toFixed(1);
    
    const response = [{
      description: "Aprendices con usuario de GitHub",
      value: count,
      metadata: {
        percentage: `${percentage}%`,
        total_learners: total
      }
    }];
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'GITHUB_QUERY_ERROR');
  }
});

// 6. Aprendices con inglés B1/B2 por centro
router.get('/english-by-center', async (req, res) => {
  try {
    const result = await Learner.aggregate([
      { 
        $match: { 
          english_level: { $in: ["B1", "B2"] } 
        } 
      },
      { 
        $group: { 
          _id: "$formation_center", 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);
    
    const totalB1B2 = result.reduce((sum, item) => sum + item.count, 0);
    const totalLearners = await Learner.countDocuments();
    const percentage = ((totalB1B2 / totalLearners) * 100).toFixed(1);
    
    const response = result.map(item => ({
      description: `Aprendices con inglés B1/B2 en ${item._id}`,
      value: item.count
    }));
    
    // Agregar metadata informativa
    response.metadata = {
      total_english_b1_b2: totalB1B2,
      percentage_of_total: `${percentage}%`,
      total_learners: totalLearners
    };
    
    res.json(response);
  } catch (error) {
    handleError(res, error, 'ENGLISH_LEVEL_ERROR');
  }
});

module.exports = router;
