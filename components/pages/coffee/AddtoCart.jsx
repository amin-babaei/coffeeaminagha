import { Button, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../../store/GlobaStore";
import { addToCart } from "../../../store/Actions";

const ButtonPrice = styled(Button)(({ theme }) => ({
    margin: "20px 0 2px 0",
    width: "200px",
    fontSize: "17px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const AddtoCart = ({ product }) => {
    const { data: session } = useSession();
    const { state, dispatch } = useContext(DataContext)
    const { cart, loading } = state

    const handleAddToCart = () => {
      
        dispatch(addToCart(product._id, session.user._id, dispatch))
    };

    return (
        <>
            {cart?.userCart?.some(p => p.productDetail?._id === product._id) ? (
                <Link href='cart'>
                    <ButtonPrice variant="outlined" color={"secondary"}>
                        تسویه حساب
                    </ButtonPrice>
                </Link>
            ) : (
                <ButtonPrice variant="outlined" color={"secondary"}
                    disabled={product.inStock === 0}
                    onClick={handleAddToCart}>
                    {loading ? 'منتظر بمانید ...' : 'اضافه به سبد خرید'}
                </ButtonPrice>
            )}
        </>
    )
}

export default AddtoCart