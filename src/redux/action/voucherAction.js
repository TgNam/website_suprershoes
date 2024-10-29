import {
    Check_Expired_Vouchers_Error,
    Check_Expired_Vouchers_Request,
    Check_Expired_Vouchers_Success,
    Create_Voucher_Error,
    Create_Voucher_Request,
    Create_Voucher_Success,
    Delete_Voucher_Error,
    Delete_Voucher_Request,
    Delete_Voucher_Success,
    End_Voucher_Early_Error,
    End_Voucher_Early_Request,
    End_Voucher_Early_Success,
    Fetch_Voucher_Error,
    Fetch_Voucher_Request,
    Fetch_Voucher_Success,
    Fetch_Voucher_Detail_Request,
    Fetch_Voucher_Detail_Success,
    Fetch_Voucher_Detail_Error,
    Reactivate_Voucher_Error,
    Reactivate_Voucher_Request,
    Reactivate_Voucher_Success,
    Update_Voucher_Error,
    Update_Voucher_Request,
    Update_Voucher_Success,
} from "../types/voucherTypes";
import {
    checkExpiredVouchers,
    createPrivateVoucher,
    createPublicVoucher,
    deleteVoucher,
    endVoucherEarly,
    fetchAllVouchers,
    getVoucherById,
    reactivateVoucher,
    updatePrivateVoucher,
    updatePublicVoucher,
} from "../../Service/ApiVoucherService";
import { toast } from "react-toastify";

// Fetch all vouchers action
export const fetchAllVoucherAction = (filters = {}, page = 0, size = 10) => {
    return async (dispatch) => {
        dispatch({ type: Fetch_Voucher_Request });
        try {
            const response = await fetchAllVouchers(filters, page, size);
            dispatch({
                type: Fetch_Voucher_Success,
                payload: response.vouchers,
                totalRecords: response.totalRecords,
                totalPages: response.totalPages,
            });
        } catch (error) {
            dispatch({ type: Fetch_Voucher_Error });
            toast.error("Failed to fetch vouchers");
        }
    };
};


export const fetchVoucherDetailAction = (voucherId) => {
    return async (dispatch) => {
        dispatch({ type: Fetch_Voucher_Detail_Request });
        try {
            const response = await getVoucherById(voucherId);
            dispatch({
                type: Fetch_Voucher_Detail_Success,
                payload: response,
            });
            toast.success("Voucher details fetched successfully");
        } catch (error) {
            dispatch({ type: Fetch_Voucher_Detail_Error });
            toast.error("Failed to fetch voucher details");
        }
    };
};


export const createVoucherAction = (newVoucher) => {
    return async (dispatch) => {
        dispatch({ type: Create_Voucher_Request });
        try {
            let response;
            if (newVoucher.isPrivate) {
                response = await createPrivateVoucher(newVoucher);
            } else {
                response = await createPublicVoucher(newVoucher);
            }
            dispatch({ type: Create_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            toast.success("Voucher created successfully");
        } catch (error) {
            dispatch({ type: Create_Voucher_Error });
            toast.error("Failed to create voucher");
        }
    };
};


export const updateVoucherAction = (id, updatedVoucher) => {
    return async (dispatch) => {
        dispatch({ type: Update_Voucher_Request });
        try {
            let response;
            if (updatedVoucher.isPrivate) {
                response = await updatePrivateVoucher(id, updatedVoucher);
            } else {
                response = await updatePublicVoucher(id, updatedVoucher);
            }

            dispatch({ type: Update_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
        
        } catch (error) {
            dispatch({ type: Update_Voucher_Error, payload: error.message });
            toast.error("Failed to update voucher");
        }
    };
};


export const deleteVoucherAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: Delete_Voucher_Request });
        try {
            const response = await deleteVoucher(id);
            dispatch({ type: Delete_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            toast.success("Voucher deleted successfully");
        } catch (error) {
            dispatch({ type: Delete_Voucher_Error });
            toast.error("Failed to delete voucher");
        }
    };
};

// End voucher early action
export const endVoucherEarlyAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: End_Voucher_Early_Request });
        try {
            const response = await endVoucherEarly(id);
            dispatch({ type: End_Voucher_Early_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            toast.success("Voucher ended early successfully");
        } catch (error) {
            dispatch({ type: End_Voucher_Early_Error });
            toast.error("Failed to end voucher early");
        }
    };
};

// Reactivate voucher action
export const reactivateVoucherAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: Reactivate_Voucher_Request });
        try {
            const response = await reactivateVoucher(id);
            dispatch({ type: Reactivate_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            toast.success("Voucher reactivated successfully");
        } catch (error) {
            dispatch({ type: Reactivate_Voucher_Error });
            toast.error("Failed to reactivate voucher");
        }
    };
};

// Check expired vouchers action
export const checkExpiredVouchersAction = () => {
    return async (dispatch) => {
        dispatch({ type: Check_Expired_Vouchers_Request });
        try {
            await checkExpiredVouchers();
            dispatch({ type: Check_Expired_Vouchers_Success });
            toast.success("Expired vouchers checked successfully");
        } catch (error) {
            dispatch({ type: Check_Expired_Vouchers_Error, error: error.message });
            toast.error("Failed to check expired vouchers");
        }
    };
};
