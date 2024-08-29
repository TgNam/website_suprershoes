import { 
    Fetch_Bill_Request, 
    Fetch_Bill_Success, 
    Fetch_Bill_Error, 
    Fetch_Search_Bill_Request 
} from '../types/billTypes';

const INITIAL_STATE = {
    listBill: [],
};

const billReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Bill_Request:
            return {
                ...state,
            };
        case Fetch_Bill_Success:
            return {
                ...state, listBill: action.payload,
            };
        case Fetch_Bill_Error:
            return {
                ...state,
            };
        case Fetch_Search_Bill_Request:
            return {
                ...state,
            };
        default: 
            return state;
    }
};

export default billReducer;
