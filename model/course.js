const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Courses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
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

module.exports = Course;