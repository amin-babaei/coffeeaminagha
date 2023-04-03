/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';

connectDB()

export default async (req, res)=> {
    switch(req.method){
        case 'GET':
            await getComments(req, res)
            break;
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Products.find().select('comments title').populate("comments.user", "-password").sort({ createdAt: -1 })
        return res.json({
            status:'success',
            comments
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

