const express = require('express');
const router = express.Router();

const apiV1 = require("./api");

router.use(apiV1);

module.exports = router;