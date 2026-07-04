const express = require('express');
const router = express.Router();

const authV1 = require("./api/v1/auth");
const apiV1 = require("./api/v1");
const passport = require('../middlewares/passport');

router.use(authV1);

router.use(
    passport.authenticate("user", { session: false }), 
    apiV1);

module.exports = router;