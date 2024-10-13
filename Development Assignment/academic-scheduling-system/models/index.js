const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('acss', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = require('./user.model')(sequelize);
const Room = require('./room.model')(sequelize);
const Schedule = require('./schedule.model')(sequelize);
const Enrollment = require('./enrollment.model')(sequelize);

module.exports = {
  sequelize,
  User,
  Room,
  Schedule,
  Enrollment
};