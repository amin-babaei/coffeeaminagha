import {Box, Container, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../store/GlobaStore";
import {useRouter} from "next/router";
import {Fire} from '../../../helper/decoration/Fire'
import DatePicker from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Orders from "../../../models/OrderModel";
import connectDB from "../../../utils/connectDB";
import {getSession} from "next-auth/react";
import Head from "next/head";
import {Skeleton} from "@mui/lab";

const Success = ({orders}) => {
    const [orderDetail, setOrderDetail] = useState([])
    const {state, dispatch} = useContext(DataContext)
    const {loading} = state
    const router = useRouter()

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr[0])
        Fire()
    },[orders])

    return (
        <Box minHeight="90vh" display="flex" justifyContent="center">
            <Head>
                <title>سفارشات</title>
            </Head>
            <Container maxWidth="lg">
                    {orderDetail.length === 0 ? <Skeleton sx={{backgroundColor:"rgba(255, 255, 255, 0.13)",mt:5}} variant="rectangular" width="100%" height={318} />
                    : (
                            <Box width="75%" m="auto" marginTop={"50px"} p={2} className="border">
                                <Box sx={{display: {xs: 'block', sm: 'flex'}}} justifyContent="center" alignItems="center">
                                    <Typography color="primary" variant="h4" component="h3" textAlign="center">خرید شما موفقیت آمیز
                                        بود</Typography>
                                    <CheckCircleIcon color="success" sx={{
                                        fontSize: "40px",
                                        width: {xs: "100%", sm: "auto"},
                                        mt: {xs: "15px", sm: "0"}
                                    }}/>
                                </Box>
                                <Typography fontSize="16px" component="p" color="primary.dark" my={4} align="center">از اینکه مجموعه
                                    ما
                                    را انتخاب کردید سپاس گذاریم.
                                </Typography>
                                <Typography variant="h5" component="h3" color="primary">جزئیات سفارش</Typography>
                                <hr/>
                                {loading === true && !orderDetail && <Typography>loading...</Typography>}
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
                                        <Typography color="primary" my={2}>تاریخ سفارش :
                                            <DatePicker
                                                containerClassName="custom-container"
                                                value={orderDetail.createdAt}
                                                calendar={persian}
                                                locale={persian_fa}
                                                readOnly/>
                                            ساعت :
                                            <DatePicker
                                                containerClassName="custom-container"
                                                format="hh:mm:ss A"
                                                plugins={[
                                                    <TimePicker key={orderDetail.createdAt}/>
                                                ]}
                                                style={{width:"130px"}}
                                                value={orderDetail.createdAt}
                                                calendar={persian}
                                                locale={persian_fa}
                                                readOnly/>
                                        </Typography>
                                        <Typography color="primary">کد پیگیری : {orderDetail._id}</Typography>

                                    </Box>
                                )}
                            </Box>
                        )
                    }
            </Container>
        </Box>
    )
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
export default Success