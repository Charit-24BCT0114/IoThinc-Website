const committeeMemberService = require('../services/committeeMember.service');

exports.getMembersByYear = async (req, res) => {
    try {
        const { year } = req.query;
        const members = await committeeMemberService.getMembersByYear(year);
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.createMember = async (req, res) => {
    try {
        const member = await committeeMemberService.createMember(req.body);
        return res.status(201).json(member);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const member = await committeeMemberService.updateMember(req.params.id, req.body);
        return res.status(200).json(member);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
/*
exports.getMemberImage = async (req, res) => {
    try {
        const { data, contentType } =
            await committeeMemberService.getMemberImage(req.params.id);

        res.set('Content-Type', contentType);
        res.set('Cache-Control', 'public, max-age=86400');

        return res.send(data);
    } catch (error) {
        console.error('Image proxy error:', error.message);
        return res.status(404).send('Image not found');
    }
};*/