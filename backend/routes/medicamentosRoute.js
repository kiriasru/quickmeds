const express = require('express');
const Medicamentos = require('../models/Medicamentos');
const Usuarios = require('../models/Usuarios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const medicamentos = await Medicamentos.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Medicamentos obtenidos exitosamente.',
            data: medicamentos,
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

        const medicamento = await Medicamentos.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Medicamento obtenido exitosamente.',
            data: medicamento,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.get('/usuario/:id_usuario', async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.id_usuario, 10);

        if (!idUsuario) {
            return res.status(400).json({ status: 400, message: 'El id_usuario es requerido.' });
        }

        const medicamentos = await Medicamentos.findAll({
            where: { id_usuario: idUsuario },
        });

        return res.status(200).json({
            status: 200,
            message: 'Medicamentos del usuario obtenidos exitosamente.',
            data: medicamentos,
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
        const {
            id_usuario,
            nombre,
            dosis,
            frecuencia,
            hora_especifica,
            fecha_inicio,
            fecha_fin,
            activo,
        } = req.body;

        if (!id_usuario || !nombre || !dosis || !frecuencia || !fecha_inicio) {
            return res.status(400).json({
                status: 400,
                message: 'id_usuario, nombre, dosis, frecuencia y fecha_inicio son obligatorios.',
            });
        }

        const usuario = await Usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        const nuevoMedicamento = await Medicamentos.create({
            id_usuario,
            nombre,
            dosis,
            frecuencia,
            hora_especifica,
            fecha_inicio,
            fecha_fin,
            activo: typeof activo === 'boolean' ? activo : true,
        });

        return res.status(201).json({
            status: 201,
            message: 'Medicamento creado exitosamente.',
            data: nuevoMedicamento,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear medicamento.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const {
            nombre,
            dosis,
            frecuencia,
            hora_especifica,
            fecha_inicio,
            fecha_fin,
            activo,
        } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!nombre || !dosis || !frecuencia || !fecha_inicio) {
            return res.status(400).json({
                status: 400,
                message: 'nombre, dosis, frecuencia y fecha_inicio son obligatorios.',
            });
        }

        const medicamento = await Medicamentos.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        medicamento.nombre = nombre;
        medicamento.dosis = dosis;
        medicamento.frecuencia = frecuencia;
        medicamento.hora_especifica = hora_especifica;
        medicamento.fecha_inicio = fecha_inicio;
        medicamento.fecha_fin = fecha_fin;
        medicamento.activo = typeof activo === 'boolean' ? activo : medicamento.activo;
        await medicamento.save();

        return res.status(200).json({
            status: 200,
            message: 'Medicamento actualizado exitosamente.',
            data: medicamento,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.put('/:id/activo', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { activo } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (typeof activo !== 'boolean') {
            return res.status(400).json({ status: 400, message: 'activo debe ser boolean.' });
        }

        const medicamento = await Medicamentos.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        medicamento.activo = activo;
        await medicamento.save();

        return res.status(200).json({
            status: 200,
            message: 'Estado de medicamento actualizado exitosamente.',
            data: medicamento,
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

        const medicamento = await Medicamentos.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ status: 404, message: 'Medicamento no encontrado.' });
        }

        await medicamento.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Medicamento eliminado exitosamente.',
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