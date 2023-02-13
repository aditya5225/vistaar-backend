const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        trim: true,
        minLength: [3, `Username should be atleast 3 charector!`],
        maxLength: [20, `Username should less then 20 charector!`],
        validate: {
            validator: async (value) => {
                const customerCount = await mongoose.models.customer.count({ username: value });
                return !customerCount;
            },
            message: props => `${props.value} username already exists`
        },
    },
    name: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true,
        minLength: [3, `Name should be atleast 3 charector!`],
        maxLength: [20, `Name should less then 20 charector!`],
    },
    active: { type: Boolean, default: false },
    address: {
        type: String,
        default: '',
        trim: true
    },
    birthdate: {
        type: Date,
        max: new Date(),
        required: [true, 'Birthdate is required!'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: {
            validator: async (value) => {
                let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailReg.test(value)
            },
            message: props => `Please fill a valid email address`
        },
    },
    accounts: [],
    tier_and_details: {}
}, {
    timestamps: true
})

module.exports = mongoose.model('customer', customerSchema)