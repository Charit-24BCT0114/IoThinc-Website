const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

router.get('/', committeeMemberController.getMembersByYear);
router.post('/', committeeMemberController.createMember);
router.put('/:id', committeeMemberController.updateMember);

module.exports = router;