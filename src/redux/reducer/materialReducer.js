import { Fetch_Material_Request, Fetch_Material_Success, Fetch_Material_Error, Fetch_Search_Material_Request } from '../types/materialTypes';

const INITIAL_STATE = {
    listMaterial: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Material_Request:
            return {
                ...state,
            };
        case Fetch_Material_Success:
            return {
                ...state, listMaterial: action.payload,

            };
        case Fetch_Material_Error:
            return {
                ...state,

            };
        case Fetch_Search_Material_Request:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;