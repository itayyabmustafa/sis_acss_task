const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sis', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = require('./user.model')(sequelize);
const Student = require('./student.model')(sequelize);
const Course = require('./course.model')(sequelize);
const Enrollment = require('./enrollment.model')(sequelize);
const Schedule = require('./schedule.model')(sequelize);

module.exports = {
  sequelize,
  User,
  Student,
  Course,
  Enrollment,
  Schedule
};