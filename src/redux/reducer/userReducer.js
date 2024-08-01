import { Fetch_User_Request, Fetch_User_Success, Fetch_User_Error } from '../action/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    listUser: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case Fetch_User_Request:
            console.log('Fetch_User_Request:', action.type)
            return {
                ...state,
            };

        case Fetch_User_Success:
            console.log('Fetch_User_Success:', action.type, action.payload)
            return {
                ...state, listUser: action.payload,

            };
        case Fetch_User_Error:
            console.log('Fetch_User_Error:', action.type)
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;