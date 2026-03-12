const express = require('express');
const CondicionesCronicas = require('../models/CondicionesCronicas');
const Usuarios = require('../models/Usuarios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const condiciones = await CondicionesCronicas.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Condiciones obtenidas exitosamente.',
            data: condiciones,
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

        const condicion = await CondicionesCronicas.findByPk(id);
        if (!condicion) {
            return res.status(404).json({ status: 404, message: 'Condicion no encontrada.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Condicion obtenida exitosamente.',
            data: condicion,
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

        const condiciones = await CondicionesCronicas.findAll({
            where: { id_usuario: idUsuario },
        });

        return res.status(200).json({
            status: 200,
            message: 'Condiciones del usuario obtenidas exitosamente.',
            data: condiciones,
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
        const { id_usuario, nombre_condicion, notas } = req.body;

        if (!id_usuario || !nombre_condicion) {
            return res.status(400).json({
                status: 400,
                message: 'id_usuario y nombre_condicion son obligatorios.',
            });
        }

        const usuario = await Usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        const nuevaCondicion = await CondicionesCronicas.create({
            id_usuario,
            nombre_condicion,
            notas,
        });

        return res.status(201).json({
            status: 201,
            message: 'Condicion creada exitosamente.',
            data: nuevaCondicion,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear condicion.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nombre_condicion, notas } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!nombre_condicion) {
            return res.status(400).json({
                status: 400,
                message: 'nombre_condicion es obligatorio.',
            });
        }

        const condicion = await CondicionesCronicas.findByPk(id);
        if (!condicion) {
            return res.status(404).json({ status: 404, message: 'Condicion no encontrada.' });
        }

        condicion.nombre_condicion = nombre_condicion;
        condicion.notas = notas;
        await condicion.save();

        return res.status(200).json({
            status: 200,
            message: 'Condicion actualizada exitosamente.',
            data: condicion,
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

        const condicion = await CondicionesCronicas.findByPk(id);
        if (!condicion) {
            return res.status(404).json({ status: 404, message: 'Condicion no encontrada.' });
        }

        await condicion.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Condicion eliminada exitosamente.',
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
