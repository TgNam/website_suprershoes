import { Fetch_Posts_Brand_Request, Fetch_Posts_Brand_Success, Fetch_Posts_Brand_Error }  from '../types/brandTypes';

const INITIAL_STATE = {
    listBrand: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Brand_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Brand_Success:
            return {
                ...state, listBrand: action.payload,

            };
        case Fetch_Posts_Brand_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;