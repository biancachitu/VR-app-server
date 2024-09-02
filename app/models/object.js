const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ObjectModel = sequelize.define('Object', {
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = ObjectModel;
