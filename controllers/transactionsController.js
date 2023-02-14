const transactionsDb = require('../models/transactionsModel');
const customerManagerDb = require('../models/customerManagerModel');

const transactionsFun = async (req, res) => {
    let response = {};

    try {
        if (req.query && req.query.account_id) {
            const transactionsData = await transactionsDb.findOne({ account_id: req.query.account_id.trim() });
            const customerData = await customerManagerDb.findOne({ account_id: req.query.account_id.trim() });

            response = {
                error: false,
                result: {
                    customerData,
                    transactionsData,
                    message: `Data fetched successfully!`
                }
            }
        }
        else {
            response = {
                error: true,
                message: 'Invalid account id!'
            }
        }
    }
    catch (err) {
        response = {
            error: true,
            message: err
        }
    }

    return response;
}

const transactions = async (req, res, next) => {
    let response = {};

    try {

        response = await transactionsFun(req, res);
    }
    catch (err) {
        response = {
            error: true,
            message: err
        }
    }

    res.send(response);
    next()
}

module.exports = {
    transactions,
}