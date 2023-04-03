import Footer from "../../components/footers/Footer";
import Navbar from "../../components/menu/Navbar";

export const metadata = {
  title: 'سبد خرید',
}
export default function LayoutCart({ children }) {

  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>

  );
}