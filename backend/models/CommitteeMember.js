const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CommitteeMember = sequelize.define('CommitteeMember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = CommitteeMember;
