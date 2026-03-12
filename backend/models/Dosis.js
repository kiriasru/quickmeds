const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Dosis = sequelize.define('dosis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_hora_programada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_hora_tomada: {
        type: DataTypes.DATE,
    },
    estado: {
        type: DataTypes.ENUM('tomado', 'omitido', 'pendiente'),
        defaultValue: 'pendiente',
    },
}, {
    tableName: 'dosis',
    timestamps: false,
});

module.exports = Dosis;