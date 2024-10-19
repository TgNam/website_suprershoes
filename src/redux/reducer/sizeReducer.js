import { Fetch_Posts_Size_Request, Fetch_Posts_Size_Success, Fetch_Posts_Size_Error } from '../types/sizeTypes';

const INITIAL_STATE = {
    listSize: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Size_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Size_Success:
            return {
                ...state, listSize: action.payload,

            };
        case Fetch_Posts_Size_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;