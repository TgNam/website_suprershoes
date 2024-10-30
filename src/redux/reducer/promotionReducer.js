import {
    Fetch_Posts_Promotion_Request,
    Fetch_Posts_Promotion_Success,
    Fetch_Posts_Promotion_And_ProductPromotion_Success,
    Fetch_Posts_Promotion_Error
} from '../types/promotionTypes';

const initialState = {
    listPromotion: [],
    listProductPromotion: [],
    promotion: {},
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Posts_Promotion_Request:
            return { ...state };
        case Fetch_Posts_Promotion_Success:
            return {
                ...state,
                listPromotion: action.payload,
            };
        case Fetch_Posts_Promotion_And_ProductPromotion_Success:
            const { promotion, productPromotionResponses } = action.payload;
            return {
                ...state,
                promotion: promotion,
                listProductPromotion: productPromotionResponses
            };
        case Fetch_Posts_Promotion_Error:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default promotionReducer;
