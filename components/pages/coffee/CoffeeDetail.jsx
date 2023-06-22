"use client"
import { Box, Breadcrumbs, Button, Container, Grid, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { DataContext } from "../../../store/GlobaStore";
import { useContext, useState } from "react";
import { addToCart } from "../../../store/Actions";
import FormComment from '../../coffee/FormComment'
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { priceNumber } from "../../../utils/priceNumber";

const ButtonPrice = styled(Button)(({ theme }) => ({
    margin: "20px 0 2px 0",
    width: "200px",
    fontSize: "17px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const CoffeeDetail = ({ product }) => {
    const [select, setSelect] = useState(0);
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
    const addedCart = () => {
        dispatch({ type: "NOTIFY", payload: { success: "محصول در سبد خرید شما قرار گرفت" } });
        dispatch(addToCart(product, cart));
    };

    return (
        <Box marginTop="40px" minHeight="90vh" component="section">
            <Container maxWidth="lg">
                <Breadcrumbs aria-label="breadcrumb" color="primary" sx={{ margin: "30px 0" }}>
                    <Link href="/">
                        <Button variant="text" color="primary" sx={{ cursor: "pointer" }}>صفحه اصلی</Button>
                    </Link>
                    <Link href="/coffees">
                        <Button variant="text" color="primary" sx={{ cursor: "pointer" }}>محصولات</Button>
                    </Link>
                    <Typography variant="body2" color="primary.dark">{product.title.split('-').join(" ")}</Typography>
                </Breadcrumbs>
                <Grid container rowSpacing={{ xs: 5, md: 0 }} columnSpacing={{ sm: 5 }}>
                    <Grid item xs={12} sm={6}>
                        <Box height={450} position='relative'>
                            <Image src={product.images[select].url} fill alt={product.title} style={{ height: "100%", width: "100%" }} />
                        </Box>
                        <Box display="flex" flexWrap="wrap" width="100%" mt={2}>
                            {product.images.map((img, index) => (
                                <Box position="relative" width="80px"
                                    height={"60px"} mx="5px" key={index}
                                    sx={{
                                        cursor: "pointer",
                                        ...(select === index ? { border: '2px solid white' } : { border: 'none' })
                                    }}
                                >
                                    <Image
                                        src={img.url}
                                        alt={index}
                                        fill
                                        onClick={() => setSelect(index)}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box color="primary.main">
                            <Typography variant="h2" component="h2" fontWeight='bold'>{product.title.split('-').join(" ")}</Typography>
                            <Typography variant="body1" component="p" color="primary.dark" lineHeight="2.5" align="justify" my={3}
                                >{product.description}
                            </Typography>
                            <Typography component="p" variant="h6" letterSpacing='1px' mt={5}
                                fontWeight="bold"> قیمت: {priceNumber(product.price)} تومان</Typography>
                                {cart.some(p => p._id === product._id) ? (
                                    <Link href='cart'>
                                        <ButtonPrice variant="outlined" color={"secondary"}>
                                            تسویه حساب
                                        </ButtonPrice>
                            </Link>
                                ) : (
                            <ButtonPrice variant="outlined" color={"secondary"}
                                disabled={product.inStock === 0}
                                onClick={addedCart}>
                                اضافه به سبد خرید
                            </ButtonPrice>
                                )}
                            <Typography color="error" my={1} component="p" fontSize="14px">تعداد موجود در انبار
                                : {product.inStock}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={{ xs: 10, md: 20 }}>
                    <Typography variant="h6" component="h3" color="primary" mt={5}>نظرات شما</Typography>
                    <hr />
                    <FormComment productId={product._id} />
                    {product.comments?.map(comment => (
                        comment.checked ? (
                            <Box
                                className="border"
                                key={comment._id}
                                mb={4}
                                mt={4} p={1}
                                borderRadius="5px">
                                <Box display="flex" alignItems="center">
                                    <Image src="/images/profile.jpg" alt="profile" width={50} height={50} />
                                    <Typography variant="body2" component="span" color="primary.dark" px={1}>{comment.user.userName} |</Typography>

                                    <Typography variant="body2" component="span" color="primary.dark">
                                        ارسال شده در
                                        <DatePicker
                                            containerClassName="custom-container"
                                            value={comment.createdAt}
                                            calendar={persian}
                                            locale={persian_fa}
                                            readOnly />
                                    </Typography>
                                </Box>
                                <Typography variant="body1" component="p" color="primary" my={2} lineHeight="3">{comment.text}</Typography>
                            </Box>
                        ) : null
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default CoffeeDetail;