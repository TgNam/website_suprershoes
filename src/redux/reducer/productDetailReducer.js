import {
    Fetch_Posts_Product_Request,
    Fetch_Posts_Product_Success,
    Fetch_Posts_ProductPromotion_Success,
    Fetch_Posts_Product_Error,
    Fetch_Posts_Find_Product_Detail_Success,
    Fetch_PriceRange_Promotion_Success,
    Fetch_PriceRange_PromotionByQuang_Success,
    
} from '../types/productDetailTypes';

const INITIAL_STATE = {
    listProductDetail: [],
    listProductPromotion: [],
    listPriceRangePromotion: [], // State for price range promotions
    listPriceRangePromotionByQuang: [],
    productDetail: {},
    isLoading: false,
    error: null,
};

const productDetailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_Posts_Product_Request:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case Fetch_Posts_Product_Success:
            return {
                ...state,
                listProductDetail: action.payload,
                isLoading: false,
            };
        case Fetch_Posts_Find_Product_Detail_Success:
            return {
                ...state,
                productDetail: action.payload,
                isLoading: false,
            };
        case Fetch_Posts_ProductPromotion_Success:
            return {
                ...state,
                listProductPromotion: action.payload,
                isLoading: false,
            };
        case Fetch_PriceRange_Promotion_Success:
            return {
                ...state,
                listPriceRangePromotion: action.payload,
                isLoading: false,
            };
        case Fetch_PriceRange_PromotionByQuang_Success:
            return { 
                ...state, 
                loading: false, 
                listPriceRangePromotionByQuang: action.payload }
                ;
        case Fetch_Posts_Product_Error:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default productDetailReducer;
