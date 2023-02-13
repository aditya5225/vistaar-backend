const router = require('express').Router();
const transactionsController = require('../controllers/transactionsController');

router.get('/fetch_transactions', transactionsController.transactions);

module.exports = router;