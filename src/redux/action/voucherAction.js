import {
    Fetch_Voucher_Request,
    Fetch_Voucher_Success,
    Fetch_Voucher_Error
} from '../types/voucherTypes';
import {
    fetchAllVouchers,
    postCreateNewVoucher,
    updateVoucher,
    deleteVoucher
} from '../../Service/ApiVoucherService';

export const fetchAllVoucherAction = (filters = {}, page = 0, size = 10) => {
    return async (dispatch) => {
        dispatch({ type: Fetch_Voucher_Request });
        try {
            const response = await fetchAllVouchers(filters, page, size);
            if (response.status === 200) {
                dispatch({
                    type: Fetch_Voucher_Success,
                    payload: response.data.content,
                    totalElements: response.data.totalElements,
                    totalPages: response.data.totalPages,
                });
            } else {
                dispatch({ type: Fetch_Voucher_Error });
            }
        } catch (error) {
            dispatch({ type: Fetch_Voucher_Error });
        }
    };
};

export const createVoucherAction = (newVoucher) => {
    return async (dispatch) => {
        try {
            await postCreateNewVoucher(newVoucher);
            dispatch(fetchAllVoucherAction());
        } catch (error) {
            console.error(error);
        }
    };
};

export const updateVoucherAction = (id, updatedVoucher) => {
    return async (dispatch) => {
        try {
            await updateVoucher(id, updatedVoucher);
            dispatch(fetchAllVoucherAction());
        } catch (error) {
            console.error(error);
        }
    };
};

export const deleteVoucherAction = (id) => {
    return async (dispatch) => {
        try {
            await deleteVoucher(id);
            dispatch(fetchAllVoucherAction());
        } catch (error) {
            console.error(error);
        }
    };
};
