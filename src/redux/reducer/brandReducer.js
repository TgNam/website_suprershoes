import { Fetch_Brand_Request, Fetch_Brand_Success, Fetch_Brand_Error, Fetch_Search_Brand_Request } from '../types/brandTypes';

const INITIAL_STATE = {
    listBrand: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Brand_Request:
            return {
                ...state,
            };
        case Fetch_Brand_Success:
            return {
                ...state, listBrand: action.payload,

            };
        case Fetch_Brand_Error:
            return {
                ...state,

            };
        case Fetch_Search_Brand_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;