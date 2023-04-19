import Footer from "../../components/footers/Footer";
import Navbar from "../../components/menu/Navbar";
import AuthUser from "../../utils/auth/AuthUser";

export default function LayoutAbout({ children }) {

  return (
    <AuthUser>
      <Navbar />
        {children}
      <Footer />
    </AuthUser>

  );
}