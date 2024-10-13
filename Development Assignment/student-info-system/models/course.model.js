const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};