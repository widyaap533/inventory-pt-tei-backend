const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/category'); 

router.get('/category', categoryController.getAllCategory);
router.post('/category', categoryController.createCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;