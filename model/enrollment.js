const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');
const User = require('./users');

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
            model: User,
            key: 'id'
        },
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
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,  // Enable timestamps
    underscored: true,  // Use snake_case column names
    indexes: [
        {
            unique: true,
            fields: ['student_id', 'course_id']
        }
    ]
});

Enrollment.belongsTo(User, { foreignKey: 'student_id', as: 'user' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

module.exports = Enrollment;