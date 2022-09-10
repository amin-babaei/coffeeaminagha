/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Customers from '../../../models/CustomerModel'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { userName, email , password, phone, city, address} = req.body

        const user = await Customers.findOne({email})
        if(user) return res.status(400).json({err: 'این ایمیل قبلا استفاده شده'})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Customers({
            userName, email, password:passwordHash, phone ,city,address,isAdmin:false,root:false
        })
        await newUser.save()
       return  res.status(201).json({msg: "ثبت نام موفقیت آمیز بود"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}