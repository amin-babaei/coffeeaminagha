'use client'
import { Box } from "@mui/material";
import Image from "next/image";

export default function NotFound() {
    return (
        <Box width='100%' height='90vh' position="relative" display='flex' alignItems='center' justifyContent='center'>
            <Image src="/images/no-product.png" width={300} height={300} alt="not found"/>
        </Box>
    );
  }