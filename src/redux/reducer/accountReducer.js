import {
    Fetch_Posts_Account_Request,
    Fetch_Account_Cusomer_Success,
    Fetch_Account_Employee_Success,
    Fetch_Find_Posts_Account_Success,
    Fetch_Posts_Account_Error,
} from '../types/AccountTypes';

const INITIAL_STATE = {
    listAccountCusomer: [],
    listAccountEmployee: [],
    accountDetail:{},
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_Account_Request:
            return {
                ...state,
            };
        case Fetch_Account_Cusomer_Success:
            return {
                ...state, listAccountCusomer: action.payload,

            };
        case Fetch_Account_Employee_Success:
            return {
                ...state, listAccountEmployee: action.payload,

            };
        case Fetch_Find_Posts_Account_Success:
            return {
                ...state, accountDetail: action.payload,

            };
        case Fetch_Posts_Account_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;