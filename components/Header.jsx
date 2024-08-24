"use client"
import {styled, Container, Typography, Box} from "@mui/material";

const HeaderCustom = styled('header')(({theme}) => ({
    backgroundImage: "url(/images/header.jpg)",
    minHeight: '100vh',
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        backgroundPosition: "right",
        minHeight:"500px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay"
    },
}));

const Header = () => {
    return (
        <HeaderCustom>
            <Container maxWidth="lg">
                <Box sx={{maxWidth: "32rem", marginBottom: "10rem"}}>
                    <Typography variant="h1" component="h1" color="secondary"
                                sx={{marginBottom: "4rem", fontWeight: 900}}>
                        کافی شاپ امین آقا
                    </Typography>
                    <Typography variant="subtitle1" component="p" lineHeight="2" textAlign="justify" fontStyle="italic" sx={{color:"primary.light"}}>
                        شما اینجا هستید زیرا عاشق قهوه هستید، ما اینجا هستیم زیرا شما را دوست داریم
                    </Typography>
                </Box>
            </Container>
        </HeaderCustom>
    )
}

export default Header