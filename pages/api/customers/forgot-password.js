import connectDB from '../../../utils/connectDB'
import Customer from '../../../models/CustomerModel'
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../../utils/mailer";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await forgotPassword(req, res)
            break;
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const customer = await Customer.findOne({ email: email });
        if(!customer) return res.status(400).json({err: 'این ایمیل ثبت نشده دوست من'})
        const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

        await sendEmail(
            customer.email,
            customer.userName,
            resetLink
        );

        return res.status(200).json({ msg: "ایمیل برای شما ارسال شد" , ok:true})

    } catch (err) {
        return res.status(500).json({err: 'درحال حاضر امکان تغییر رمز عبور فراهم نیست'})
    }
}