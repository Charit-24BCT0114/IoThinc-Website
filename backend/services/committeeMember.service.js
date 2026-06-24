const CommitteeMember = require('../models/CommitteeMember');

exports.getMembersByYear = async (year) => {
    return CommitteeMember.findAll({
        where: year ? { academicYear: year } : {}
    });
};

exports.createMember = async (memberData) => {
    return CommitteeMember.create(memberData);
};

exports.updateMember = async (id, updateData) => {
    const member = await CommitteeMember.findByPk(id);
    if (!member) throw new Error('Committee member not found');
    await member.update(updateData);
    return member;
};