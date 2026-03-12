const express = require('express');
const Dosis = require('../models/Dosis');
const Medicamentos = require('../models/Medicamentos');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dosis = await Dosis.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Dosis obtenidas exitosamente.',
            data: dosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        const dosis = await Dosis.findByPk(id);
        if (!dosis) {
            return res.status(404).json({ status: 404, message: 'Dosis no encontrada.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Dosis obtenida exitosamente.',
            data: dosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.get('/medicamento/:id_medicamento', async (req, res) => {
    try {
        const idMedicamento = parseInt(req.params.id_medicamento, 10);

        if (!idMedicamento) {
            return res.status(400).json({ status: 400, message: 'El id_medicamento es requerido.' });
        }

        const dosis = await Dosis.findAll({
            where: { id_medicamento: idMedicamento },
        });

        return res.status(200).json({
            status: 200,
            message: 'Dosis del medicamento obtenidas exitosamente.',
            data: dosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id_medicamento, fecha_hora_programada, fecha_hora_tomada, estado } = req.body;

        if (!id_medicamento || !fecha_hora_programada) {
            return res.status(400).json({
                status: 400,
                message: 'id_medicamento y fecha_hora_programada son obligatorios.',
            });
        }

        const medicamento = await Medicamentos.findByPk(id_medicamento);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        const estadosValidos = ['tomado', 'omitido', 'pendiente'];
        if (estado && !estadosValidos.includes(estado)) {
            return res.status(400).json({ status: 400, message: 'Estado invalido.' });
        }

        const nuevaDosis = await Dosis.create({
            id_medicamento,
            fecha_hora_programada,
            fecha_hora_tomada,
            estado: estado || 'pendiente',
        });

        return res.status(201).json({
            status: 201,
            message: 'Dosis creada exitosamente.',
            data: nuevaDosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear dosis.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { fecha_hora_programada, fecha_hora_tomada, estado } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!fecha_hora_programada || !estado) {
            return res.status(400).json({
                status: 400,
                message: 'fecha_hora_programada y estado son obligatorios.',
            });
        }

        const estadosValidos = ['tomado', 'omitido', 'pendiente'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ status: 400, message: 'Estado invalido.' });
        }

        const dosis = await Dosis.findByPk(id);
        if (!dosis) {
            return res.status(404).json({ status: 404, message: 'Dosis no encontrada.' });
        }

        dosis.fecha_hora_programada = fecha_hora_programada;
        dosis.fecha_hora_tomada = fecha_hora_tomada;
        dosis.estado = estado;
        await dosis.save();

        return res.status(200).json({
            status: 200,
            message: 'Dosis actualizada exitosamente.',
            data: dosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.put('/:id/estado', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { estado, fecha_hora_tomada } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!estado) {
            return res.status(400).json({ status: 400, message: 'estado es obligatorio.' });
        }

        const estadosValidos = ['tomado', 'omitido', 'pendiente'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ status: 400, message: 'Estado invalido.' });
        }

        const dosis = await Dosis.findByPk(id);
        if (!dosis) {
            return res.status(404).json({ status: 404, message: 'Dosis no encontrada.' });
        }

        dosis.estado = estado;
        dosis.fecha_hora_tomada = fecha_hora_tomada || dosis.fecha_hora_tomada;
        await dosis.save();

        return res.status(200).json({
            status: 200,
            message: 'Estado de dosis actualizado exitosamente.',
            data: dosis,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        const dosis = await Dosis.findByPk(id);
        if (!dosis) {
            return res.status(404).json({ status: 404, message: 'Dosis no encontrada.' });
        }

        await dosis.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Dosis eliminada exitosamente.',
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

module.exports = router;