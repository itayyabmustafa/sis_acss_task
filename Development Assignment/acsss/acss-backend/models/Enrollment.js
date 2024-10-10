// models/Enrollment.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    enrollmentDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Enrollment;
