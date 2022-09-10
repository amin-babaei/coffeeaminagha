import {Avatar, Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import Link from "next/link";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Logout} from "@mui/icons-material";
import DrawerMenu from "./DrawerMenu";
import {useContext, useState} from "react";
import {DataContext} from "../../store/GlobaStore";
import {signOut, useSession} from "next-auth/react";

const Profile = () => {
    const {status,data:session} = useSession();
    const {state,dispatch} = useContext(DataContext);
    const {cart} = state;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        localStorage.setItem("cart", "[]");
        dispatch({ type: 'NOTIFY', payload: {success: 'با موفقیت خارج شدی'} })
        return signOut({ callbackUrl: '/login' });
    }
    return(
        <Box>
            <Tooltip title="اکانت">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{padding:"0"}}
                >
                    <Avatar sx={{width: 40, height: 40, backgroundColor: "secondary.main"}}>
                        A
                    </Avatar>
                </IconButton>
            </Tooltip>
            {status === 'loading' ? (
                <div>Loading...</div>
            ) : session?.user && (
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                left: "14px",
                                width: 10,
                                height: 10,
                                backgroundColor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <Link href="/profile">
                        <MenuItem>
                            <ListItemIcon>
                                <AssignmentIndIcon fontSize="small"/>
                            </ListItemIcon>
                            پروفایل
                        </MenuItem>
                    </Link>
                    <Link href="/cart">
                    <MenuItem>
                        <ListItemIcon>
                            <Badge badgeContent={!cart ? "0" : cart.length} color="secondary">
                                <AddShoppingCartIcon fontSize="small"/>
                            </Badge>
                        </ListItemIcon>
                        سبد خرید
                    </MenuItem>
                    </Link>
                    <Divider/>
                    {session.user.isAdmin && (
                        <Link href="/admin">
                            <MenuItem>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon fontSize="small"/>
                                </ListItemIcon>
                                پنل ادمین
                            </MenuItem>
                        </Link>
                    )}
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        خروج
                    </MenuItem>
                </Menu>
            )}
            <DrawerMenu/>
        </Box>
    )
}
export default Profile;