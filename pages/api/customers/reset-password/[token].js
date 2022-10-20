import connectDB from '../../../../utils/connectDB'
import Customer from '../../../../models/CustomerModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}

const resetPassword = async (req, res) => {
        const { token } = req.query
        const { password, cf_password } = req.body

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        try {
            if (!decodedToken) {
               return res.status(401).json({err:'شما اجازه دسترسی نداری'})
            }

            if (password !== cf_password) {
               return res.status(422).json({err:'پسورد شما هماهنگ نمی باشد'})
            }

            const user = await Customer.findOne({ _id: decodedToken.customerId });

            if (!user) {
                return res.status(404).json({err:'همچین کاربری نداریم'})
            }
            user.password = await bcrypt.hash(password, 12);
            await user.save();

            res.status(200).json({ message: "پسورد با موفقیت تغییر یافت" , ok:true});
        } catch (err) {
            next(err);
        }
}