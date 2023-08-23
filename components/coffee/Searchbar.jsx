"use client"
import {Box, MenuItem, TextField} from "@mui/material";
import {orderBy} from "lodash/collection";
import Divider from "@mui/material/Divider";

const Searchbar = ({coffees,setCoffee,changed}) => {
    const productAsc =()=>{
        setCoffee(orderBy(coffees, "price", "asc"));
    }
    const productDesc =()=>{
        setCoffee(orderBy(coffees, "price", "desc"));
    }
    const highSold =()=>{
        setCoffee(orderBy(coffees, "sold", "desc"));
    }
    return (
        <Box mb={2} display="flex">
            <TextField
                placeholder="جستجو کنید ..."
                fullWidth
                autoComplete='off'
                variant="outlined"
                onChange={changed}
                InputProps={{
                    style: {color: "white",borderTopLeftRadius: 0, borderBottomLeftRadius: 0}
                }}
            />
            <TextField
                select
                color="primary"
                label="مرتب سازی"
                variant="outlined"
                defaultValue={''}
                sx={{
                    width:"200px",
                    '& .MuiSelect-icon': {
                        color: "white"
                    },
                    '& .MuiInputBase-root': {
                        color: 'white',
                    },
                }}
                SelectProps={{
                    style: {borderTopRightRadius: "0", borderBottomRightRadius:"0",}
                }}
                inputProps={{
                    style: {color: "white"}
                }}>
                <MenuItem sx={{paddingTop:'12px',paddingBottom:'12px'}} value="پرفروش ترین" onClick={highSold}>پرفروش ترین</MenuItem>
                <Divider style={{margin:0}}/>
                <MenuItem sx={{paddingTop:'12px',paddingBottom:'12px'}} value="بالاترین قیمت" onClick={productDesc}>بالاترین قیمت</MenuItem>
                <Divider style={{margin:0}}/>
                <MenuItem sx={{paddingTop:'12px',paddingBottom:'12px'}} value="کمترین قیمت" onClick={productAsc}>کمترین قیمت</MenuItem>
            </TextField>
        </Box>
    )
}
export default Searchbar