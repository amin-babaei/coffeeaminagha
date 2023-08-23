import Customer from "../../../models/CustomerModel";
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req, res) => {
  switch(req.method){
      case "POST":
          await decreaseCartItem(req, res)
          break;
      case "PUT":
          await removeFromCart(req, res)
          break;
  }
}
const decreaseCartItem = async (req, res) => {
  const { customerId, productDetail } = req.body;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'مشتری پیدا نشد' });
    }

    const cartItem = customer.cart.find(
      (item) => item.productDetail.toString() === productDetail
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'محصول در سبد خرید پیدا نشد' });
    }

    if (cartItem.quantity === 1) {
      customer.cart = customer.cart.filter(
        (item) => item.productDetail.toString() !== productDetail
      );
    } else {
      cartItem.quantity -= 1;
    }

    await customer.save();

    return res.status(200).json({
      message: 'مقدار محصول در سبد خرید کاهش یافت',
      cart: customer.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'مشکلی سمت سرور رخ داده است' });
  }
};
const removeFromCart = async (req, res) => {
  const { customerId, productDetail } = req.body;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'مشتری پیدا نشد' });
    }

    const cartItemIndex = customer.cart.findIndex(
      (item) => item.productDetail.toString() === productDetail
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'محصول در سبد خرید پیدا نشد' });
    }

    customer.cart.splice(cartItemIndex, 1);
    await customer.save();

    return res.status(200).json({
      message: 'محصول از سبد خرید حذف شد',
      cart: customer.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'مشکلی سمت سرور رخ داده است' });
  }
};