const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Recordatorios = sequelize.define('recordatorios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hora_recordatorio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'recordatorios',
    timestamps: false,
});

module.exports = Recordatorios;