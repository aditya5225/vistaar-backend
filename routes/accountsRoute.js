const router = require('express').Router();
const accountsController = require('../controllers/accountsController');

router.get('/fetch_accounts', accountsController.fetchAccounts);
router.get('/fetch_products', accountsController.fetchProducts);

module.exports = router;