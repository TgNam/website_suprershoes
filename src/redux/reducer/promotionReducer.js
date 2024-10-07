import {
    Fetch_Posts_Request,
    Fetch_Posts_Success,
    Fetch_Posts_Error
} from '../types/promotionTypes';

const initialState = {
    listPromotion: [],
};

const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Posts_Request:
            return { ...state };
        case Fetch_Posts_Success:
            return {
                ...state,
                listPromotion: action.payload,
            };
        case Fetch_Posts_Error:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default promotionReducer;
