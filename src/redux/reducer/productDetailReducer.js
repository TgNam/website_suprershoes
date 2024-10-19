import { Fetch_Posts_Product_Request, Fetch_Posts_Product_Success,Fetch_Posts_ProductPromotion_Success, Fetch_Posts_Product_Error } from '../types/productDetailTypes';

const INITIAL_STATE = {
    listProductDetail: [],
    listProductPromotion: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Product_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Product_Success:
            return {
                ...state, listProductDetail: action.payload,

            };
        case Fetch_Posts_ProductPromotion_Success:
            return {
                ...state, listProductPromotion: action.payload,

            };
        case Fetch_Posts_Product_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;