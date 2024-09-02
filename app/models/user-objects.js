const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const ObjectModel = require('./object');

const UserObject = sequelize.define('UserObject', {}, {
    timestamps: false,
    tableName: 'UserObjects'
});

User.belongsToMany(ObjectModel, { through: UserObject });
ObjectModel.belongsToMany(User, { through: UserObject });

module.exports = UserObject;
