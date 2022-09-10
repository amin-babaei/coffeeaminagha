import connectDB from '../../../utils/connectDB'
import Users from '../../../models/CustomerModel'
import {getSession} from "next-auth/react";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "DELETE":
            await deleteUser(req, res)
            break;
    }
}

const deleteUser = async (req, res) => {
    try {
        const session = await getSession({ req });
        if (!session || !session.user.root) {
            return res.status(401).send('شما ادمین نیستی');
        }
        if(session.user.root !== true) return res.status(400).json({err: 'شما اجازه این کار را ندارید'})

        const {id} = req.query

        await Users.findByIdAndDelete(id)
        res.json({msg: 'با موفقیت حذف شد'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}