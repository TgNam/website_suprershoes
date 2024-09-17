import { Fetch_ProductDetail_Request, Fetch_ProductDetail_Success, Fetch_ProductDetail_Error, Fetch_Search_ProductDetail_Request } from '../types/productDetailTypes';

const INITIAL_STATE = {
    listBrand: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_ProductDetail_Request:
            return {
                ...state,
            };
        case Fetch_ProductDetail_Success:
            return {
                ...state, listProductDetail: action.payload,

            };
        case Fetch_ProductDetail_Error:
            return {
                ...state,

            };
        case Fetch_Search_ProductDetail_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;