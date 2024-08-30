import { 
    Fetch_Bill_Request, 
    Fetch_Bill_Success, 
    Fetch_Bill_Error, 
    Fetch_Search_Bill_Request 
} from '../types/billTypes';
import { findByStatusActiveFromBill, findByName } from '../../Service/ApiBillService';
import { toast } from 'react-toastify';

export const fetchAllBills = () => {
    return async (dispatch, getState) => {
        dispatch(fetchBillsRequest());
        try {
            const response = await findByStatusActiveFromBill();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchBillsSuccess(data));
            } else {
                toast.error('Error fetching bills');
                dispatch(fetchBillsError());
            }
        } catch (error) {
            toast.error('Error fetching bills');
            dispatch(fetchBillsError());
        }
    };
};

export const fetchSearchBill = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchBillRequest());
        try {
            const response = await findByName(searchName);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchBillsSuccess(data));
            } else {
                toast.error('Error fetching search results');
                dispatch(fetchBillsError());
            }
        } catch (error) {
            toast.error('Error fetching search results');
            dispatch(fetchBillsError());
        }
    };
};

export const fetchBillsRequest = () => {
    return {
        type: Fetch_Bill_Request
    };
};

export const FetchSearchBillRequest = () => {
    return {
        type: Fetch_Search_Bill_Request
    };
};

export const fetchBillsSuccess = (payload) => {
    return {
        type: Fetch_Bill_Success,
        payload
    };
};

export const fetchBillsError = () => {
    return {
        type: Fetch_Bill_Error
    };
};
