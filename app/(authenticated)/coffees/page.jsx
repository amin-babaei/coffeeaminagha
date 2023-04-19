import Products from "../../../models/ProductModel";
import connectDB from "../../../utils/connectDB";
import CoffeesPage from "../../../components/pages/coffee/CoffeesPage";

export const metadata = {
    title: 'کافی ها',
}
const getCoffees = async () => {
    await connectDB()
    let coffees = await Products.find()
    return JSON.parse(JSON.stringify(coffees));
}
const Coffees = async () => {
    const products = await getCoffees()
    return (
        <CoffeesPage products={products} />
    )
}

export default Coffees;