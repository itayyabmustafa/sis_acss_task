const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Course = require('./Course');

const Schedule = sequelize.define('Schedule', {
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Define association
Schedule.belongsTo(Course);

module.exports = Schedule;
