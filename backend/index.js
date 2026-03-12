require('dotenv').config();
const express = require('express');
const sequelize = require('./db/connection');
const registroRoute = require('./routes/registroRoute');
const loginRoute = require('./routes/loginRoute');
const usuariosRoute = require('./routes/usuariosRoute');
const contactosEmergenciaRoute = require('./routes/contactosEmergenciaRoute');
const condicionesCronicasRoute = require('./routes/condicionesCronicasRoute');
const medicamentosRoute = require('./routes/medicamentosRoute');
const recordatoriosRoute = require('./routes/recordatoriosRoute');
const dosisRoute = require('./routes/dosisRoute');
const { authMiddleware } = require('./middlewares/auth');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// APIs publicas
app.use('/registro', registroRoute);
app.use('/login', loginRoute);

// API privada de prueba
app.get('/prueba', authMiddleware, (req, res) => {
    res.send('Hola desde el backend de QuickMeds');
});

// APIs privadas
app.use('/usuarios', authMiddleware, usuariosRoute);
app.use('/contactos-emergencia', authMiddleware, contactosEmergenciaRoute);
app.use('/condiciones-cronicas', authMiddleware, condicionesCronicasRoute);
app.use('/medicamentos', authMiddleware, medicamentosRoute);
app.use('/recordatorios', authMiddleware, recordatoriosRoute);
app.use('/dosis', authMiddleware, dosisRoute);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
})