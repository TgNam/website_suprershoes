import {
    FETCH_BILL_REQUEST,
    FETCH_BILL_SUCCESS,
    FETCH_BILL_ERROR,
    ADD_BILL_REQUEST,
    ADD_BILL_SUCCESS,
    ADD_BILL_ERROR,
    UPDATE_BILL_REQUEST,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_ERROR,
    DELETE_BILL_REQUEST,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_ERROR,
} from '../types/billTypes';

const INITIAL_STATE = {
    listBill: [],
    loading: false,
    error: null,
    successMessage: null,
};

const billReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BILL_REQUEST:
        case ADD_BILL_REQUEST:
        case UPDATE_BILL_REQUEST:
        case DELETE_BILL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
            };

        case FETCH_BILL_SUCCESS:
            return {
                ...state,
                listBill: action.payload,
                loading: false,
                error: null,
            };

        case ADD_BILL_SUCCESS:
            return {
                ...state,
                listBill: [...state.listBill, action.payload],
                loading: false,
                successMessage: 'Bill added successfully',
            };

        case UPDATE_BILL_SUCCESS:
            return {
                ...state,
                listBill: state.listBill.map((bill) =>
                    bill.codeBill === action.payload.codeBill ? action.payload : bill
                ),
                loading: false,
                successMessage: 'Bill updated successfully',
            };

        case DELETE_BILL_SUCCESS:
            return {
                ...state,
                listBill: state.listBill.filter((bill) => bill.id !== action.payload),
                loading: false,
                successMessage: 'Bill deleted successfully',
            };

        case FETCH_BILL_ERROR:
        case ADD_BILL_ERROR:
        case UPDATE_BILL_ERROR:
        case DELETE_BILL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default billReducer;
