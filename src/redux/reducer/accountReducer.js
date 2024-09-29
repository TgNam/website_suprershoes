import { Fetch_Account_Cusomer_Request, Fetch_Search_Account_Cusomer_Request, Fetch_Account_Cusomer_Success, Fetch_Account_Cusomer_Error, Fetch_Account_Employee_Request, Fetch_Account_Employee_Success, Fetch_Account_Employee_Error } from '../types/AccountTypes';

const INITIAL_STATE = {
    listAccountCusomer: [],
    listAccountEmployee: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Account_Cusomer_Request:
            return {
                ...state,
            };
        case Fetch_Search_Account_Cusomer_Request:
            return {
                ...state,
            };
        case Fetch_Account_Cusomer_Success:
            return {
                ...state, listAccountCusomer: action.payload,

            };
        case Fetch_Account_Cusomer_Error:
            return {
                ...state,

            };
        case Fetch_Account_Employee_Request:
            return {
                ...state,
            };
        case Fetch_Account_Employee_Success:
            return {
                ...state, listAccountEmployee: action.payload,

            };
        case Fetch_Account_Employee_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;