import { Fetch_Posts_Request, Fetch_Posts_Success, Fetch_Posts_Error, Fetch_Search_Posts_Request } from '../types/colorTypes';

const INITIAL_STATE = {
    listColor: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Success:
            return {
                ...state, listColor: action.payload,

            };
        case Fetch_Posts_Error:
            return {
                ...state,

            };
        case Fetch_Search_Posts_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;