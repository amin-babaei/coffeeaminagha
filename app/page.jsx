import connectDB from "../utils/connectDB";
import Products from "../models/ProductModel";
import Coffee from '../components/coffee/Coffee';
import Header from '../components/Header'
import Navbar from "../components/menu/Navbar";
import Footer from "../components/footers/Footer";

export const metadata = {
  title: 'کافی شاپ امین آقا',
}
const getCoffees = async () => {
    await connectDB()
    let coffees = await Products.find().sort({ createdAt: -1 }).limit(3)
    return JSON.parse(JSON.stringify(coffees));
}
const Home = async () => {
    const coffees = await getCoffees()
  return (
    <>
    <Navbar/>
      <Header/>
      <Coffee coffees={coffees}/>
      <Footer/>
    </>
  )
}

export default Home;