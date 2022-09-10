/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../../../utils/connectDB'
import Products from '../../../../../models/ProductModel'
import {getSession} from "next-auth/react";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PUT":
            await verifyComment(req, res)
            break;
        case "DELETE":
            await deleteComment(req, res)
            break;
    }
}
const verifyComment = async(req, res) => {
    try {
        const session = await getSession({ req });
        if (!session || !session.user.root) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})
        const {productId} = req.query
        const {commentId} = req.query

        await Products.findOneAndUpdate({ "_id": productId, "comments._id": commentId},{$set: {"comments.$.checked":true}})

        return res.status(200).json({message: 'آپدیت موفقیت آمیز بود'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const deleteComment = async(req, res) => {
    try {
        const session = await getSession({ req });
        if (!session || !session.user.root) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})

        const {commentId} = req.query
        const {productId} = req.query

        const product = await Products.findById(productId)
        const comment = product.comments.id(commentId);

        if(!comment) return res.status(404).json({message: 'کامنتی پیدا نشد'})

        comment.remove();
        await product.save();
        res.status(200).json({ message: 'کامنت با موفقیت حذف شد' });
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}