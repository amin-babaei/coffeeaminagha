import {ACTIONS} from './Actions'

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ACTIONS.CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            };
        case ACTIONS.ADD_CART:
            return {
                ...state,
                cart: action.payload
            };
        case ACTIONS.ADD_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        default:
            return state;
    }
}

export default reducers;