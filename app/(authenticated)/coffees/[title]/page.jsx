import connectDB from "../../../../utils/connectDB";
import Product from '../../../../models/ProductModel'
import CustomerModel from '../../../../models/CustomerModel'
import CoffeeDetail from '../../../../components/pages/coffee/CoffeeDetail'

export async function generateMetadata({ params }) {
  return {
    title: decodeURIComponent(params.title.split("-").join(" ")),
  };
}
const getOneCoffee = async (title) => {
  await connectDB()
  let response = await Product.findOne({ title }).lean().populate('comments.user', 'userName email phone', CustomerModel);
  return JSON.parse(JSON.stringify(response));
}
const Detail = async ({ params }) => {
  const encodeParams = decodeURIComponent(params.title)
  const product = await getOneCoffee(encodeParams)

  return (
    <CoffeeDetail product={product} />
  )
}

export default Detail