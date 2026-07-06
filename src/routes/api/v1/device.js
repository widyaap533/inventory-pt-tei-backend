const express = require('express');
const router = express.Router();
const deviceController = require('../../../controllers/device');
const passport = require('../../../middlewares/passport');

router.get('/device', deviceController.getAllDevice);
router.get('/device/:id', deviceController.getDeviceById);
router.post('/device', passport.authenticate("user", { session: false }), deviceController.createDevice);
router.put('/device/:id', passport.authenticate("user", { session: false }), deviceController.updateDevice);
router.delete('/device/:id', passport.authenticate("user", { session: false }), deviceController.deleteDevice);

module.exports = router;