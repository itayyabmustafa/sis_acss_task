// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('acss_db', 'root', 'Root@123', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
