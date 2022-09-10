/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';
import {getSession} from "next-auth/react";

connectDB()

export default async (req, res)=> {
    switch(req.method){
        case 'GET':
            await getProducts(req, res)
        case "POST":
            await createProduct(req, res)
            break;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        return res.json({
            status:'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const session = await getSession({ req });
        if (!session || !session.user.isAdmin) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})

        const {title, price, inStock, description, images} = req.body

        if(!title || !price || !inStock || !description || images.length === 0) return res.status(400).json({err: 'همه فیلد ها را پر کنید'})

        const newProduct = new Products({
            title, price, inStock, description, images
        })

        await newProduct.save()

        res.status(201).json({msg: 'محصول با موفقیت ساخته شد'})

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
}