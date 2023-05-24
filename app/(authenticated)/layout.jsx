import { getServerSession } from "next-auth";
import Footer from "../../components/footers/Footer";
import Navbar from "../../components/menu/Navbar";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function LayoutAbout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>

  );
}