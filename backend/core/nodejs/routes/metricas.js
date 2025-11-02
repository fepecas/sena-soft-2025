const express = require('express');
const router = express.Router();
const Centro = require('../models/Centro');
const Aprendiz = require('../models/Aprendiz');
const Instructor = require('../models/Instructor');
const Programa = require('../models/Programa');

// 1. Cantidad de aprendices por centro de formación
router.get('/aprendices-por-centro', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $match: { estado: 'activo' } },
      {
        $group: {
          _id: '$centroId',
          cantidadAprendices: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          departamento: { $arrayElemAt: ['$centro.departamento', 0] },
          cantidadAprendices: 1
        }
      },
      { $sort: { cantidadAprendices: -1 } }
    ]);

    res.json({
      success: true,
      data: resultado,
      total: resultado.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas de aprendices por centro',
      error: error.message
    });
  }
});

// 2. Instructores recomendados por centro
router.get('/instructores-recomendados-por-centro', async (req, res) => {
  try {
    const resultado = await Instructor.aggregate([
      { $match: { activo: true, calificacion: { $gte: 4 } } },
      {
        $group: {
          _id: '$centroId',
          instructores: {
            $push: {
              nombre: { $concat: ['$nombre', ' ', '$apellido'] },
              especialidades: '$especialidades',
              calificacion: '$calificacion',
              experiencia: '$experiencia'
            }
          },
          totalInstructores: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          instructoresRecomendados: '$instructores',
          totalInstructores: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener instructores recomendados',
      error: error.message
    });
  }
});

// 3. Aprendices por centro y programa (máximo 4 programas)
router.get('/aprendices-por-centro-programa', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $match: { estado: 'activo' } },
      {
        $group: {
          _id: {
            centroId: '$centroId',
            programaId: '$programaId'
          },
          cantidadAprendices: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id.centroId',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $lookup: {
          from: 'programas',
          localField: '_id.programaId',
          foreignField: 'id',
          as: 'programa'
        }
      },
      {
        $group: {
          _id: '$_id.centroId',
          nombreCentro: { $first: { $arrayElemAt: ['$centro.nombre', 0] } },
          programas: {
            $push: {
              programaId: '$_id.programaId',
              nombrePrograma: { $arrayElemAt: ['$programa.nombre', 0] },
              cantidadAprendices: '$cantidadAprendices'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: 1,
          programas: { $slice: ['$programas', 4] } // Máximo 4 programas
        }
      }
    ]);

    res.json({
      success: true,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas por centro y programa',
      error: error.message
    });
  }
});

// 4. Aprendices por departamento de Colombia
router.get('/aprendices-por-departamento', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $match: { estado: 'activo' } },
      {
        $group: {
          _id: '$departamento',
          cantidadAprendices: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          departamento: '$_id',
          cantidadAprendices: 1
        }
      },
      { $sort: { cantidadAprendices: -1 } }
    ]);

    res.json({
      success: true,
      data: resultado,
      totalDepartamentos: resultado.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas por departamento',
      error: error.message
    });
  }
});

// 5. Aprendices con usuario de GitHub
router.get('/aprendices-con-github', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { 
        $match: { 
          estado: 'activo',
          githubUser: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$centroId',
          aprendicesConGithub: { $sum: 1 },
          usuarios: {
            $push: {
              nombre: { $concat: ['$nombre', ' ', '$apellido'] },
              githubUser: '$githubUser'
            }
          }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          aprendicesConGithub: 1,
          usuarios: 1
        }
      }
    ]);

    const totalGlobal = await Aprendiz.countDocuments({
      estado: 'activo',
      githubUser: { $exists: true, $ne: null, $ne: '' }
    });

    res.json({
      success: true,
      data: resultado,
      totalGlobal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener aprendices con GitHub',
      error: error.message
    });
  }
});

// 6. Aprendices con nivel de inglés B1 o B2
router.get('/aprendices-ingles-b1-b2', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { 
        $match: { 
          estado: 'activo',
          nivelIngles: { $in: ['B1', 'B2'] }
        }
      },
      {
        $group: {
          _id: {
            centroId: '$centroId',
            nivelIngles: '$nivelIngles'
          },
          cantidadAprendices: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.centroId',
          nivelesIngles: {
            $push: {
              nivel: '$_id.nivelIngles',
              cantidad: '$cantidadAprendices'
            }
          },
          totalB1B2: { $sum: '$cantidadAprendices' }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          nivelesIngles: 1,
          totalB1B2: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener aprendices con inglés B1/B2',
      error: error.message
    });
  }
});

// 5. Cantidad de aprendices que reportan tener un nivel de inglés B1 o B2
router.get('/aprendices-ingles-b1-b2-detallado', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $match: { nivelIngles: { $in: ['B1', 'B2'] } } },
      {
        $group: {
          _id: '$centroId',
          aprendicesB1B2: { $sum: 1 },
          niveles: {
            $push: {
              nivel: '$nivelIngles',
              nombre: { $concat: ['$nombre', ' ', '$apellido'] }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          departamento: { $arrayElemAt: ['$centro.departamento', 0] },
          cantidadAprendicesB1B2: '$aprendicesB1B2',
          detalleNiveles: '$niveles'
        }
      },
      { $sort: { cantidadAprendicesB1B2: -1 } }
    ]);

    const total = resultado.reduce((sum, item) => sum + item.cantidadAprendicesB1B2, 0);

    res.json({
      success: true,
      data: resultado,
      resumen: {
        totalAprendicesB1B2: total,
        centrosConAprendicesB1B2: resultado.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas de nivel de inglés B1/B2',
      error: error.message
    });
  }
});

// 6. Cantidad de aprendices que reportan tener un usuario de GitHub
router.get('/aprendices-github', async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $match: { githubUser: { $ne: null, $ne: '' } } },
      {
        $group: {
          _id: '$centroId',
          aprendicesConGithub: { $sum: 1 },
          usuariosGithub: {
            $push: {
              githubUser: '$githubUser',
              nombre: { $concat: ['$nombre', ' ', '$apellido'] }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'id',
          as: 'centro'
        }
      },
      {
        $project: {
          _id: 0,
          centroId: '$_id',
          nombreCentro: { $arrayElemAt: ['$centro.nombre', 0] },
          departamento: { $arrayElemAt: ['$centro.departamento', 0] },
          cantidadAprendicesConGithub: '$aprendicesConGithub',
          usuariosGithub: '$usuariosGithub'
        }
      },
      { $sort: { cantidadAprendicesConGithub: -1 } }
    ]);

    const total = resultado.reduce((sum, item) => sum + item.cantidadAprendicesConGithub, 0);

    res.json({
      success: true,
      data: resultado,
      resumen: {
        totalAprendicesConGithub: total,
        centrosRepresentados: resultado.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener métricas de usuarios GitHub',
      error: error.message
    });
  }
});

module.exports = router;