import { Fetch_User_Request, Fetch_User_Success, Fetch_User_Error } from '../action/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    listUser: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_User_Request:
            return {
                ...state,
            };
        case Fetch_User_Success:
            return {
                ...state, listUser: action.payload,

            };
        case Fetch_User_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;