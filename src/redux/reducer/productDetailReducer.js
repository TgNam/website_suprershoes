import { Fetch_Posts_Request, Fetch_Posts_Success, Fetch_Posts_Error } from '../types/productDetailTypes';

const INITIAL_STATE = {
    listProductDetail: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Success:
            return {
                ...state, listProductDetail: action.payload,

            };
        case Fetch_Posts_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;