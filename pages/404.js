import {Box} from "@mui/material";
import Image from "next/image";

const Custom404 = () => {
    return (
        <Box width="100%" height="90vh" position="relative">
            <Image src="/images/404.png" layout="fill"/>
        </Box>
    );
}
export default Custom404;