const mongoose = require('mongoose');
import {trim} from "lodash/string";

const commentsSchema = new mongoose.Schema({

})
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
    comments: [
        {
            text:{
                type:String,
                required:true,
                trim:true
            },
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'Customer'
            },
            checked:{
                type:Boolean,
                default:false
            },
            productId: {
                type: mongoose.Types.ObjectId,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;