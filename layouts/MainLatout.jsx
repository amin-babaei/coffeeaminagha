import Navbar from '../components/menu/Navbar'
import Footer from '../components/footers/Footer';
import Notify from "../helper/decoration/Notify";

const MainLayout = ({children}) => {

    return (
        <>
            <Navbar/>
            {children}
            <Notify/>
            <Footer/>
        </>
    );
}

export default MainLayout;