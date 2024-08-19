import { Fetch_Category_Request, Fetch_Category_Success, Fetch_Category_Error, Fetch_Search_Category_Request } from '../types/categoryTypes';

const INITIAL_STATE = {
    listCategory: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Category_Request:
            return {
                ...state,
            };
        case Fetch_Category_Success:
            return {
                ...state, listCategory: action.payload,

            };
        case Fetch_Category_Error:
            return {
                ...state,

            };
        case Fetch_Search_Category_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;