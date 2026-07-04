const express = require('express');
const router = express.Router();
const staffController = require('../../../controllers/staff');

router.post('/staff', staffController.createStaff);
router.get('/staff/:id', staffController.getStaffById);
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router;