const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CommitteeMember = sequelize.define('CommitteeMember', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.STRING   // e.g. "3rd Year"
    },
    skills: {
        type: DataTypes.STRING   // comma-separated, e.g. "React,Node.js"
    },
    github_url: {
        type: DataTypes.STRING
    },
    linkedin_url: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false         // e.g. "2025-2026"
    }
});

module.exports = CommitteeMember;