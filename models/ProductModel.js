const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        required: true
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;