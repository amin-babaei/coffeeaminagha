import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/OrderModel";
import OrderPage from '../../../components/orders/OrdersPage';
import { getServerSession } from "next-auth";
import { authOptions } from '../../../pages/api/auth/[...nextauth]'

const getOrders = async (session) => {
  await connectDB()
  let response = await Orders.find({ user: session.user._id }).populate("user", "-password").select("-user").sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(response));
}

const Order = async () => {
  const session = await getServerSession(authOptions)
  const orders = await getOrders(session)
  return (
    <OrderPage orders={orders} />
  );
}
export default Order