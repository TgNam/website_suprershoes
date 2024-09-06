import {
    Fetch_Promotion_Request,
    Fetch_Promotion_Success,
    Fetch_Promotion_Error
} from '../types/promotionTypes';

const initialState = {
    listPromotion: [],
    loading: false,
    error: null,
    totalPages: 0,
    totalElements: 0,
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Promotion_Request:
            return { ...state, loading: true };
        case Fetch_Promotion_Success:
            return {
                ...state,
                loading: false,
                listPromotion: action.payload,
                totalPages: action.totalPages,
                totalElements: action.totalElements
            };
        case Fetch_Promotion_Error:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default promotionReducer;
