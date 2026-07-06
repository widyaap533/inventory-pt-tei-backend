const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/category'); 
const passport = require('../../../middlewares/passport');

router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', passport.authenticate("user", { session: false }), categoryController.createCategory);
router.put('/category/:id', passport.authenticate("user", { session: false }), categoryController.updateCategory);
router.delete('/category/:id', passport.authenticate("user", { session: false }), categoryController.deleteCategory);

module.exports = router;