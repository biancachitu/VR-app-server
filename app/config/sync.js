const sequelize = require('./db');
const User = require('../models/user');
const Object = require('../models/object');
const UserObject = require('../models/user-objects');

const syncDb = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('Database synchronized\n');
        
        const tables = await sequelize.getQueryInterface().showAllTables();
        console.log('Tables in the database:', tables);
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

syncDb();
