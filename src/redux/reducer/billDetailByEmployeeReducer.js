import {
    Find_Posts_Bill_Detail_By_Employee_Request,
    Fetch_Posts_Bill_Detail_By_Employee_Success,
    Fetch_Posts_Bill_Detail_By_Employee_Error
} from '../types/billDetailByEmployeeTypes'
const INITIAL_STATE = {
    listBillDetailOrder: [],
};
const counterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Find_Posts_Bill_Detail_By_Employee_Request:
            return {
                ...state,
            };
        case Fetch_Posts_Bill_Detail_By_Employee_Success:
            return {
                ...state, listBillDetailOrder: action.payload,

            };
        case Fetch_Posts_Bill_Detail_By_Employee_Error:
            return {
                ...state,

            };
        default: return state;

    }

};

export default counterReducer;