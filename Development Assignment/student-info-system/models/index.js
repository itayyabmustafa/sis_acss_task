const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sis', 'root', '', {
  host: 'localhost',       // MySQL server address
  dialect: 'mysql',        // Dialect (mysql)
  logging: console.log,    // Log SQL queries
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