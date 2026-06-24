const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

// Models
const User = require('./models/User');
const CommitteeMember = require('./models/CommitteeMember');
const Project = require('./models/Project');

// Routes
const committeeMemberRoutes = require('./routes/committeeMember.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3008',
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('IoTHINC Backend API is running.');
});

app.use('/api/committee-members', committeeMemberRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

// ── Seed admin ──
const seedAdminAccount = async () => {
    try {
        const UserModel = sequelize.models.User;
        if (!UserModel) throw new Error('User model not found.');
        const adminCheck = await UserModel.findOne({ where: { email: process.env.ADMIN_EMAIL } });
        if (!adminCheck) {
            await UserModel.create({
                email: process.env.ADMIN_EMAIL,
                password_hash: process.env.ADMIN_PASSWORD,
                role: 'admin'
            });
            console.log(`✅ Admin account created — ${process.env.ADMIN_EMAIL}`);
        } else {
            console.log('✅ Admin account already exists.');
        }
    } catch (error) {
        console.error('⚠️  Admin seed failed:', error.message);
    }
};

// ── Auto-seed members only if table is empty ──
const seedMembers = async () => {
    try {
        const count = await CommitteeMember.count();
        if (count > 0) {
            console.log(`✅ Members already seeded (${count} records).`);
            return;
        }

        const memberData = [
            { name: 'Jaanvi Doshi',       role: 'Member',           academicYear: '2025-2026' },
            { name: 'Arko Biswas',         role: 'Head of Design',   academicYear: '2025-2026' },
            { name: 'Kshitij Manikshete',  role: 'Management Head',  academicYear: '2025-2026' },
            { name: 'Lilite Paul',         role: 'Member',           academicYear: '2025-2026' },
            { name: 'Maheshwar R. G.',     role: 'Member',           academicYear: '2025-2026' },
            { name: 'Chirag Vinid',        role: 'Technical Head',   academicYear: '2025-2026' },
            { name: 'Vishal C. Tantri',    role: 'Member',           academicYear: '2025-2026' },
            { name: 'Srija Koppar',        role: 'Member',           academicYear: '2025-2026' },
            { name: 'Pratham Kohli',       role: 'Member',           academicYear: '2025-2026' },
            { name: 'Megh Chakravarty',    role: 'Member',           academicYear: '2025-2026' },
        ];

        await CommitteeMember.bulkCreate(memberData);
        console.log('✅ Committee members seeded successfully.');
    } catch (error) {
        console.error('⚠️  Member seed failed:', error.message);
    }
};

// ── Start ──
sequelize.sync({ alter: true })
    .then(async () => {
        console.log('✅ Database synced.');
        await seedAdminAccount();
        await seedMembers();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ DB sync failed:', err);
    });