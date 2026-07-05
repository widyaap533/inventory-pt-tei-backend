const express = require('express');
const router = express.Router();

const staff = require('./staff');
const device = require('./device');
const category = require('./category');
const transaction = require('./transaction');

router.use(staff);
router.use(device);
router.use(category);
router.use(transaction);

module.exports = router;