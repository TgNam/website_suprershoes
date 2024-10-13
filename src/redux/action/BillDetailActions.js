import {
    FETCH_BILL_DETAILS_REQUEST,
    FETCH_BILL_DETAILS_SUCCESS,
    FETCH_BILL_DETAILS_FAILURE,
    UPDATE_BILL_STATUS,
    COMPLETE_BILL,
    DELETE_PRODUCT
} from './BillDetailTypes';

import {
    fetchBillDetailsAndPayments,
    updateBillStatusAndNote,
    completeBill,
    deleteProductFromBill
} from '../services/ApiBillDetail';

// Fetch bill details
export const fetchBillDetails = (codeBill, page) => async (dispatch) => {
    dispatch({ type: FETCH_BILL_DETAILS_REQUEST });
    try {
        const data = await fetchBillDetailsAndPayments(codeBill, page);
        dispatch({ type: FETCH_BILL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_BILL_DETAILS_FAILURE, payload: error.message });
    }
};

// Update bill status and note
export const updateBillStatus = (codeBill, status, note) => async (dispatch) => {
    try {
        await updateBillStatusAndNote(codeBill, status, note);
        dispatch({ type: UPDATE_BILL_STATUS, payload: { status, note } });
    } catch (error) {
        console.error(error.message);
    }
};

// Complete a bill
export const completeBillAction = (codeBill) => async (dispatch) => {
    try {
        await completeBill(codeBill);
        dispatch({ type: COMPLETE_BILL });
    } catch (error) {
        console.error(error.message);
    }
};

// Delete a product from the bill
export const deleteProduct = (productCode) => async (dispatch) => {
    try {
        await deleteProductFromBill(productCode);
        dispatch({ type: DELETE_PRODUCT, payload: productCode });
    } catch (error) {
        console.error(error.message);
    }
};
