const express = require('express');
const router = express.Router();
const Aprendiz = require('../models/Aprendiz');

// GET /api/aprendices - Obtener todos los aprendices
router.get('/', async (req, res) => {
    try {
        const aprendices = await Aprendiz.find().populate('programaId').populate('centroId');
        res.json(aprendices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/aprendices/:id - Obtener un aprendiz por ID
router.get('/:id', async (req, res) => {
    try {
        const aprendiz = await Aprendiz.findById(req.params.id).populate('programaId').populate('centroId');
        if (!aprendiz) {
            return res.status(404).json({ message: 'Aprendiz no encontrado' });
        }
        res.json(aprendiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/aprendices - Crear un nuevo aprendiz
router.post('/', async (req, res) => {
    try {
        const aprendiz = new Aprendiz(req.body);
        const nuevoAprendiz = await aprendiz.save();
        res.status(201).json(nuevoAprendiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/aprendices/:id - Actualizar un aprendiz
router.put('/:id', async (req, res) => {
    try {
        const aprendiz = await Aprendiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aprendiz) {
            return res.status(404).json({ message: 'Aprendiz no encontrado' });
        }
        res.json(aprendiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/aprendices/:id - Eliminar un aprendiz
router.delete('/:id', async (req, res) => {
    try {
        const aprendiz = await Aprendiz.findByIdAndDelete(req.params.id);
        if (!aprendiz) {
            return res.status(404).json({ message: 'Aprendiz no encontrado' });
        }
        res.json({ message: 'Aprendiz eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
