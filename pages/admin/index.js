import {Box, Grid, Typography} from "@mui/material";
import Image from "next/image";
import Head from "next/head";

const Admin = () => {
    return (
        <>
            <Head>
                <title>
                    پنل ادمین
                </title>
            </Head>
            <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} sm={6}>
               <Typography color="primary" variant="h5" component="h2" lineHeight="2">به پنل ادمین کافی شاپ آقا امین خوش آمدید. اینجا میتونی سایت رو مدیریت کنی !</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box width="100%" height="50vh" position="relative">
                    <Image src="/images/admin.svg" layout="fill"/>
                </Box>
            </Grid>
            </Grid>
        </>
    );
}

export default Admin;
