'use client'
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import Image from "next/image";
import {DataContext} from "../../store/GlobaStore";
import {useContext} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import BuyCart from "../../components/BuyCart";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {getData, postData} from "../../services/fetchData";
import { priceNumber } from "../../utils/priceNumber";

const CartPage = () => {
    const{data:session} = useSession()
    const {state, dispatch} = useContext(DataContext);
    const {cart,orders,loading} = state;
    const router = useRouter()
    const deleteItem = (data, id, type) => {
        const newData = data.filter(item => item._id !== id)
        return ({type, payload: newData})
    }
    const increase = (data, id) => {
        const newData = [...data]
        newData.forEach(item => {
            if (item._id === id) item.quantity += 1
        })
        return ({type: 'ADD_CART', payload: newData})
    }
    const decrease = (data, id) => {
        const newData = [...data]
        newData.forEach(item => {
            if(item._id === id) item.quantity -= 1
        })
        return ({ type: 'ADD_CART', payload: newData })
    }

    const handlePayment = async (total) => {
        dispatch({ type: "LOADING", payload: true});
        let newCart = [];
        for (const item of newCart) {
            const res = await getData(`product/${item._id}`);
            if (res.product.inStock - item.quantity >= 0) {
                newCart.push(item);
            }
        }
        postData('order', { cart, total })
            .then(res => {
                    if (res.err){
                        dispatch({ type: "LOADING", payload: false});
                        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    }
                    dispatch({ type: "ADD_CART", payload: [] });
                    const newOrder = {
                        ...res.newOrder,
                        user: session.user,
                    };
                    dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
                    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
                    dispatch({ type: "LOADING", payload: false});
                    return router.push(`/profile/orders/${res.newOrder._id}`);
                }
            );
    };
    return (
        <Box marginTop="40px" minHeight="90vh" component="section">
            <Container maxWidth="lg">
                {cart.length === 0 ? (
                    <>
                        <Typography variant="h5" component="h3" color="primary" align="center">سبد خرید شما خالی است
                            !</Typography>
                        <Box width="100%" height="300px" position="relative" mt={15}>
                            <Image src='/images/cart.svg' fill alt="cart"/>
                        </Box>
                    </>
                ) : (
                    <Grid container rowSpacing={5}>
                        <Grid item xs={12} sm={9}>
                            {cart.map(product => (
                                <Box display="flex" mb={4} key={product._id}>
                                    <Image src={product.images[0].url} width={300}height={200} alt={product.title}/>
                                    <Box display="flex" flexDirection="column" mr={5} pt={2}>
                                        <Typography color="primary" variant="h5"
                                                    component="h3">{product.title.split("-").join(" ")}</Typography>
                                        <Typography color="primary" variant="h6" component="p" my={3}>قیمت
                                            : {priceNumber(product.price)} تومان</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Button disabled={product.quantity === product.inStock} sx={{minWidth:"0",p:0}}>
                                                <AddCircleIcon color="success" sx={{fontSize: "35px",cursor:"pointer"}}
                                                     onClick={() => dispatch(increase(cart, product._id))}
                                                />
                                            </Button>
                                            <Typography color="primary" px={3}>{product.quantity}</Typography>
                                            <Button disabled={product.quantity===1} sx={{minWidth:"0",p:0}}
                                                onClick={() => dispatch(decrease(cart, product._id))}>
                                                <RemoveCircleIcon color="error" sx={{fontSize: "35px",cursor:"pointer"}}
                                                />
                                            </Button>
                                        </Box>
                                        <Button variant="contained" color="error" sx={{mt: 4,width:"130px"}}
                                                onClick={() => dispatch(deleteItem(cart, product._id, 'ADD_CART'))}>
                                            <DeleteIcon color={"primary"} sx={{fontSize: "25px"}}/>
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <BuyCart cart={cart} loading={loading} handlePayment={handlePayment}/>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    )
}
export default CartPage;