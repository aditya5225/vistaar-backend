const customerManagerDb = require('../models/customerManagerModel');

const fetchCustomersFun = async (req, res) => {
    let response = {};

    try {
        const limitData = req.query.limit && req.query.limit >= 0 ? req.query.limit : 10;
        const skipData = req.query.skip && req.query.skip >= 0 ? (req.query.skip - 1) * limitData : 0;
        let findQuery = {}

        if (req.query.active != undefined) {
            if (req.query.active.trim().toLowerCase() == 'true') {
                findQuery.active = true
            }
            else if (req.query.active.trim().toLowerCase() == 'false') {
                findQuery.active = false
            }
        }

        const customersData = await customerManagerDb.find(findQuery).skip(skipData).limit(limitData);
        const dataCount = await customerManagerDb.find(findQuery).count();

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