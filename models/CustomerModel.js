const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 7,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        length: 11,
        match: [/09([0-9])-?[0-9]{4}-?[0-9]{4}/, 'شماره موبایل اشتباه می باشد'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    root: {
        type: Boolean,
        default: false
    },
    cart: {
        type: [
            {
                productDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, },
                quantity: { type: Number, required: true, default: 1, },
            },
        ],
        default: [],
    },
}, {
    timestamps: true
})

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;