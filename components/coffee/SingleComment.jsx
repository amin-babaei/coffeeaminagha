import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import DatePicker from 'react-multi-date-picker'
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import FormComment from './FormComment';
import { useSession } from 'next-auth/react';

const SingleComment = ({ comment, productId }) => {
    const [onReply, setOnreply] = useState(false);
    const { data: session } = useSession()

    return (
        <Box className="border" mb={4} mt={4} py={1} px={2} borderRadius="5px">
            <Box display="flex" alignItems="center">
                <Image src="/images/profile.jpg" alt="profile" width={50} height={50} />
                <Typography variant="body2" component="span" color="primary.dark" px={1}>{comment.user.userName} |</Typography>
                <Typography variant="body2" component="span" color="primary.dark">
                    ارسال شده در
                    <DatePicker
                        containerClassName="custom-container"
                        value={comment.createdAt}
                        calendar={persian}
                        locale={persian_fa}
                        readOnly />
                </Typography>
            </Box>
            <Typography variant="body1" component="p" color="primary" my={2} lineHeight="3">{comment.text}</Typography>
                {session?.user?.userName !== comment.user.userName && (
                    <Button variant="outlined" color="secondary" sx={{ my: 2, fontWeight: 'bold' }}  onClick={() => setOnreply(!onReply)}>
                    {!onReply ? `پاسخ به ${comment.user.userName}` : 'بیخیال'}
                    </Button>
                )}
            {onReply && (
                <FormComment productId={productId} responseTo={comment._id}/>
            )}
        </Box>
    )
}

export default SingleComment