const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    account_id: {
        type: Number,
        required: [true, 'Account id is required!'],
        unique: true,
        trim: true,
        minLength: [3, `Account id should be atleast 3 charector!`],
        maxLength: [20, `Account id should less then 20 charector!`],
        validate: {
            validator: async (value) => {
                const transactionsCount = await mongoose.models.transaction.count({ account_id: value });
                return !transactionsCount;
            },
            message: props => `${props.value} account id already exists`
        },
        ref: 'account'
    },
    transaction_count: { type: Number, default: 0 },
    bucket_start_date: {
        type: Date,
        required: [true, 'Bucket start date is required!'],
    },
    bucket_end_date: {
        type: Date,
        required: [true, 'Bucket end date is required!'],
    },
    transactions: [
        {
            date: Date,
            amount: Number,
            transaction_code: String,
            symbol: String,
            price: String,
            total: String
        },
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('transaction', transactionSchema)