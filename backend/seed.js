const sequelize = require('./config/db'); 
const CommitteeMember = require('./models/CommitteeMember'); 
const seedManualData = async () => {
  try {
   
    await sequelize.sync();

    // our 10 member details
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

    console.log("Inserting member records into MySQL...");
    
        await CommitteeMember.bulkCreate(memberData);
    
    console.log(" Success! Members have been added manually using Sequelize.");
    process.exit(0);
  } catch (error) {
    console.error(" Something went wrong while seeding:", error);
    process.exit(1);
  }
};

seedManualData();
