import { Find_Cart, Fetch_Cart_Success, Fetch_Cart_Error } from '../types/cartTypes';

const INITIAL_STATE = {
    cart: null,
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Find_Cart:
            return {
                ...state,
            };
        case Fetch_Cart_Success:
            return {
                ...state, cart: action.payload,

            };
        case Fetch_Cart_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;