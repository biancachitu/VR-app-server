require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log("Username: " + process.env.user + "\n" + "Password: " + process.env.password + "\n" + "Database: " + process.env.database);

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
    logging: console.log
});


const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully\n');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDb();

module.exports = sequelize;
