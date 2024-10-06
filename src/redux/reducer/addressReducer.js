import {
    Fetch_Address_Request,
    Fetch_Search_Address_Success,
    Fetch_Address_Success,
    Fetch_Address_Error
} from '../types/addressTypes';
const INITIAL_STATE = {
    listAddress: [],
    address: {}
};
const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Address_Request:
            return {
                ...state,
            };
        case Fetch_Address_Success:
            return {
                ...state, listAddress: action.payload,

            };
        case Fetch_Address_Error:
            return {
                ...state,

            };
        case Fetch_Search_Address_Success:
            return {
                ...state, address: action.payload,

            };
        default: return state;

    }

};

export default counterReducer;