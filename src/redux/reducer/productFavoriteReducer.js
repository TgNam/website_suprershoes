import { Fetch_ProductFavorite_Request, Fetch_ProductFavorite_Success, Fetch_ProductFavorite_Error, Fetch_Search_ProductFavorite_Request } from '../types/productFavoriteTypes';

const INITIAL_STATE = {
    listBrand: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_ProductFavorite_Request:
            return {
                ...state,
            };
        case Fetch_ProductFavorite_Success:
            return {
                ...state, listProductFavorite: action.payload,

            };
        case Fetch_ProductFavorite_Error:
            return {
                ...state,

            };
        case Fetch_Search_ProductFavorite_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;