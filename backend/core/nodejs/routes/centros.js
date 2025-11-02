const express = require('express');
const router = express.Router();
const Centro = require('../models/Centro');

// GET /api/centros - Obtener todos los centros
router.get('/', async (req, res) => {
    try {
        const centros = await Centro.find();
        res.json(centros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/centros/:id - Obtener un centro por ID
router.get('/:id', async (req, res) => {
    try {
        const centro = await Centro.findById(req.params.id);
        if (!centro) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        res.json(centro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/centros - Crear un nuevo centro
router.post('/', async (req, res) => {
    try {
        const centro = new Centro(req.body);
        const nuevoCentro = await centro.save();
        res.status(201).json(nuevoCentro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/centros/:id - Actualizar un centro
router.put('/:id', async (req, res) => {
    try {
        const centro = await Centro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!centro) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        res.json(centro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/centros/:id - Eliminar un centro
router.delete('/:id', async (req, res) => {
    try {
        const centro = await Centro.findByIdAndDelete(req.params.id);
        if (!centro) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        res.json({ message: 'Centro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;