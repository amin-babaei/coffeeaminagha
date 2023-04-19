'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <Box height="70vh" width={"100%"} position="relative" display="flex" alignItems="center" justifyContent="center">
        <Image src='/images/logo.png' width={100} height={100} className="loading" alt='loading' priority/>
    </Box>
  )
}