const express = require('express');
const cors = require('cors');
const axios = require('axios');
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
            { name: 'Srija Koppar',       role: 'Chairperson',       academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=119S6EvVvg_dFuq_P8OPDRN6j6lkLmATf' },
            { name: 'Vishal C. Tantri',   role: 'Vice Chairperson',  academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1KM9aecpOrsiO6Mo6I894UQGr9rV5brtG' },
            { name: 'Megh Chakravarty',   role: 'Secretary',         academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1zOLLFdme3H-8V6xYDECdh5iq0EpCsQZ1' },
            { name: 'Lilite Paul',        role: 'Co-Secretary',      academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=17VkTk3uktmE632isKUZTYQAfKd85ag9J' },
            { name: 'Chirag Vinid',       role: 'Technical Head',    academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1tpO8_Hsoevbmeqe_VP_GO5So4Ky8e0dW' },
            { name: 'Arko Biswas',        role: 'Design Head',       academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1jYg-YUi-RllVcQp2ouTDL-l4Zfsn0s0M' },
            { name: 'Kshitij Manikshete', role: 'Management Head',   academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1G6Y2I3-F2pXPQETZ_-qSfS-RP-_IysuW' },
            { name: 'Pratham Kohli',      role: 'Projects Head',     academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1s7pPg-mu3p6h6CK8vfiwxd8utMeJpLdy' },
            { name: 'Jaanvi Doshi',       role: 'Events Head',       academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1qQtCC1Rdu8f-e_2tmHvZVFnILayeiy7c' },
            { name: 'Maheshwar R. G.',    role: 'HR Head',           academicYear: '2025-2026', image_url: 'https://drive.google.com/uc?export=view&id=1YC5rV97sIehZ6np3jfvxuavKTU0gU0II' },
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