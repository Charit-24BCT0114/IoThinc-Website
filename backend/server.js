// server.js
const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

// Import models so Sequelize registers them during sync
const User = require('./models/User');
const CommitteeMember = require('./models/CommitteeMember');
const Project = require('./models/Project');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Club Website Backend API is running smoothly.');
});

// Function to handle seeding the admin account safely
// Function to handle seeding the admin account safely
const seedAdminAccount = async () => {
    try {
        // Pull the fully compiled model directly from the active sequelize instance
        const UserModel = sequelize.models.User;

        if (!UserModel) {
            throw new Error("User model registry not found inside Sequelize.");
        }

        // Use the instance-bound model to look for the admin email
        const adminCheck = await UserModel.findOne({
            where: { email: process.env.ADMIN_EMAIL }
        });

        if (!adminCheck) {
            await UserModel.create({
                email: process.env.ADMIN_EMAIL,
                password_hash: process.env.ADMIN_PASSWORD,
                role: 'admin'
            });
            console.log(` Default Admin account generated dynamically!`);
            console.log(` Email: ${process.env.ADMIN_EMAIL}`);
            console.log(` Password: ${process.env.ADMIN_PASSWORD}`);
        } else {
            console.log(' Admin account verified (already exists).');
        }
    } catch (error) {
        console.error(' Warning: Failed to automatically seed admin user:', error.message);
    }
};
// Sync database structures and then run the seed sequence
sequelize.sync()
    .then(async () => {
        console.log(' Database tables synced successfully!');
        
        // Execute the admin check safely now that everything is synchronized
        await seedAdminAccount();

        app.listen(PORT, () => {
            console.log(` Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(' Unable to sync database:', error);
    });
