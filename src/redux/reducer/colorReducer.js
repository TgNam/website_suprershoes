import { Fetch_Color_Request, Fetch_Color_Success, Fetch_Color_Error, Fetch_Search_Color_Request } from '../types/colorTypes';

const INITIAL_STATE = {
    listColor: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Color_Request:
            return {
                ...state,
            };
        case Fetch_Color_Success:
            return {
                ...state, listColor: action.payload,

            };
        case Fetch_Color_Error:
            return {
                ...state,

            };
        case Fetch_Search_Color_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;