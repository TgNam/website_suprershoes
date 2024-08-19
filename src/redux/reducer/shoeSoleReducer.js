import { Fetch_ShoeSole_Request, Fetch_ShoeSole_Success, Fetch_ShoeSole_Error, Fetch_Search_ShoeSole_Request } from '../types/shoeSoleTypes';

const INITIAL_STATE = {
    listShoeSole: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_ShoeSole_Request:
            return {
                ...state,
            };
        case Fetch_ShoeSole_Success:
            return {
                ...state, listShoeSole: action.payload,

            };
        case Fetch_ShoeSole_Error:
            return {
                ...state,

            };
        case Fetch_Search_ShoeSole_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;