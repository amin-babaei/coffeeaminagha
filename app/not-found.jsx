'use client'
import { Box } from "@mui/material";
import Image from "next/image";

export default function NotFound() {
    return (
        <Box width="100%" height="90vh" position="relative">
            <Image src="/images/404.svg" fill alt="not found"/>
        </Box>
    );
  }