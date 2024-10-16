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
import {
    fetchBills,
    addNewBill,
    updateBillByCode,
    deleteBillById,
} from '../../Service/ApiBillService';

// Fetch all bills
export const fetchAllBills = (filters) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_BILL_REQUEST });
        try {
            const response = await fetchBills(filters);
            dispatch({ type: FETCH_BILL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_BILL_ERROR, payload: error.message });
        }
    };
};

// Add a new bill
export const createNewBill = (billData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_BILL_REQUEST });
        try {
            const response = await addNewBill(billData);
            dispatch({ type: ADD_BILL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_BILL_ERROR, payload: error.message });
        }
    };
};

// Update an existing bill
export const modifyBill = (codeBill, billData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_BILL_REQUEST });
        try {
            const response = await updateBillByCode(codeBill, billData);
            dispatch({ type: UPDATE_BILL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: UPDATE_BILL_ERROR, payload: error.message });
        }
    };
};

// Delete a bill
export const removeBill = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_BILL_REQUEST });
        try {
            await deleteBillById(id);
            dispatch({ type: DELETE_BILL_SUCCESS, payload: id });
        } catch (error) {
            dispatch({ type: DELETE_BILL_ERROR, payload: error.message });
        }
    };
};
