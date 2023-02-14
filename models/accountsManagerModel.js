const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    account_id: {
        type: String,
        required: [true, 'Account id is required!'],
        unique: true,
        trim: true,
        minLength: [3, `Account id should be atleast 3 charector!`],
        maxLength: [20, `Account id should less then 20 charector!`],
        validate: {
            validator: async (value) => {
                const accountsCount = await mongoose.models.account.count({ account_id: value });
                return !accountsCount;
            },
            message: props => `${props.value} account id already exists`
        },
        ref: 'transaction'
    },
    limit: { type: Number, default: 0 },
    products: []
}, {
    timestamps: true
})

module.exports = mongoose.model('account', accountSchema)