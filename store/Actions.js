import { getData, postData, putData } from "../services/fetchData";

export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  LOADING: 'LOADING',
  CUSTOMERS: 'CUSTOMERS',
  ADD_CART: 'ADD_CART',
  ADD_ORDERS: 'ADD_ORDERS',
}
export const addToCart = async (productId, customerId, dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await postData('cart/add-to-cart', {
      customerId: customerId,
      productDetail: productId,
      quantity: 1,
    });

    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { success: response.message } });
    if (response) {
      const cartResponse = await getData('cart');

      const { userCart,totalPrice } = cartResponse;
      dispatch({ type: "ADD_CART", payload: { userCart, totalPrice } });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { error: 'خطای سرور' } });
  }
};
export const decreaseToCart = async (productId,customerId,dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await postData('cart/remove', {
      customerId: customerId,
      productDetail: productId
    });

    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { success: response.message } });
    if (response) {
      const cartResponse = await getData('cart');
      const { userCart,totalPrice } = cartResponse;
      dispatch({ type: "ADD_CART", payload: { userCart, totalPrice }});
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { error: 'خطای سرور' } });
  }
};

export const deleteToCart = async (productId,customerId,dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await putData('cart/remove', {
      customerId: customerId,
      productDetail: productId
    });

    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { success: response.message } });
    if (response) {
      const cartResponse = await getData('cart');
      const { userCart,totalPrice } = cartResponse;
      dispatch({ type: "ADD_CART", payload: { userCart, totalPrice } });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: 'NOTIFY', payload: { error: 'خطای سرور' } });
  }
};