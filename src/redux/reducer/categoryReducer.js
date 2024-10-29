import { Fetch_Posts_Category_Request, Fetch_Posts_Category_Success, Fetch_Posts_Category_Error }  from '../types/categoryTypes';

const INITIAL_STATE = {
    listCategory: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Category_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Category_Success:
            return {
                ...state, listCategory: action.payload,

            };
        case Fetch_Posts_Category_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;