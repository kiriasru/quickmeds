const express = require('express');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { nombre, email, password, edad } = req.body;

		if (!nombre || !email || !password) {
			return res.status(400).json({
				status: 400,
				message: 'Nombre, email y password son obligatorios.',
			});
		}

		const existe = await Usuarios.findOne({ where: { email } });
		if (existe) {
			return res.status(409).json({
				status: 409,
				message: 'El email ya esta registrado.',
			});
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const nuevoUsuario = await Usuarios.create({
			nombre,
			email,
			password: passwordHash,
			edad,
		});

		return res.status(201).json({
			status: 201,
			message: 'Usuario creado exitosamente.',
			data: {
				id: nuevoUsuario.id,
				nombre: nuevoUsuario.nombre,
				email: nuevoUsuario.email,
				edad: nuevoUsuario.edad,
				creado_en: nuevoUsuario.creado_en,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: 'Error al crear usuario.',
			error: error.message,
		});
	}
});

module.exports = router;