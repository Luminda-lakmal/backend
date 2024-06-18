const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./students');
const Course = require('./course');

const Enrollment = sequelize.define('Enrollments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // Define foreign key constraint
            model: Student,
            key: 'id'
        },
        unique: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // Define foreign key constraint
            model: Course,
            key: 'id'
        },
        unique: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,  // Enable timestamps
    paranoid: true,    // Enable soft deletes (using deleted_at)
    underscored: true  // Use snake_case column names
});

Enrollment.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

module.exports = Enrollment;