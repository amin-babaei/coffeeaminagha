import {createContext, useEffect, useReducer} from 'react'
import reducers from "./Reducers";
import { getData } from '../services/fetchData';
import { useSession } from 'next-auth/react';

export const DataContext = createContext()
export const DataProvider = ({children}) => {
    const initialState = {
        notify: {}, loading: false, customers: [], cart: [],
        orders:[]
    }

    const [state, dispatch] = useReducer(reducers, initialState)
    const {data: session} = useSession()

    useEffect(() => {
        const getCartUser = async () => {
            if(session?.user){
                const { userCart,totalPrice } = await getData('cart')
                dispatch({type: 'ADD_CART', payload: { userCart, totalPrice }})
            }
        }
        getCartUser()
    },[session?.user])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}