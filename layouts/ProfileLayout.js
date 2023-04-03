'use client'
import {useContext} from "react";
import {Container, Grid, ListItemIcon, Typography, Box} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {DataContext} from "../store/GlobaStore";

const ProfileLayout = ({children}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const {dispatch} = useContext(DataContext);
    const handleLogout = async () => {
        localStorage.setItem("cart", "[]");
        dispatch({ type: 'NOTIFY', payload: {success: 'با موفقیت خارج شدی'} })
        return signOut({ callbackUrl: '/login' });
    }
    return (
        <Box marginTop="40px" minHeight="90vh" component="section">
            <Container maxWidth="lg">
                <Grid container columnSpacing={{ xs: 0, sm: 5}} rowSpacing={5}>
                    {session?.user && (
                            <Grid item xs={12} sm={4}>
                                <Box component="nav" className="border">
                                    <Box display="flex" flexDirection="column" alignItems="center"
                                         borderBottom="1px solid rgba(255,255,255,0.3)" pb={2}>
                                        <Image src="/images/profile.jpg" alt="profile" width={200} height={200} priority/>
                                        <Typography color="primary" variant="p" py={1}>{session.user.userName}</Typography>
                                        <Typography color="primary" variant="p">{session.user.email}</Typography>
                                    </Box>
                                    <Link href="/profile">
                                        <Box padding="1.5rem 1rem" borderBottom="1px solid rgba(255,255,255,0.3)" display="flex"
                                             justifyContent="space-between" alignItems="center" sx={{cursor: "pointer"}}>
                                            <Typography component="span" variant="p" color={"primary"}>مشخصات من</Typography>
                                            {router.pathname === "/profile" ? (
                                                <ListItemIcon>
                                                    <ArrowBackIosNewIcon fontSize="small" color="primary"/>
                                                </ListItemIcon>
                                            ) : null}
                                        </Box>
                                    </Link>
                                    <Link href="/profile/orders">
                                        <Box padding="1.5rem 1rem" borderBottom="1px solid rgba(255,255,255,0.3)" display="flex"
                                             justifyContent="space-between" alignItems="center" sx={{cursor: "pointer"}}>
                                            <Typography component="span" variant="p" color={"primary"}>سفارشات</Typography>
                                            {router.pathname === "/profile/orders" ? (
                                                <ListItemIcon>
                                                    <ArrowBackIosNewIcon fontSize="small" color="primary"/>
                                                </ListItemIcon>
                                            ) : null}
                                        </Box>
                                    </Link>
                                    <Box padding="1.5rem 1rem" display="flex" alignItems="center"
                                         justifyContent="space-between" sx={{cursor:"pointer"}} onClick={handleLogout}>
                                        <Typography component="span" variant="p" color={"primary"}>خروج از حساب</Typography>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" color="primary"/>
                                        </ListItemIcon>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    }
                    <Grid item xs={12} sm={8} mb={3}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
export default ProfileLayout;