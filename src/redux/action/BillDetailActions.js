import {
    FETCH_BILL_DETAILS_REQUEST,
    FETCH_BILL_DETAILS_SUCCESS,
    FETCH_BILL_DETAILS_FAILURE,
    UPDATE_BILL_STATUS,
    COMPLETE_BILL,
    FETCH_BILL_STATISTICS_REQUEST,
    FETCH_BILL_STATISTICS_SUCCESS,
    FETCH_BILL_STATISTICS_FAILURE
} from '../types/BillDetailTypes';

import {
    fetchBillDetailsAndPayments,
    updateBillStatusAndNote,
    completeBill,
    fetchStatisticsProduct // Import the new service function
} from '../../Service/ApiBillDetailService';

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

// Fetch product statistics
// Fetch product statistics
export const fetchStatisticsProductAction = () => async (dispatch) => {
    dispatch({ type: FETCH_BILL_STATISTICS_REQUEST });
    try {
        const response = await fetchStatisticsProduct(); // Assuming this function fetches the data
        console.log('Fetched data:', response); // Log the data received without accessing .data
        dispatch({ type: FETCH_BILL_STATISTICS_SUCCESS, payload: response });
    } catch (error) {
        console.error('Error fetching statistics product:', error); // Log any errors encountered
        dispatch({ type: FETCH_BILL_STATISTICS_FAILURE, payload: error.message });
    }
};


// Update bill status and note
export const updateBillStatus = (codeBill, status, note) => async (dispatch) => {
    try {
        await updateBillStatusAndNote(codeBill, status, note);
        dispatch({ type: UPDATE_BILL_STATUS, payload: { status, note } });
    } catch (error) {
        console.error('Error updating bill status:', error.message);
    }
};

// Complete a bill
export const completeBillAction = (codeBill) => async (dispatch) => {
    try {
        await completeBill(codeBill);
        dispatch({ type: COMPLETE_BILL });
    } catch (error) {
        console.error('Error completing bill:', error.message);
    }
};

