const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const email = req.body.email || req.body.Correo;
		const password = req.body.password || req.body.Password;

		if (!email || !password) {
			return res.status(400).json({
				status: 400,
				message: 'El correo y la contraseña son requeridos.',
			});
		}

		const usuario = await Usuarios.findOne({ where: { email } });

		if (!usuario) {
			return res.status(401).json({
				status: 401,
				message: 'Credenciales invalidas.',
			});
		}

		const isMatch = await bcrypt.compare(password, usuario.password);
		if (!isMatch) {
			return res.status(401).json({
				status: 401,
				message: 'Credenciales invalidas.',
			});
		}

		const token = jwt.sign(
			{
				id: usuario.id,
				email: usuario.email,
				nombre: usuario.nombre,
			},
			process.env.SECRET_KEY,
			{ expiresIn: '1h' },
		);

		return res.status(200).json({
			status: 200,
			message: 'Login exitoso.',
			token,
			user: {
				id: usuario.id,
				nombre: usuario.nombre,
				email: usuario.email,
				edad: usuario.edad,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: 'Error en login.',
			error: error.message,
		});
	}
});

module.exports = router;