// models/Room.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    roomName: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Room;
