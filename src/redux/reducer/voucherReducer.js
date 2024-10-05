import {
    Fetch_Voucher_Request,
    Fetch_Voucher_Success,
    Fetch_Voucher_Error
} from '../types/voucherTypes';

const initialState = {
    listVoucher: [],
    loading: false,
    error: null,
    totalPages: 0,
    totalElements: 0,
};

const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Voucher_Request:
            return { ...state, loading: true };
        case Fetch_Voucher_Success:
            return {
                ...state,
                loading: false,
                listVoucher: action.payload,
                totalPages: action.totalPages,
                totalElements: action.totalElements
            };
        case Fetch_Voucher_Error:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default voucherReducer;
