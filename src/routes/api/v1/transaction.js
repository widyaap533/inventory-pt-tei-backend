const express = require('express');
const router = express.Router();
const transactionController = require('../../../controllers/transaction'); 
const passport = require('../../../middlewares/passport');

router.post('/transaction', transactionController.createTransaction);
router.get('/transaction/:id', transactionController.getTransactionById);
router.get('/transaction', passport.authenticate("user", { session: false }), transactionController.getAllTransaction);
router.delete('/transaction/:id', passport.authenticate("user", { session: false }), transactionController.deleteTransaction);

module.exports = router;