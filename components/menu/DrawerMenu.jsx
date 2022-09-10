import {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Drawer,Box,IconButton,styled,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
const DrawerMenu = () => {
    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter()
    const WrapDrawer = styled(IconButton)(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }));
    const MenuDrawer = styled(Box)({
        padding:"10px",
        textAlign:"center",
        width:"250px",
        height: "100%",
        display:"flex",
        flexDirection:"column",
        background:"black",
        border:"1px solid rgba(255,255,255,0.3)",
    })
    return(
        <>
        <WrapDrawer size="large" edge="start" color="inherit" aria-label="logo" onClick={()=>setIsOpen(true)}>
            <MenuIcon sx={{ml:2}} color="primary"/>
        </WrapDrawer>
            <Drawer anchor="left" open={isOpen} onClose={()=>setIsOpen(false)}>
                <MenuDrawer role="presentation">
              <Link href="/">
                <Button variant="text" sx={{margin:"20px 0"}} color={router.pathname === "/" ? "secondary" : "primary"}>صفحه اصلی</Button>
              </Link>
              <Link href="/about">
                <Button variant="text" sx={{margin:"20px 0"}} color={router.pathname === "/about" ? "secondary" : "primary"}>درباره ما</Button>
              </Link>
              <Link href="/contact">
                <Button variant="text" sx={{margin:"20px 0"}} color={router.pathname === "/contact" ? "secondary" : "primary"}>تماس با ما</Button>
              </Link>
              <Link href="/coffees">
                <Button variant="text" sx={{margin:"20px 0"}} color={router.pathname === "/coffees" ? "secondary" : "primary"}>کافی ها</Button>
              </Link>
                </MenuDrawer>
            </Drawer>
        </>
    )
}
export default DrawerMenu;