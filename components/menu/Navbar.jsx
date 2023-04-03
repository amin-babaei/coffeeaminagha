"use client"
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import Image from 'next/image';
import {styled, Box, AppBar, Toolbar, Container, Button,} from "@mui/material";
import Profile from "./Profile";

const MainMenu = styled(Box)(({theme}) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));
const Navbar = () => {
    const router = useRouter()

    return (
        <AppBar position={router.pathname === "/" ? "fixed" : "sticky"}
                sx={{borderBottom: "1px solid rgba(255,255,255,.5)", background: "black"}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters={true}
                         sx={{justifyContent: "space-between", alignItems: "center"}}>
                    <Profile/>
                    <MainMenu>
                        <Link href="/">
                            <Button variant="outlined" sx={{mx: "3px"}}
                                    color={router.pathname === "/" ? "secondary" : "primary"}>صفحه اصلی</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outlined" sx={{mx: "3px"}}
                                    color={router.pathname === "/about" ? "secondary" : "primary"}>درباره ما</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outlined" sx={{mx: "3px"}}
                                    color={router.pathname === "/contact" ? "secondary" : "primary"}>تماس با ما</Button>
                        </Link>
                        <Link href="/coffees">
                            <Button variant="outlined" sx={{mx: "3px"}}
                            color={router.pathname === "/coffees" ? "secondary" : "primary"}>کافی ها</Button>
                        </Link>
                    </MainMenu>
                    <Box sx={{cursor:"pointer"}}>
                        <Link href="/">
                            <Image
                                src={'/images/logo.png'}
                                width={60}
                                height={50}
                                alt="logo-twitch"
                            />
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;