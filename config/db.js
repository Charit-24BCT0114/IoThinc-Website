// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with your credentials from the .env file
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Keeps your terminal clean from noisy SQL logs
    }
);

module.exports = sequelize;