import { Fetch_Product_Request, Fetch_Product_Success, Fetch_Product_Error, Fetch_Search_Product_Request } from '../types/productTypes';

const INITIAL_STATE = {
    listProduct: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Product_Request:
            return {
                ...state,
            };
        case Fetch_Product_Success:
            return {
                ...state, listProduct: action.payload,

            };
        case Fetch_Product_Error:
            return {
                ...state,

            };
        case Fetch_Search_Product_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;