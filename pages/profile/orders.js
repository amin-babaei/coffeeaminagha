import * as React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Typography,Paper} from '@mui/material';
import ProfileLayout from "../../layouts/ProfileLayout";
import Head from "next/head";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import connectDB from "../../utils/connectDB";
import Orders from "../../models/OrderModel";
import {getSession} from "next-auth/react";
import Link from "next/link";

export default function OrderDetails({orders}) {

    return (
        <TableContainer component={Paper}>
            <Head>
                <title>سفارشات</title>
            </Head>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead sx={{background: "black"}}>
                    <TableRow color="white" style={{backgroundColor:"black"}}>
                        <TableCell color="white" align="center">عنوان</TableCell>
                        <TableCell color="white" align="center">قیمت کل</TableCell>
                        <TableCell color="white" align="center">تاریخ</TableCell>
                        <TableCell color="white" align="center">کد پیگیری</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">
                                <Link href={`/profile/order/${order._id}`}>
                                    <div>
                                        {order.cart.map(item => (
                                            <Typography key={item._id}
                                                        fontSize="14px" sx={{
                                                cursor: "pointer",
                                                textDecoration: "underline"
                                            }}>{item.title.split("-").join(" ")}({item.quantity})</Typography>
                                        ))}
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell align="center">{order.total} تومان</TableCell>
                            <TableCell align="center"><DatePicker
                                containerClassName="custom-container"
                                value={order.createdAt}
                                calendar={persian}
                                locale={persian_fa}
                                readOnly/></TableCell>
                            <TableCell align="center">{order._id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                    {orders.length === 0 && <Typography p={3}>شما هنوز خرید نکرده اید</Typography>}
        </TableContainer>
    );
}
export const getServerSideProps = async ({req}) => {
    const session = await getSession({req});
    await connectDB()
    let response = await Orders.find({user: session.user._id}).populate("user", "-password").select("-user").sort({ createdAt: -1 })
    const orders = JSON.parse(JSON.stringify(response));

    return {
        props: {
            orders
        },
    };
}
OrderDetails.Layout = ProfileLayout;