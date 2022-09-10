import {Skeleton} from "@mui/material";

const TableSkelet = () => {
    return (
        <>
            <Skeleton variant="text" height={60} sx={{backgroundColor:'rgba(255,255,255,0.3)',my:1}}/>
            <Skeleton variant="text" height={60} sx={{backgroundColor:'rgba(255,255,255,0.3)',my:1}}/>
            <Skeleton variant="text" height={60} sx={{backgroundColor:'rgba(255,255,255,0.3)',my:1}}/>
            <Skeleton variant="text" height={60} sx={{backgroundColor:'rgba(255,255,255,0.3)',my:1}}/>
        </>
    );
};
export default TableSkelet;