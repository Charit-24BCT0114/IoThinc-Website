const sequelize = require('./config/db'); 
const CommitteeMember = require('./models/CommitteeMember'); 
const seedManualData = async () => {
  try {
   
    await sequelize.sync();

    // our 10 member details
    const memberData = [
      { name: "Jaanvi Doshi", role: "Member" },
      { name: "Arko Biswas", role: "Head of Design" },
      { name: "Kshitij Manikshete", role: "Management Head" },
      { name: "Lilite Paul", role: "Member" },
      { name: "Maheshwar R. G.", role: "Member" },
      { name: "Chirag Vinid", role: "Technical Head" },
      { name: "Vishal C. Tantri", role: "Member" },
      { name: "Srija Koppar", role: "Member" },
      { name: "Pratham Kohli", role: "Member" },
      { name: "Megh Chakravarty", role: "Member" }

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
