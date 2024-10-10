// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('SIS', 'root', 'Root@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
