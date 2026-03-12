const express = require('express');
const Recordatorios = require('../models/Recordatorios');
const Medicamentos = require('../models/Medicamentos');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recordatorios = await Recordatorios.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Recordatorios obtenidos exitosamente.',
            data: recordatorios,
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

        const recordatorio = await Recordatorios.findByPk(id);
        if (!recordatorio) {
            return res.status(404).json({ status: 404, message: 'Recordatorio no encontrado.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Recordatorio obtenido exitosamente.',
            data: recordatorio,
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

        const recordatorios = await Recordatorios.findAll({
            where: { id_medicamento: idMedicamento },
        });

        return res.status(200).json({
            status: 200,
            message: 'Recordatorios del medicamento obtenidos exitosamente.',
            data: recordatorios,
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
        const { id_medicamento, hora_recordatorio, activo } = req.body;

        if (!id_medicamento || !hora_recordatorio) {
            return res.status(400).json({
                status: 400,
                message: 'id_medicamento y hora_recordatorio son obligatorios.',
            });
        }

        const medicamento = await Medicamentos.findByPk(id_medicamento);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        const nuevoRecordatorio = await Recordatorios.create({
            id_medicamento,
            hora_recordatorio,
            activo: typeof activo === 'boolean' ? activo : true,
        });

        return res.status(201).json({
            status: 201,
            message: 'Recordatorio creado exitosamente.',
            data: nuevoRecordatorio,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear recordatorio.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { hora_recordatorio, activo } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!hora_recordatorio) {
            return res.status(400).json({ status: 400, message: 'hora_recordatorio es obligatorio.' });
        }

        const recordatorio = await Recordatorios.findByPk(id);
        if (!recordatorio) {
            return res.status(404).json({ status: 404, message: 'Recordatorio no encontrado.' });
        }

        recordatorio.hora_recordatorio = hora_recordatorio;
        recordatorio.activo = typeof activo === 'boolean' ? activo : recordatorio.activo;
        await recordatorio.save();

        return res.status(200).json({
            status: 200,
            message: 'Recordatorio actualizado exitosamente.',
            data: recordatorio,
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

        const recordatorio = await Recordatorios.findByPk(id);
        if (!recordatorio) {
            return res.status(404).json({ status: 404, message: 'Recordatorio no encontrado.' });
        }

        await recordatorio.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Recordatorio eliminado exitosamente.',
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