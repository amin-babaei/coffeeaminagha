/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Products from '../../../models/ProductModel'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}
const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if(!product) return res.status(400).json({err: 'این محصول وجود ندارد'})

        res.json({ product })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const updateProduct = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || !session.user.root) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})
        const {id} = req.query
        const {title, price, inStock, description, images} = req.body

        if(!title || !price || !inStock || !description || images.length === 0)
            return res.status(400).json({err: 'همه فیلد را پر کن'})

        await Products.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), price, inStock, description, images
        })

        return res.status(200).json({msg: 'آپدیت موفقیت امیز بود'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteProduct = async(req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session || !session.user.isAdmin) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})
        const {id} = req.query

        await Products.findByIdAndRemove(id)
        res.json({msg: 'محصول با موفقیت حذف شد'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}