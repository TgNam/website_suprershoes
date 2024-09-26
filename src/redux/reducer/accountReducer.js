import { Fetch_Account_Request, Fetch_Account_Success, Fetch_Account_Error } from '../types/AccountTypes';

const INITIAL_STATE = {
    listAccount: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Account_Request:
            return {
                ...state,
            };
        case Fetch_Account_Success:
            return {
                ...state, listAccount: action.payload,

            };
        case Fetch_Account_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;