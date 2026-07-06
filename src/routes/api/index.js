const express = require('express');
const router = express.Router();

const auth = require("./v1/auth");
const staff = require("./v1/staff");
const device = require("./v1/device");
const category = require("./v1/category");
const transaction = require("./v1/transaction");
const passport = require('../../middlewares/passport');

router.use(auth);
router.use(device);
router.use(category);
router.use(transaction);
router.use(passport.authenticate("user", { session: false }), staff);

module.exports = router;