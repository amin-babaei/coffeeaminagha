'use client'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
import {useState} from "react";
import {useSession} from "next-auth/react";
import DatePicker from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import {useEffect} from "react";
import {paginate} from "../../../utils/paginate";
import PaginationComponent from "../../../components/Pagination";
import TableSkelet from "../../../components/skeleton/TableSkelet";
import useFetch from "../../../helper/hooks/useFetch";
import usePaginate from "../../../helper/hooks/usePaginate";

export default function Orders() {
    const {data: session} = useSession();
    const {data: orders, loading} = useFetch("/order")
    const {currentPage, perPage, handlePage} = usePaginate(6)

    const [updated, setUpdated] = useState([]);

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setUpdated(orders.orders);
        }
    }, [orders, session]);

    const archive = paginate(updated, currentPage, perPage);
    return (
        <>
            {archive.length < 1 && !loading &&
                <Typography color="primary" variant="h5" component="h4">هیچ سفارشی ثبت نشده است !</Typography>}
            {loading ? <TableSkelet/>
                : (
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow color="white" style={{backgroundColor: "black"}}>
                                    <TableCell color="white" align="center">نام کاربری</TableCell>
                                    <TableCell color="white" align="center">ایمیل</TableCell>
                                    <TableCell color="white" align="center">شماره تماس</TableCell>
                                    <TableCell color="white" align="center">شهر</TableCell>
                                    <TableCell color="white" align="center">آدرس</TableCell>
                                    <TableCell color="white" align="center">عنوان</TableCell>
                                    <TableCell color="white" align="center">قیمت کل</TableCell>
                                    <TableCell color="white" align="center">تاریخ</TableCell>
                                    <TableCell color="white" align="center">کد پیگیری</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {archive.map((order) => (
                                    <TableRow
                                        key={order._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{order.user.userName}</TableCell>
                                        <TableCell align="center">{order.user.email}</TableCell>
                                        <TableCell align="center">{order.user.phone}</TableCell>
                                        <TableCell align="center">{order.user.city}</TableCell>
                                        <TableCell align="center">{order.user.address}</TableCell>
                                        <TableCell align="center">
                                            {order.cart.map(item => (
                                                <Typography key={item._id}
                                                            fontSize="14px">{item.title.split("-").join(" ")}({item.quantity})</Typography>
                                            ))}
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
                    </TableContainer>
                )
            }
            {!loading &&
                <PaginationComponent totalProduct={updated?.length} currentPage={currentPage} perPage={perPage}
                                     onPageChange={handlePage}/>
            }
        </>
    );
}
