const express = require('express');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: ['id', 'nombre', 'email', 'edad', 'creado_en'],
        });

        return res.status(200).json({
            status: 200,
            message: 'Usuarios obtenidos exitosamente.',
            data: usuarios,
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

        const usuario = await Usuarios.findByPk(id, {
            attributes: ['id', 'nombre', 'email', 'edad', 'creado_en'],
        });

        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Usuario obtenido exitosamente.',
            data: usuario,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nombre, email, edad } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!nombre || !email) {
            return res.status(400).json({
                status: 400,
                message: 'Nombre y email son obligatorios.',
            });
        }

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        const existeEmail = await Usuarios.findOne({ where: { email } });
        if (existeEmail && existeEmail.id !== id) {
            return res.status(409).json({ status: 409, message: 'El email ya esta registrado.' });
        }

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.edad = edad;
        await usuario.save();

        return res.status(200).json({
            status: 200,
            message: 'Usuario actualizado exitosamente.',
            data: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                edad: usuario.edad,
                creado_en: usuario.creado_en,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message,
        });
    }
});

router.put('/:id/password', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { password } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: 'El id es requerido.' });
        }

        if (!password) {
            return res.status(400).json({
                status: 400,
                message: 'La contraseña es obligatoria.',
            });
        }

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        usuario.password = passwordHash;
        await usuario.save();

        return res.status(200).json({
            status: 200,
            message: 'Contraseña actualizada exitosamente.',
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

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado.' });
        }

        await usuario.destroy();

        return res.status(200).json({
            status: 200,
            message: 'Usuario eliminado exitosamente.',
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