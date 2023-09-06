import connectDB from "../../../../utils/connectDB";
import Product from '../../../../models/ProductModel'
import CustomerModel from '../../../../models/CustomerModel'
import CommentModel from '../../../../models/CommentModel'
import CoffeeDetail from '../../../../components/pages/coffee/CoffeeDetail'
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const getOneCoffee = async (title) => {
    connectDB()
    let response = await Product.findOne({ title });
    return JSON.parse(JSON.stringify(response));
  }
  const encodeParams = decodeURIComponent(params.title)
  const product = await getOneCoffee(encodeParams)
  return {
    title: product ? product.title.split("-").join(" ") : 'محصول یافت نشد',
  };
}
const Detail = async ({ params }) => {
  const getOneCoffee = async (title) => {
    connectDB()
    let response = await Product.findOne({ title }).lean()
    .populate({
      path: "comments",
      model: CommentModel,
      populate: [
        {
          path: "user",
          model: CustomerModel,
          select: 'userName'
        },
      ],
    });
    return JSON.parse(JSON.stringify(response));
  }
  const encodeParams = decodeURIComponent(params.title)
  const product = await getOneCoffee(encodeParams)
  if(!product) notFound()
  return (
    <CoffeeDetail product={product} />
  )
}

export default Detail