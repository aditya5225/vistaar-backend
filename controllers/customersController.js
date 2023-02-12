const customerManagerDb = require('../models/customerManagerModel');

const fetchCustomersFun = async (req, res) => {
    let response = {};
    const limitData = req.query.limit ? req.query.limit : 10;
    const skipData = req.query.skip ? (req.query.skip - 1) * limitData : 0;

    try {
        const dataCount = await customerManagerDb.count();
        const customersData = await customerManagerDb.find({}).limit(limitData).skip(skipData);

        response = {
            error: false,
            result: {
                dataCount,
                customersData,
                message: `Data fetched successfully!`
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

const fetchCustomers = async (req, res, next) => {
    let response = {};

    try {

        response = await fetchCustomersFun(req, res);
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
    fetchCustomers,
}