
const Aprendiz = require('../models/aprendices');

// Cantidad de aprendices por centro de formación
exports.aprendicesPorCentro = async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $group: { _id: "$centro_formacion", total: { $sum: 1 } } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Instructores recomendados por centro
exports.instructoresPorCentro = async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      {
        $group: {
          _id: "$centro_formacion",
          instructores: { $addToSet: "$instructor_recomendado" }
        }
      }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aprendices por centro y programa
exports.aprendicesPorProgramaCentro = async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      {
        $group: {
          _id: {
            centro: "$centro_formacion",
            programa: "$programa_formacion"
          },
          total: { $sum: 1 }
        }
      }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aprendices por departamento
exports.aprendicesPorDepartamento = async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      { $group: { _id: "$departamento_residencia", total: { $sum: 1 } } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aprendices con usuario de GitHub
exports.aprendicesConGithub = async (req, res) => {
  try {
    const total = await Aprendiz.countDocuments({ github_usuario: true });
    res.json({ github_usuarios: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aprendices con nivel de inglés B1 o B2 por centro
exports.nivelInglesPorCentro = async (req, res) => {
  try {
    const resultado = await Aprendiz.aggregate([
      {
        $match: {
          nivel_ingles: { $in: ["B1", "B2"] }
        }
      },
      {
        $group: {
          _id: "$centro_formacion",
          total_b1_b2: { $sum: 1 }
        }
      }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
