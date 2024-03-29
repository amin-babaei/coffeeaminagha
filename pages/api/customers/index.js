import connectDB from '../../../utils/connectDB'
import Customers from '../../../models/CustomerModel'
import { getServerSession } from 'next-auth';
import {authOptions} from '../auth/[...nextauth]'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session || !session.user.isAdmin) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.isAdmin !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})

        const users = await Customers.find().select('-password')
        res.json({users})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
