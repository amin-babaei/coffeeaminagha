/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../../utils/connectDB'
import Products from '../../../../models/ProductModel'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';


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

        const product = await Products.findById(productId)
        if(!product) return res.status(400).json({err: 'این محصول وجود ندارد'})

        const comment = {
            text: req.body.text,
            productId:req.body.productId,
            user: session.user,
            createdAt: Date.now()
        }

        product.comments.push(comment)
        await product.save()
        res.status(201).json({ message: 'success', product });
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

