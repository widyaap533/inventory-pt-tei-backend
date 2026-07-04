const express = require('express');
const router = express.Router();
const deviceController = require('../../../controllers/device');

router.get('/device', deviceController.getAllDevice);
router.post('/device', deviceController.createDevice);
router.get('/device/:id', deviceController.getDeviceById);
router.put('/device/:id', deviceController.updateDevice);
router.delete('/device/:id', deviceController.deleteDevice);

module.exports = router;