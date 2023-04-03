import Footer from "../../components/footers/Footer";
import Navbar from "../../components/menu/Navbar";

export const metadata = {
  title: 'درباره ما',
}
export default function LayoutAbout({ children }) {

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>

  );
}