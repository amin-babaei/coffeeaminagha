"use client"
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import FormComment from '../../coffee/FormComment'
import { priceNumber } from "../../../utils/priceNumber";
import AddtoCart from "./AddtoCart";
import Images from "./Images";
import SingleComment from "../../coffee/SingleComment";
import { Fragment } from "react";
import ReplyComment from "../../coffee/ReplyComment";

const CoffeeDetail = ({ product }) => {
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
                    <Images product={product} />
                    <Grid item xs={12} sm={6}>
                        <Box color="primary.main">
                            <Typography variant="h2" component="h2" fontWeight='bold'>{product.title.split('-').join(" ")}</Typography>
                            <Typography variant="body1" component="p" color="primary.dark" lineHeight="2.5" align="justify" my={3}
                            >{product.description}
                            </Typography>
                            <Typography component="p" variant="h6" letterSpacing='1px' mt={5}
                                fontWeight="bold"> قیمت: {priceNumber(product.price)} تومان</Typography>
                            <AddtoCart product={product} />
                            <Typography color="error" my={1} component="p" fontSize="14px">تعداد موجود در انبار
                                : {product.inStock}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={{ xs: 10, md: 20 }}>
                    <Typography variant="h6" component="h3" color="primary" mt={5}>نظرات شما</Typography>
                    <hr />
                    <FormComment productId={product._id} responseTo={null}/>
                    {product.comments?.map(comment => (
                        !comment.responseTo && (
                        <Fragment key={comment._id}>
                            <SingleComment comment={comment} productId={product._id}/>
                            <ReplyComment
                                comments={product.comments}
                                parentCommentId={comment._id}
                                productId={product._id}
                            />
                        </Fragment>
                        )
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default CoffeeDetail;