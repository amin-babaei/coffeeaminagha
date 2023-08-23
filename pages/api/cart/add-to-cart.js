import Customer from "../../../models/CustomerModel";
import Product from "../../../models/ProductModel";
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await addToCart(req, res)
            break;
    }
}

const addToCart = async (req, res) => {
  const { customerId, productDetail, quantity } = req.body;
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'مشتری پیدا نشد' });
    }

    const product = await Product.findById(productDetail);

    if (!product) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }

    const cartItem = customer.cart.find(
      (item) => item.productDetail.toString() === productDetail
    );

    if (cartItem) {
      const remainingQuantity = product.inStock - cartItem.quantity;

      if (quantity > remainingQuantity) {
        return res
          .status(400)
          .json({ message: 'مقدار درخواستی از موجودی محصول بیشتر است' });
      }

      cartItem.quantity += quantity;
      await customer.save();

      return res.status(200).json({
        message: 'مقدار محصول در سبد خرید افزایش یافت',
        cart: customer.cart,
      });
    } else {
      if (quantity > product.inStock) {
        return res
          .status(400)
          .json({ message: 'مقدار درخواستی از موجودی محصول بیشتر است' });
      }

      customer.cart.push({ productDetail, quantity });
      await customer.save();

      return res.status(200).json({
        message: 'محصول به سبد خرید اضافه شد',
        cart: customer.cart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'مشکلی سمت سرور رخ داده است' });
  }
};