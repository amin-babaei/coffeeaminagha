'use client'
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import { Fire } from '../../helper/decoration/Fire'
import DatePicker from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const OrderDetail = ({ orders, id }) => {
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === id)
        setOrderDetail(newArr[0])
        if(orderDetail?.cart?.length > 0) return Fire()
    }, [id, orderDetail, orders])

    if(!orderDetail) return<Typography fontSize="16px" component="p" color="primary" align="center">سفارش یافت نشد</Typography>

    return (
        <Box display="flex" justifyContent="center">
            <Box width="100%" marginTop={"50px"} p={2} className="border">
                <Box sx={{ display: { xs: 'block', sm: 'flex' } }} justifyContent="center" alignItems="center">
                    <Typography color="primary" variant="h5" component="h3" textAlign="center">خرید شما موفقیت آمیز
                        بود</Typography>
                    <CheckCircleIcon color="success" sx={{
                        fontSize: "40px",
                        width: { xs: "100%", sm: "auto" },
                        mt: { xs: "15px", sm: "0" },
                        ml: { xs: '0', sm: '10px' }
                    }} />
                </Box>
                <Typography fontSize="16px" component="p" color="primary.dark" my={4} align="center">از اینکه مجموعه
                    ما
                    را انتخاب کردید سپاس گذاریم.
                </Typography>
                <Typography variant="h5" component="h3" color="primary" mt={2}>جزئیات سفارش</Typography>
                <hr />
                {orderDetail && orderDetail.cart &&
                    orderDetail.cart.map(item => (
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}
                            borderBottom="1px solid rgba(255,255,255,0.3)"
                            key={item._id}>
                            <Typography color="primary" component="p">{item.title.split("-").join(" ")}</Typography>
                            <Typography color="primary">{item.quantity} عدد</Typography>
                            <Typography color="primary">{item.price} تومان</Typography>
                        </Box>
                    ))
                }
                {orderDetail && (
                    <Box mt={5}>
                        <Typography color="primary">جمع کل : {orderDetail.total} تومان</Typography>
                        <Box color="white" my={2}>تاریخ سفارش :
                            <DatePicker
                                containerClassName="custom-container"
                                value={orderDetail.createdAt}
                                calendar={persian}
                                locale={persian_fa}
                                readOnly />
                            ساعت :
                            <DatePicker
                                containerClassName="custom-container"
                                format="hh:mm:ss A"
                                plugins={[
                                    <TimePicker key={orderDetail.createdAt} />
                                ]}
                                style={{ width: "130px" }}
                                value={orderDetail.createdAt}
                                calendar={persian}
                                locale={persian_fa}
                                readOnly />
                        </Box>
                        <Typography color="primary">کد پیگیری : {orderDetail._id}</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
export default OrderDetail