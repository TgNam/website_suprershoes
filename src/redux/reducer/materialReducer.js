import { Fetch_Posts_Material_Request, Fetch_Posts_Material_Success, Fetch_Posts_Material_Error } from '../types/materialTypes';

const INITIAL_STATE = {
    listMaterial: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Material_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Material_Success:
            return {
                ...state, listMaterial: action.payload,

            };
        case Fetch_Posts_Material_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;