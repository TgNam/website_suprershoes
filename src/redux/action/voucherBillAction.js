import {
    Fetch_Posts_VoucherBill_Request,
    Fetch_Posts_VoucherDetail_Success,
    Fetch_Posts_VoucherBillPublic_Success,
    Fetch_Posts_VoucherBillPrivate_Success,
    Fetch_Posts_VoucherBill_Error
} from '../types/VoucherBillTypes';
import {
    findAllVoucherBillPublic,
    findAllVoucherBillPrivate,
    findVoucherDetail
} from '../../Service/ApiVoucherService';
import { toast } from 'react-toastify';

export const fetchAllVoucherBillPublic = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsVoucherBillRequest());
        try {
            const response = await findAllVoucherBillPublic();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsVoucherBillPublicSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsVoucherBillError());
            }
        } catch (error) {
            dispatch(fetchPostsVoucherBillError())
        }

    }
}
export const fetchAllVoucherBillPrivate = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsVoucherBillRequest());
        try {
            const response = await findAllVoucherBillPrivate(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsVoucherBillPrivateSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsVoucherBillError());
            }
        } catch (error) {
            dispatch(fetchPostsVoucherBillError())
        }

    }
}
export const fetchVoucherDetail = (idVoucher) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsVoucherBillRequest());
        try {
            const response = await findVoucherDetail(idVoucher);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsVoucherDetailSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsVoucherBillError());
            }
        } catch (error) {
            dispatch(fetchPostsVoucherBillError())
        }

    }
}
export const fetchPostsVoucherBillRequest = () => {
    return {
        type: Fetch_Posts_VoucherBill_Request
    }
}
export const fetchPostsVoucherDetailSuccess = (payload) => {
    return {
        type: Fetch_Posts_VoucherDetail_Success,
        payload
    }
}
export const fetchPostsVoucherBillPublicSuccess = (payload) => {
    return {
        type: Fetch_Posts_VoucherBillPublic_Success,
        payload
    }
}
export const fetchPostsVoucherBillPrivateSuccess = (payload) => {
    return {
        type: Fetch_Posts_VoucherBillPrivate_Success,
        payload
    }
}
export const fetchPostsVoucherBillError = () => {
    return {
        type: Fetch_Posts_VoucherBill_Error
    }
}