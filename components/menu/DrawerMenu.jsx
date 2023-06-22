import {useEffect, useState} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Drawer,Box,IconButton,styled,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';

const DrawerMenu = () => {
    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const WrapDrawer = styled(IconButton)(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }));
    const MenuDrawer = styled(Box)({
        padding:"10px",
        textAlign:"center",
        width:"100%",
        height: "100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:'center',
        gap:30,
        background:"black",
        border:"1px solid rgba(255,255,255,0.3)",
    })
    useEffect(() => {
      if (isOpen) {
        setIsOpen(!isOpen);
      }
    }, [pathname]);
    return(
        <>
        <WrapDrawer size="large" edge="start" color="inherit" aria-label="logo" onClick={()=>setIsOpen(true)}>
            <MenuIcon sx={{ml:2}} color="primary"/>
        </WrapDrawer>
            <Drawer anchor="bottom" open={isOpen} onClose={()=>setIsOpen(false)} sx={{display:{sm:'none'}}}>
                <MenuDrawer role="presentation">
                  <CloseIcon fontSize='medium' onClick={() => setIsOpen(false)} color='primary' sx={{position:'absolute',top:'1rem',left:'1rem'}}/>
              <Link href="/" style={{width:'fit-content',marginLeft:'auto',marginRight:'auto'}}>
                <Button variant="outlined" sx={{fontSize:'15px',width:200}} color={router.pathname === "/" ? "secondary" : "primary"}>صفحه اصلی</Button>
              </Link>
              <Link href="/about" style={{marginLeft:'auto',marginRight:'auto'}}>
                <Button variant="outlined" sx={{fontSize:'15px',width:200}} color={router.pathname === "/about" ? "secondary" : "primary"}>درباره ما</Button>
              </Link>
              <Link href="/contact" style={{width:'fit-content',marginLeft:'auto',marginRight:'auto'}}>
                <Button variant="outlined" sx={{fontSize:'15px',width:200}} color={router.pathname === "/contact" ? "secondary" : "primary"}>تماس با ما</Button>
              </Link>
              <Link href="/coffees" style={{width:'fit-content',marginLeft:'auto',marginRight:'auto'}}>
                <Button variant="outlined" sx={{fontSize:'15px',width:200}} color={router.pathname === "/coffees" ? "secondary" : "primary"}>کافی ها</Button>
              </Link>
                </MenuDrawer>
            </Drawer>
        </>
    )
}
export default DrawerMenu;