const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Student = require('./Student');
const Course = require('./Course');

const Enrollment = sequelize.define('Enrollment', {
    enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        }
    }
});

// Define associations
Enrollment.belongsTo(Student, { foreignKey: 'studentId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Enrollment;
