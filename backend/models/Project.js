const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
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
        allowNull: false
    },
    tech_stack: {
        type: DataTypes.STRING   // comma-separated, e.g. "ESP32,Python,React"
    },
    github_url: {
        type: DataTypes.STRING
    },
    project_lead: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING   // "Live" | "In Development" | "Completed" | "Beta Testing"
    },
    image_url: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false         // e.g. "2025-2026"
    }
});

module.exports = Project;