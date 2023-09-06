const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    checked: {
        type: Boolean,
        default: false
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    responseTo: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }
}, {
    timestamps: true
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;