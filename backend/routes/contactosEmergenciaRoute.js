const express = require('express');
const ContactosEmergencia = require('../models/ContactosEmergencia');
const Usuarios = require('../models/Usuarios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contactos = await ContactosEmergencia.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Contactos obtenidos exitosamente.',
            data: contactos,
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

        const contacto = await ContactosEmergencia.findByPk(id);
        if (!contacto) {
            return res.status(404).json({ status: 404, message: 'Contacto no encontrado.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Contacto obtenido exitosamente.',
            data: contacto,
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

        const contactos = await ContactosEmergencia.findAll({
            where: { id_usuario: idUsuario },
        });

        return res.status(200).json({
            status: 200,
            message: 'Contactos del usuario obtenidos exitosamente.',
            data: contactos,
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
        const { id_usuario, nombre, telefono, relacion } = req.body;

        if (!id_usuario || !nombre || !telefono) {
            return res.status(400).json({
                status: 400,
                message: 'id_usuario, nombre y telefono son obligatorios.',
            });
        }

        const usuario = await Usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        const nuevoContacto = await ContactosEmergencia.create({
            id_usuario,
            nombre,
            telefono,
            relacion,
        });

        return res.status(201).json({
            status: 201,
            message: 'Contacto creado exitosamente.',
            data: nuevoContacto,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear contacto.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nombre, telefono, relacion } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!nombre || !telefono) {
            return res.status(400).json({
                status: 400,
                message: 'Nombre y telefono son obligatorios.',
            });
        }

        const contacto = await ContactosEmergencia.findByPk(id);
        if (!contacto) {
            return res.status(404).json({ status: 404, message: 'Contacto no encontrado.' });
        }

        contacto.nombre = nombre;
        contacto.telefono = telefono;
        contacto.relacion = relacion;
        await contacto.save();

        return res.status(200).json({
            status: 200,
            message: 'Contacto actualizado exitosamente.',
            data: contacto,
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

        const contacto = await ContactosEmergencia.findByPk(id);
        if (!contacto) {
            return res.status(404).json({ status: 404, message: 'Contacto no encontrado.' });
        }

        await contacto.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Contacto eliminado exitosamente.',
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
