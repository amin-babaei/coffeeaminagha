const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    cart: Array,
    total: Number,
}, {
    timestamps: true
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;