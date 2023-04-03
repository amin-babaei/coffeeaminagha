import Footer from "../../components/footers/Footer";
import Navbar from "../../components/menu/Navbar";

export const metadata = {
  title: 'تماس با ما',
}
export default function LayoutContact({ children }) {

  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>

  );
}