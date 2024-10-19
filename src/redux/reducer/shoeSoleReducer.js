import { Fetch_Posts_ShoeSole_Request, Fetch_Posts_ShoeSole_Success, Fetch_Posts_ShoeSole_Error }from '../types/shoeSoleTypes';

const INITIAL_STATE = {
    listShoeSole: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_ShoeSole_Request:
            return {
                ...state,
            };
        case Fetch_Posts_ShoeSole_Success:
            return {
                ...state, listShoeSole: action.payload,

            };
        case Fetch_Posts_ShoeSole_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;