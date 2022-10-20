import connectDB from '../../../utils/connectDB'
import Customer from '../../../models/CustomerModel'
import {getSession} from "next-auth/react";
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PUT":
            await resetPassword(req, res)
            break;
    }
}

const resetPassword = async (req, res) => {
    try {
        const session = await getSession({ req });
        const { password,cf_password } = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        if (password !== cf_password)return res.status(400).json({err: 'رمز عبور وارد شده یکسان نیست'})

        await Customer.findOneAndUpdate({_id: session.id}, {password: passwordHash})

        res.json({ msg: "رمزعبور با موفقیت تغییر کرد"})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}