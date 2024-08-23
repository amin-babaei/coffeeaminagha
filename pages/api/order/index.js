import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/OrderModel'
import Products from '../../../models/ProductModel'
import Customer from '../../../models/CustomerModel'
import {getSession} from "next-auth/react";
import {authOptions} from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth';

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createOrder(req, res)
            break;
        case "GET":
            await getOrders(req, res)
            break;
    }
}

const getOrders = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session || !session.user.isAdmin){
            return res.status(401).send('شما اجازه نداری');
        }
        let orders;
        if(session.user.isAdmin) {
            orders = await Orders.find().populate("user", "-password").sort({ createdAt: -1 })
        }

        res.json({orders})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createOrder = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        const { userCart, totalPrice } = req.body;

        const newOrder = new Orders({
            user: session.user, cart: userCart, total: totalPrice
        });

        userCart.forEach(async (item) => {
            const { _id, inStock, sold } = item.productDetail;
            if (!inStock || !item.quantity) {
                throw new Error("Invalid item quantity or stock.");
            }
            await updateProductStock(_id, item.quantity, inStock, sold);
        });
        await Customer.findOneAndUpdate({ _id: session.user._id }, { cart: [] });
        await newOrder.save();

        res.json({
            msg: 'خرید شما موفقیت آمیز بود',
            newOrder
        });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

const updateProductStock = async (id, quantity, oldInStock, oldSold) => {
    
    const newInStock = oldInStock - quantity;
    const newSold = quantity + oldSold;

    if (isNaN(newInStock) || isNaN(newSold)) {
        throw new Error("Invalid stock or sold value.");
    }

    await Products.findOneAndUpdate(
        { _id: id },
        {
            inStock: newInStock,
            sold: newSold
        }
    );
}
