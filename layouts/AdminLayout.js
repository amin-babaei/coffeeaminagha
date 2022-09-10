import * as React from 'react';
import { styled, } from '@mui/material/styles';
import {CssBaseline,Box,Toolbar,List,Divider,Container,AppBar,ListItemButton,ListItemIcon,ListItemText,useTheme} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import Notify from "../helper/decoration/Notify";
import CommentIcon from '@mui/icons-material/Comment';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
const AdminLayout = ({children}) => {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{borderBottom: "1px solid rgba(255,255,255,.5)", background: "black"}}>
                    <Toolbar
                       sx={{justifyContent: "flex-end"}}
                    >
                        <Image
                            src={'/images/logo.png'}
                            width={60}
                            height={50}
                            alt="logo-twitch"
                        />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{borderRight: "1px solid rgba(255,255,255,.3)",}} PaperProps={{
                    sx: {
                        backgroundColor: "black",
                        color: "white",
                    }
                }}>
                    <Toolbar
                        sx={{
                            background:theme.palette.secondary.dark,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer} color="primary">
                            {open ? <ChevronRightIcon /> : <MenuIcon />}
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <Link href="/admin/orders">
                            <ListItemButton>
                                <ListItemIcon sx={{p:1}}>
                                    <FactCheckIcon color={router.pathname==="/admin/orders"?"secondary":"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="سفارشات" />
                            </ListItemButton>
                        </Link>
                        <Divider color="white"/>
                        <Link href="/admin/products">
                            <ListItemButton>
                                <ListItemIcon sx={{p:1}}>
                                    <ShoppingCartIcon color={router.pathname==="/admin/products"?"secondary":"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="محصولات" />
                            </ListItemButton>
                        </Link>
                        <Divider color="white"/>
                        <Link href="/admin/customers">
                            <ListItemButton>
                                <ListItemIcon sx={{p:1}}>
                                    <PeopleIcon color={router.pathname==="/admin/customers"?"secondary":"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="مشتری ها" />
                            </ListItemButton>
                        </Link>
                        <Divider color="white"/>
                        <Link href="/admin/comments">
                            <ListItemButton>
                                <ListItemIcon sx={{p:1}}>
                                    <CommentIcon color={router.pathname==="/admin/comments"?"secondary":"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="کامنت ها" />
                            </ListItemButton>
                        </Link>
                        <Divider color="white"/>
                        <Link href="/">
                            <ListItemButton>
                                <ListItemIcon sx={{p:1}}>
                                    <HomeIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText primary="صفحه اصلی سایت" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                {children}
                    </Container>
                </Box>
                <Notify/>
            </Box>
    );
}
export default AdminLayout;
