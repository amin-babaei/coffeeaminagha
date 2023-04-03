import Navbar from "../../components/menu/Navbar";
import Footer from "../../components/footers/Footer";
import ProfileLayout from '../../layouts/ProfileLayout'

export const metadata = {
    title: 'پروفایل',
  }
export default function Layout({ children }) {
    return (
        <>
            <Navbar/>
            <ProfileLayout>
                {children}
            </ProfileLayout>
            <Footer/>
        </>
    );
}