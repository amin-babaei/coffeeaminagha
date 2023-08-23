'use client'
import { Box, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { DataContext } from "../../store/GlobaStore";
import { useContext } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import BuyCart from "../../components/BuyCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getData, postData } from "../../services/fetchData";
import { priceNumber } from "../../utils/priceNumber";
import { addToCart, decreaseToCart, deleteToCart } from "../../store/Actions";
import { useEffect } from "react";

const CartPage = () => {
    const { data: session } = useSession()
    const { state, dispatch } = useContext(DataContext);
    const { cart, orders, loading } = state;
    const { userCart,totalPrice } = cart
    const router = useRouter()
    useEffect(() => {
        const getCartUser = async () => {
            const { userCart,totalPrice } = await getData('cart')
            dispatch({ type: 'ADD_CART', payload: {userCart,totalPrice} })
        }
        getCartUser()
    }, [dispatch])

    const handleIncrease = (productId) => {
        dispatch(addToCart(productId, session.user._id, dispatch))
    };
    const handleDecreaseToCart = (productId) => {
        dispatch(decreaseToCart(productId, session.user._id, dispatch))
    };
    const handleDeleteToCart = (productId) => {
        dispatch(deleteToCart(productId, session.user._id, dispatch))
    };

    const handlePayment = async () => {
        dispatch({ type: "LOADING", payload: true });
        postData('order', { userCart, totalPrice })
            .then(res => {
                if (res.err) {
                    dispatch({ type: "LOADING", payload: false });
                    return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                }
                dispatch({ type: "ADD_CART", payload: [] });
                const newOrder = {
                    ...res.newOrder,
                    user: session.user,
                };
                dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
                dispatch({ type: "NOTIFY", payload: { success: res.msg } });
                dispatch({ type: "LOADING", payload: false });
                return router.push(`/profile/orders/${res.newOrder._id}`);
            }
            );
    };
    return (
        <Box marginTop="40px" minHeight="90vh" component="section">
            <Container maxWidth="lg">
                {userCart?.length === 0 ? (
                    <>
                        <Typography variant="h5" component="h3" color="primary" align="center">سبد خرید شما خالی است
                            !</Typography>
                        <Box width="100%" height="300px" position="relative" mt={15}>
                            <Image src='/images/cart.svg' fill alt="cart" />
                        </Box>
                    </>
                ) : (
                    <Grid container rowSpacing={5}>
                        <Grid item xs={12} sm={9}>
                            {userCart?.map(product => (
                                <Box display="flex" mb={4} key={product.productDetail._id}>
                                    <Image src={product.productDetail.images[0].url} width={300} height={200} alt={product.productDetail.title} />
                                    <Box display="flex" flexDirection="column" mr={5} pt={2}>
                                        <Typography color="primary" variant="h5"
                                            component="h3">{product?.productDetail?.title?.split("-").join(" ")}</Typography>
                                        <Typography color="primary" variant="h6" component="p" my={3}>قیمت
                                            : {priceNumber(product?.productDetail.price)} تومان</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Button disabled={product?.quantity === product.productDetail.inStock} sx={{ minWidth: "0", p: 0 }}>
                                                <AddCircleIcon color="success" sx={{ fontSize: "35px", cursor: "pointer" }}
                                                    onClick={() => handleIncrease(product.productDetail._id)}
                                                />
                                            </Button>
                                            <Typography color="primary" px={3}>
                                                {loading ? <Skeleton animation="wave" variant="text" width={30} height={30} sx={{backgroundColor:'rgba(255,255,255,0.3)'}}/> : product.quantity}
                                            </Typography>
                                            <Button disabled={product.quantity === 1} sx={{ minWidth: "0", p: 0 }}
                                                onClick={() => handleDecreaseToCart(product.productDetail._id)}>
                                                <RemoveCircleIcon color="error" sx={{ fontSize: "35px", cursor: "pointer" }}
                                                />
                                            </Button>
                                        </Box>
                                        <Button variant="contained" color="error" sx={{ mt: 4, width: "130px" }}
                                            onClick={() => handleDeleteToCart(product.productDetail._id)}>
                                            <DeleteIcon color={"primary"} sx={{ fontSize: "25px" }} />
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <BuyCart totalPrice={totalPrice} loading={loading} handlePayment={handlePayment} />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    )
}
export default CartPage;