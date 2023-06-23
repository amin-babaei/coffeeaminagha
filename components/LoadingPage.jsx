'use client'
import { Box } from '@mui/material'
import Image from 'next/image'

export default function LoadingPage({h}) {
  return (
    <Box height={h} width={"100%"} position="relative" display="flex" alignItems="center" justifyContent="center" bgcolor='#000'>
        <Image src='/images/logo.png' width={100} height={100} className="loading" alt='loading' priority/>
    </Box>
  )
}
