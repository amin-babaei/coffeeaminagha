import { Box, Grid } from "@mui/material"
import Image from "next/image"
import { useState } from "react";

const Images = ({product}) => {
    const [select, setSelect] = useState(0);
    return (
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
    )
}

export default Images