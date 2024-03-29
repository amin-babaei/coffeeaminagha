import {Box, Button, Checkbox, FormControlLabel, FormGroup, Skeleton, Typography} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MopedIcon from "@mui/icons-material/Moped";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import ButtonLoad from "../helper/decoration/ButtonLoad";
import { priceNumber } from "../utils/priceNumber";

const BuyCart = ({totalPrice, loading, handlePayment}) => {
    const [check, setCheck] = useState(false)

    return (
        <Box p={1} mb={2} className='border'>
            <Typography variant="h6" component="h3" color="primary" borderBottom="1px solid" py={1}>قیمت کل :
                {loading ? <Skeleton animation="wave" variant="text" width={40} height={30} sx={{backgroundColor:'rgba(255,255,255,0.3)',display:'inline-flex',ml:1}}/> : priceNumber(totalPrice)} تومان
            </Typography>
            <Box display="flex" alignItems="center">
                <GppGoodIcon color="warning"/>
                <Typography component="p" color="primary.dark" my={3} fontSize="14px">24 ساعت مهلت تست و
                    بازگشت</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <MopedIcon color="warning"/>
                <Typography component="p" color="primary.dark" fontSize="14px" my={3}>ارسال با پیک موتوری</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <AccessTimeIcon color="warning"/>
                <Typography component="p" color="primary.dark" fontSize="14px" my={3}>تحویل کمتر از 3 ساعت</Typography>
            </Box>
            <FormGroup sx={{my: 3}}>
                <FormControlLabel sx={{m: 0}} control={<Checkbox
                    onChange={e => setCheck(e.target.checked)}
                    sx={{
                        color: "white",
                        p: 0,
                        '&.Mui-checked': {
                            color: "secondary.main",
                        },
                    }}
                />} label={<Typography color="primary" fontSize="14px">قوانین و مقررات را می پذیرم</Typography>}/>
            </FormGroup>
            {loading ? <ButtonLoad loading={loading} message="منتظر بمانید..."/> :
                <Button variant="contained" color="success" fullWidth disabled={!check}
                        onClick={handlePayment}>پرداخت</Button>
            }
        </Box>
    )

}
export default BuyCart;