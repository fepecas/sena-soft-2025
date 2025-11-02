const express = require('express');
const router = express.Router();
const Programa = require('../models/Programa');

// GET /api/programas - Obtener todos los programas
router.get('/', async (req, res) => {
    try {
        const programas = await Programa.find();
        res.json(programas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/programas/:id - Obtener un programa por ID
router.get('/:id', async (req, res) => {
    try {
        const programa = await Programa.findById(req.params.id);
        if (!programa) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.json(programa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/programas - Crear un nuevo programa
router.post('/', async (req, res) => {
    try {
        const programa = new Programa(req.body);
        const nuevoPrograma = await programa.save();
        res.status(201).json(nuevoPrograma);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/programas/:id - Actualizar un programa
router.put('/:id', async (req, res) => {
    try {
        const programa = await Programa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!programa) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.json(programa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/programas/:id - Eliminar un programa
router.delete('/:id', async (req, res) => {
    try {
        const programa = await Programa.findByIdAndDelete(req.params.id);
        if (!programa) {
            return res.status(404).json({ message: 'Programa no encontrado' });
        }
        res.json({ message: 'Programa eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
