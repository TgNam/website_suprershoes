import { Fetch_Posts_PayBillOrder_Request, Fetch_Posts_PayBillOrder_Success, Fetch_Posts_PayBillOrder_Error } from '../types/PayBillOrderType';

const INITIAL_STATE = {
    listPayBillOrder: [],
};

const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Fetch_Posts_PayBillOrder_Request:
            return {
                ...state,
            };
        case Fetch_Posts_PayBillOrder_Success:
            return {
                ...state, listPayBillOrder: action.payload,

            };
        case Fetch_Posts_PayBillOrder_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;