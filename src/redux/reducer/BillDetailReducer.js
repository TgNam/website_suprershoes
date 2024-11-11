import {
    FETCH_BILL_DETAILS_REQUEST,
    FETCH_BILL_DETAILS_SUCCESS,
    FETCH_BILL_DETAILS_FAILURE,
    UPDATE_BILL_STATUS,
    COMPLETE_BILL,
    DELETE_PRODUCT,
    FETCH_BILL_STATISTICS_REQUEST,
    FETCH_BILL_STATISTICS_SUCCESS,
    FETCH_BILL_STATISTICS_FAILURE
} from './BillDetailTypes';

const initialState = {
    billDetail: [],
    payBill: [],
    billSummary: null,
    totalPages: 0,
    loading: false,
    statisticsLoading: false, // Separate loading state for statistics
    error: null,
    status: { status1: false, status2: false, status3: false, status4: false },
    billDetailStatistics: [] // New state for holding statistics data
};

export const billDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BILL_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BILL_DETAILS_SUCCESS:
            return {
                ...state,
                billDetail: action.payload.billDetails,
                payBill: action.payload.payBill,
                billSummary: action.payload.billSummary,
                totalPages: action.payload.totalPages,
                loading: false
            };
        case FETCH_BILL_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_BILL_STATUS:
            return { ...state, billSummary: { ...state.billSummary, status: action.payload.status, note: action.payload.note } };
        case COMPLETE_BILL:
            return { ...state, billSummary: { ...state.billSummary, status: 'COMPLETED' } };
        case DELETE_PRODUCT:
            return { ...state, billDetail: state.billDetail.filter(product => product.productCode !== action.payload) };
        case FETCH_BILL_STATISTICS_REQUEST:
            return { ...state, statisticsLoading: true, error: null };
        case FETCH_BILL_STATISTICS_SUCCESS:
            return { ...state, billDetailStatistics: action.payload, statisticsLoading: false };
        case FETCH_BILL_STATISTICS_FAILURE:
            return { ...state, statisticsLoading: false, error: action.payload };
        default:
            return state;
    }
};
