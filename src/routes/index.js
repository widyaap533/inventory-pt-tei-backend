const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

router.use(apiRoutes);

module.exports = router;