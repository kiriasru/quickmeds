const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const CondicionesCronicas = sequelize.define('condiciones_cronicas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_condicion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    notas: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'condiciones_cronicas',
    timestamps: false,
});

module.exports = CondicionesCronicas;