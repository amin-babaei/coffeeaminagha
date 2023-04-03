"use client"
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import ButtonLoad from "../../helper/decoration/ButtonLoad";
import {common} from "@mui/material/colors";
import { usePathname } from 'next/navigation';

const CoffeeItem = ({coffee,deleted,loading}) => {
    const pathname = usePathname();
    return(
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{background:"rgba(255,255,255,0.3)"}} className="border">
                <CardMedia
                    component="img"
                    height="250"
                    src={coffee.images[0].url}
                    alt={coffee.title}
                    sx={{backgroundColor:common.black,p:1}}
                />
                <CardContent sx={{background:common.black}}>
                    <Typography gutterBottom variant="h6" component="h3" align="center" color="primary" fontSize='1.1rem'>
                        {coffee.title.split('-').join(' ')}
                    </Typography>
                </CardContent>
                <CardActions sx={{background:common.black,justifyContent:"center"}}>
                    <Link href={`/coffees/${coffee.title}`}>
                        <Button size="large" variant="outlined" color="secondary" sx={{width:"200px"}}>جزئیات</Button>
                    </Link>
                </CardActions>
            {pathname==='/admin/products' && (
                <Stack direction="row" justifyContent="space-between">
                    {loading ? <ButtonLoad loading={loading} message="منتظر بمانید..."/> :
                    <Button variant="contained" color="error" sx={{width:'50%'}} onClick={deleted}>حذف</Button>
                    }
                    <Link href={`/admin/products/create/${coffee._id}`} passHref style={{flexGrow:'1'}}>
                        <Button variant="contained" color="warning" fullWidth>ویرایش</Button>
                    </Link>
                </Stack>
            )}
            </Card>
        </Grid>
    )
}
export default CoffeeItem;