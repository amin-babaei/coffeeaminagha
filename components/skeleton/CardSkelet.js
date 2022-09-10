import {Grid,Skeleton} from "@mui/material";

const CardSkelet = ({count=0}) =>{
    let countSkeleton = Array.from(new Array(count))
    return (
        <>
            {countSkeleton.map((item,index) => (
                 <Grid item xs={12} sm={4} key={index}>
                     <Skeleton variant="rectangular" height={250} sx={{backgroundColor:'rgba(255,255,255,0.3)'}}/>
                     <Skeleton variant="text" height={30} sx={{backgroundColor:'rgba(255,255,255,0.3)',my:1}}/>
                     <Skeleton variant="rectangular" height={40} width={130} sx={{backgroundColor:'rgba(255,255,255,0.3)',margin:'auto'}}/>
                 </Grid>
            ))}
        </>
    )
}
export default CardSkelet