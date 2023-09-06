/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../../utils/connectDB'
import Products from '../../../../models/ProductModel'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import Comment from '../../../../models/CommentModel';


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createComment(req, res)
            break;
    }
}
const createComment = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        const { productId } = req.query;     

        if (!session) {
            return res.status(401).send('ابتدا لاگین کنید');
        }

        const product = await Products.findById(productId)
        if(!product) return res.status(400).json({err: 'این محصول وجود ندارد'})

        const comment = new Comment({
            text: req.body.text,
            productId: productId,
            user: session.user._id,
            responseTo: req.body.responseTo || null,
          });

        await comment.save();
        res.status(201).json({ message: 'success', comment });
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

