import { Fetch_Size_Request, Fetch_Size_Success, Fetch_Size_Error, Fetch_Search_Size_Request } from '../types/sizeTypes';

const INITIAL_STATE = {
    listSize: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Size_Request:
            return {
                ...state,
            };
        case Fetch_Size_Success:
            return {
                ...state, listSize: action.payload,

            };
        case Fetch_Size_Error:
            return {
                ...state,

            };
        case Fetch_Search_Size_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;