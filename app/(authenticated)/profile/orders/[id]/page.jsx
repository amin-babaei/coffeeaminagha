import Orders from "../../../../../models/OrderModel";
import connectDB from "../../../../../utils/connectDB";
import OrderDetail from "../../../../../components/orders/OrderDetail";
import { getServerSession } from "next-auth";
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]'

const getOrders = async (session) => {
  await connectDB()
  let response = await Orders.find({ user: session.user._id }).populate("user", "-password").select("-user").sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(response));
}

const OrderSuccess = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const orders = await getOrders(session)
  return (
    <OrderDetail orders={orders} id={params.id} />
  )
}

export default OrderSuccess