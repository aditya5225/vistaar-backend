const router = require('express').Router();
const customersController = require('../controllers/customersController');

router.get('/fetch_customers', customersController.fetchCustomers);

module.exports = router;