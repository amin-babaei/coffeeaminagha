import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Customers from '../../../models/CustomerModel';
import bcrypt from "bcrypt";
import connectDB from "../../../utils/connectDB";

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            if (user?._id) token._id = user._id;
            if (user?.root) token.root = user.root;
            if (user?.userName) token.userName = user.userName;
            if (user?.email) token.email = user.email;
            if (user?.phone) token.phone = user.phone;
            if (user?.city) token.city = user.city;
            if (user?.address) token.address = user.address;
            return token;
        },
        async session({ session, token }) {
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            if (token?._id) session.user._id = token._id;
            if (token?.root) session.user.root = token.root;
            if (token?.userName) session.user.userName = token.userName;
            if (token?.email) session.user.email = token.email;
            if (token?.phone) session.user.phone = token.phone;
            if (token?.city) session.user.city = token.city;
            if (token?.address) session.user.address = token.address;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await connectDB()

                const user = await Customers.findOne({
                    email: credentials.email,
                });
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        userName: user.userName,
                        email: user.email,
                        phone: user.phone,
                        city: user.city,
                        isAdmin: user.isAdmin,
                        root: user.root,
                        address: user.address,
                    };
                }
                throw new Error('ایمیل یا پسورد اشتباه می باشد');
            },
        }),
    ],
    secret : process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)