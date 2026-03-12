const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const ContactosEmergencia = sequelize.define('contactos_emergencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    relacion: {
        type: DataTypes.STRING(50),
    },
}, {
    tableName: 'contactos_emergencia',
    timestamps: false,
});

module.exports = ContactosEmergencia;