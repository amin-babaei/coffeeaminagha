import {Box, Breadcrumbs, Button, Container, Grid, styled, Typography} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {DataContext} from "../../store/GlobaStore";
import {useContext, useState} from "react";
import {addToCart} from "../../store/Actions";
import Product from "../../models/ProductModel";
import connectDB from "../../utils/connectDB";
import FormComment from '../../components/coffee/FormComment'
import Head from "next/head";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import CustomerModel from "../../models/CustomerModel"

const ButtonPrice = styled(Button)(({theme}) => ({
    margin: "20px 0 2px 0",
    width: "200px",
    fontSize: "17px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const DetailCoffee = ({product}) => {
    const [select, setSelect] = useState(0);
    const {state, dispatch} = useContext(DataContext);
    const {cart} = state;
    const addedCart = () => {
        dispatch({type: "NOTIFY", payload: {success: "محصول در سبد خرید شما قرار گرفت"}});
        dispatch(addToCart(product, cart));
    };
    return (
        <Box marginTop="40px" minHeight="90vh" component="section">
            <Head>
                <title>{product.title.split('-').join(" ")}</title>
            </Head>
            <Container maxWidth="lg">
                <Breadcrumbs aria-label="breadcrumb" color="primary" sx={{margin: "30px 0"}}>
                    <Link href="/">
                        <Button variant="text" color="primary" sx={{cursor: "pointer"}}>صفحه اصلی</Button>
                    </Link>
                    <Link href="/coffees">
                        <Button variant="text" color="primary" sx={{cursor: "pointer"}}>محصولات</Button>
                    </Link>
                    <Typography color="primary.dark">{product.title.split('-').join(" ")}</Typography>
                </Breadcrumbs>
                <Grid container rowSpacing={{xs: 5, md: 0}} columnSpacing={{sm: 5}}>
                    <Grid item xs={12} sm={6}>
                        <Image src={product.images[select].url} layout="responsive" width={650} height={400}/>
                        <Box display="flex" flexWrap="wrap" width="100%" mt={2}>
                            {product.images.map((img, index) => (
                                <Box position="relative" width="80px"
                                     height={"60px"} mx="5px" key={index}
                                     sx={{
                                         cursor: "pointer",
                                         ...(select === index ? {border: '2px solid white'} : {border: 'none'})
                                     }}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.url}
                                        layout="fill"
                                        onClick={() => setSelect(index)}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box color="primary.main">
                            <Typography fontSize="1.7rem" component="h2" fontWeight='bold'>{product.title.split('-').join(" ")}</Typography>
                            <Typography component="p" lineHeight={2} align="justify" color="primary.dark" my={3}
                                        maxWidth="400px">{product.description}</Typography>
                            <Typography component="p" variant="h6" letterSpacing='1px' mt={5}
                                        fontWeight="bold"> قیمت: {product.price} تومان</Typography>
                            <ButtonPrice variant="outlined" color={"secondary"}
                                         disabled={product.inStock === 0}
                                         onClick={addedCart}>
                                اضافه به سبد خرید
                            </ButtonPrice>
                            <Typography color="error" my={1} component="p" fontSize="14px">تعداد موجود در انبار
                                : {product.inStock}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={{xs: 10, md: 20}}>
                    <Typography variant="h6" component="h3" color="primary" mt={5}>نظرات شما</Typography>
                    <hr/>
                    <FormComment productId={product._id}/>
                    {product.comments.map(comment => (
                       comment.checked ? (
                           <Box
                               className="border"
                               key={comment._id}
                               mb={4}
                               mt={4} p={1}
                               borderRadius="5px">
                               <Box display="flex" alignItems="center">
                                   <Image src="/images/profile.jpg" alt="profile" width={50} height={50}/>
                                   <Typography component="span" color="primary.dark" px={1}>{comment.user.userName} |</Typography>

                                   <Typography component="span" color="primary.dark">
                                       ارسال شده در
                                       <DatePicker
                                           containerClassName="custom-container"
                                           value={comment.createdAt}
                                           calendar={persian}
                                           locale={persian_fa}
                                           readOnly/>
                                   </Typography>
                               </Box>
                               <Typography component="p" color="primary" my={2} lineHeight="3">{comment.text}</Typography>
                           </Box>
                       ) : null
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
export const getServerSideProps = async ({params: {title}}) => {
    await connectDB()
    let response = await Product.findOne({title}).lean().populate('comments.user','userName email phone',CustomerModel);
    const products = JSON.parse(JSON.stringify(response));

    return {
        props: {
            product: products
        },
    };
};
export default DetailCoffee;