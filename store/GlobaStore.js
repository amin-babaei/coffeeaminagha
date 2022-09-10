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
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const cart = localStorage.getItem("cart")
        dispatch({type: "ADD_CART", payload: JSON.parse(cart)})
    }, [])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}