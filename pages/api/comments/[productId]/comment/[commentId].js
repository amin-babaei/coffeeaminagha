/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../../../utils/connectDB'
import Products from '../../../../../models/ProductModel'
import { authOptions } from '../../../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Comment from '../../../../../models/CommentModel';

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
        const session = await getServerSession(req, res, authOptions);
        if (!session || !session.user.root) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})
        const {productId} = req.query
        const {commentId} = req.query
        
        const product = await Products.findById(productId).populate('comments');
        if (!product) {
          return res.status(400).json({ err: 'این محصول وحود ندارد' });
        }
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            { checked: true },
            { new: true }
          ).populate({path: 'user', model: 'Customer'});

          if (!comment) {
            return res.status(400).json({ err: 'این کامنت وجود ندارد' });
          }

          product.comments.push(comment);
          await product.save();
      
          return res.status(200).json({ message: 'آپدیت موفقیت آمیز بود', product });
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const deleteComment = async(req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
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