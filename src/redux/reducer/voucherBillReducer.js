import {
    Fetch_Posts_VoucherBill_Request,
    Fetch_Posts_VoucherBillPublic_Success,
    Fetch_Posts_VoucherBillPrivate_Success,
    Fetch_Posts_VoucherDetail_Success,
    Fetch_Posts_VoucherBill_Error
} from '../types/VoucherBillTypes';
const INITIAL_STATE = {
    listVoucherPublic: [],
    listVoucherPrivate: [],
    voucherDetai: {},
};

const counterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_Posts_VoucherBill_Request:
            return {
                ...state,
            };
        case Fetch_Posts_VoucherDetail_Success:
            return {
                ...state,
                voucherDetai: action.payload,  // Cập nhật listVoucherPublic
            };
        case Fetch_Posts_VoucherBillPublic_Success:
            return {
                ...state,
                listVoucherPublic: action.payload,  // Cập nhật listVoucherPublic
            };
        case Fetch_Posts_VoucherBillPrivate_Success:
            return {
                ...state,
                listVoucherPrivate: action.payload, // Cập nhật listVoucherPrivate
            };
        case Fetch_Posts_VoucherBill_Error:
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default counterReducer;
