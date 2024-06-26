const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('student','admin'),
        defaultValue: 'student',
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
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
    paranoid: true,    // Enable soft deletes (using deleted_at)
    underscored: true  // Use snake_case column names
});

module.exports = User;