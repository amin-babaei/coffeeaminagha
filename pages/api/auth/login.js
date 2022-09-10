/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Customers from '../../../models/CustomerModel'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await Customers.findOne({email})
        if(!user) return res.status(400).json({err: 'این ایمیل ثبت نشده دوست من'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({err: 'ایمیل یا رمز عبور اشتباه می باشد'})

        res.json({
            msg: "با موفقیت وارد شدی",
            user:{
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address,
                isAdmin: user.isAdmin,
                root: user.root
            }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}