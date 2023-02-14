const accountsManagerDb = require('../models/accountsManagerModel');

const fetchAccountsFun = async (req, res) => {
    let response = {};

    try {
        const limitData = req.query && req.query.limit && req.query.limit >= 0 ? req.query.limit : 10;
        const skipData = req.query && req.query.skip && req.query.skip >= 0 ? (req.query.skip - 1) * limitData : 0;
        let limitAmoutn = req.query && req.query.amount && req.query.amount >= 0 ? parseInt(req.query.amount) : 0

        const accountsData = await accountsManagerDb.aggregate([
            {
                $lookup: {
                    from: "transactions",
                    localField: "account_id",
                    foreignField: "account_id",
                    as: "transactions"
                }
            },
            { $unwind: '$transactions' },
            { $match: { 'transactions.transactions': { $elemMatch: { amount: { $lt: limitAmoutn } } } } },
            {
                $replaceWith: {
                    $unsetField: {
                        field: "transactions",
                        input: "$$ROOT"
                    }
                }
            },
            {
                $facet: {
                    accountsData: [{ $skip: +skipData }, { $limit: +limitData }],
                    dataCount: [{ $count: 'count' }]
                }
            },
            { $unwind: '$dataCount' },
        ]);

        response = {
            error: false,
            result: {
                dataCount: accountsData && accountsData[0]?.dataCount?.count ? accountsData[0].dataCount.count : 0,
                accountsData: accountsData && accountsData[0].accountsData ? accountsData[0].accountsData : [],
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

const fetchAccounts = async (req, res, next) => {
    let response = {};

    try {

        response = await fetchAccountsFun(req, res);
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

const fetchProducts = async (req, res, next) => {
    let response = {};

    try {

        const productsData = await accountsManagerDb.distinct('products')

        response = {
            error: false,
            result: {
                productsData,
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

    res.send(response);
    next()
}

module.exports = {
    fetchAccounts,
    fetchProducts,
}