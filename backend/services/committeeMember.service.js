const CommitteeMember = require('../models/CommitteeMember');

const axios = require('axios');

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
/*
exports.getMemberImage = async (id) => {
    const member = await CommitteeMember.findByPk(id);

    if (!member) {
        throw new Error('Member not found');
    }

    const url = member.image_url;

    // Extract Google Drive file ID
    const match = url.match(/[-\w]{25,}/);

    if (!match) {
        throw new Error('Invalid Google Drive URL');
    }

    const fileId = match[0];

    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const response = await axios.get(driveUrl, {
        responseType: 'arraybuffer'
    });

    return {
        data: response.data,
        contentType: response.headers['content-type'] || 'image/jpeg'
    };
};*/