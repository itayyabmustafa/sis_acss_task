const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    programEnrolled: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Student;
