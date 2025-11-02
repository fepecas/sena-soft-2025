const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// GET /api/instructores - Obtener todos los instructores
router.get('/', async (req, res) => {
    try {
        const instructores = await Instructor.find().populate('centroId');
        res.json(instructores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/instructores/:id - Obtener un instructor por ID
router.get('/:id', async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id).populate('centroId');
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor no encontrado' });
        }
        res.json(instructor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/instructores - Crear un nuevo instructor
router.post('/', async (req, res) => {
    try {
        const instructor = new Instructor(req.body);
        const nuevoInstructor = await instructor.save();
        res.status(201).json(nuevoInstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/instructores/:id - Actualizar un instructor
router.put('/:id', async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor no encontrado' });
        }
        res.json(instructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/instructores/:id - Eliminar un instructor
router.delete('/:id', async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor no encontrado' });
        }
        res.json({ message: 'Instructor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
