import { getServerSession } from "next-auth";
import Customers from "../../../models/CustomerModel";
import ProductModel from "../../../models/ProductModel";
import { authOptions } from '../auth/[...nextauth]'
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getCart(req, res)
            break;
    }
}

const getCart = async (req, res) => {

    const session = await getServerSession(req, res, authOptions)

    const cart = await Customers.findById(session.user._id).select('cart.quantity cart.productDetail')
    .populate({
      path: 'cart.productDetail',
      model: ProductModel,
      select: '-comments -sold',
    });

    const totalPrice = cart.cart.reduce((total, item) => {
        const itemPrice = item.quantity * item.productDetail.price;
        return total + itemPrice;
      }, 0);
      
    return res.status(200).json({ userCart: cart.cart , totalPrice: totalPrice });
}