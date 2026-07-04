const express = require('express');
const router = express.Router();
const transactionController = require('../../../controllers/transaction'); 

router.get('/transaction', transactionController.getAllTransaction);
router.post('/transaction', transactionController.createTransaction);
router.get('/transaction/:id', transactionController.getTransactionById);
router.delete('/transaction/:id', transactionController.deleteTransaction);

module.exports = router;