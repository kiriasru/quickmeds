const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Medicamentos = sequelize.define('medicamentos', {
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
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    dosis: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    frecuencia: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    hora_especifica: {
        type: DataTypes.TIME,
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'medicamentos',
    timestamps: false,
});

module.exports = Medicamentos;