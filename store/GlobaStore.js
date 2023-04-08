import {createContext, useEffect, useReducer} from 'react'
import reducers from "./Reducers";

export const DataContext = createContext()
export const DataProvider = ({children}) => {
    const initialState = {
        notify: {}, loading: false, customers: [], cart: [],
        orders:[]
    }

    const [state, dispatch] = useReducer(reducers, initialState)
    const {cart} = state;

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart) dispatch({ type: 'ADD_CART', payload: cart })
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}