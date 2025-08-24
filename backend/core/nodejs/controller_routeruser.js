const Aprendiz =require('./modelsuser.js')
/* ingreso aprendises prueba  */
const createAprendiz = async (req, res) => {
    try {
        const {
            nombre,
            centroFormacion,
            programaFormacion,
            departamento,
            tieneGithub,
            nivelIngles,
            instructorRecomendado
        } = req.body;

        // Validar que los campos esenciales no estén vacíos
        if (!nombre || !centroFormacion || !programaFormacion) {
            return res.status(400).json({
                success: false,
                error: 'Los campos nombre, centro de formación y programa de formación son obligatorios.'
            });
        }

        // Crear una nueva instancia del modelo Aprendiz
        const nuevoAprendiz = new Aprendiz({
            nombre,
            centroFormacion,
            programaFormacion,
            departamento,
            tieneGithub,
            nivelIngles,
            instructorRecomendado
        });

        // Guardar el nuevo aprendiz en la base de datos
        const aprendizGuardado = await nuevoAprendiz.save();

        const aprendizResponse = aprendizGuardado.toObject();

        res.status(201).json({
            success: true,
            message: 'Aprendiz creado exitosamente.',
            data: aprendizResponse
        });
    } catch (error) {
        // Manejar errores de duplicidad si el esquema tuviera un campo único (ej. 'nombre')
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                error: `Ya existe un aprendiz con este ${field}.`
            });
        }
        
        console.error(error); // Imprime el error completo en la consola del servidor
        res.status(500).json({
            success: false,
            error: 'Error del servidor al crear el aprendiz.'
        });
    }
};
/* Cantidad de aprendices inscritos por centro de formación */
const getAprendicesPorCentro = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $group: {
            _id: "$centroFormacion",
            total: { $sum: 1 }
            }
        },
        {
            $project: {
            _id: 0,
            centro: "$_id",
            total: 1
            }
        }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*  Nombres de instructores recomendados por aprendices inscritos por centro de formación */

const getInstructoresRecomendadosPorCentro = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $group: {
            _id: "$centroFormacion",
            instructores: { $addToSet: "$instructorRecomendado" }
            }
        },
        {
            $project: {
            _id: 0,
            centro: "$_id",
            instructores: 1
            }
        }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Cantidad de aprendices inscritos por centro y programa de formación (top 4) */

const getAprendicesPorCentroYPrograma = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $group: {
            _id: { centro: "$centroFormacion", programa: "$programaFormacion" },
            total: { $sum: 1 }
            }
        },
        { $sort: { total: -1 } },
        { $limit: 4 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Cantidad de aprendices por departamento de Colombia */

const getAprendicesPorDepartamento = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $group: {
            _id: "$departamento",
            total: { $sum: 1 }
            }
        },
        {
            $project: {
            _id: 0,
            departamento: "$_id",
            total: 1
            }
        }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*  Cantidad de aprendices que reportan tener un usuario de GitHub */
const getAprendicesConGithub = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $match: { tieneGithub: true }
        },
        {
            $count: "total"
        }
        ]);
        res.json(data.length > 0 ? data[0] : { total: 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* Cantidad de aprendices con nivel de inglés B1 o B2 en cada centro de formación */

const getAprendicesNivelInglesB1B2 = async (req, res) => {
    try {
        const data = await Aprendiz.aggregate([
        {
            $match: {
            nivelIngles: { $in: ["B1", "B2"] }
            }
        },
        {
            $group: {
            _id: "$centroFormacion",
            total: { $sum: 1 }
            }
        },
        {
            $project: {
            _id: 0,
            centro: "$_id",
            total: 1
            }
        }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAprendicesPorCentro,
    getInstructoresRecomendadosPorCentro,
    getAprendicesPorCentroYPrograma,
    getAprendicesPorDepartamento,
    getAprendicesConGithub,
    getAprendicesNivelInglesB1B2,
    createAprendiz
};