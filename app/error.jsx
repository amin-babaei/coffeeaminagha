'use client'
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Error({error,reset,}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={2} marginTop='50px'>
      <Typography variant='h5' component='h2' color='white'>به نظر مشکلی پیش آمده !</Typography>
      <Button variant='contained' color='secondary' size='large'
        onClick={
          () => reset()
        }
      >
        تلاش مجدد
      </Button>
    </Box>
  );
}