export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    LOADING: 'LOADING',
    CUSTOMERS: 'CUSTOMERS',
    ADD_CART: 'ADD_CART',
    ADD_ORDERS: 'ADD_ORDERS',
}
export const addToCart = (product, cart) => {
    if(product.inStock === 0)
        return ({ type: 'NOTIFY', payload: {error: 'متاسفانه موجود نیست'} })
        
    return ({ type: 'ADD_CART', payload: [...cart, {...product, quantity: 1}] })
}

