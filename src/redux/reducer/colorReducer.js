import { Fetch_Posts_Color_Request, Fetch_Posts_Color_Success, Fetch_Posts_Color_Error } from '../types/colorTypes';

const INITIAL_STATE = {
    listColor: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Color_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Color_Success:
            return {
                ...state, listColor: action.payload,

            };
        case Fetch_Posts_Color_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;