// models/Schedule.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Schedule = sequelize.define('Schedule', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    dayOfWeek: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Schedule;
