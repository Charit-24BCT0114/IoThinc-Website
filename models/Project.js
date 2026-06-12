// models/Project.js
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
        type: DataTypes.STRING 
    },
    github_url: {
        type: DataTypes.STRING
    },
    project_lead: {
        type: DataTypes.STRING // Plain text field so anyone can lead it now
    }
});

module.exports = Project;