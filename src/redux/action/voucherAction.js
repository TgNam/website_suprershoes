import {
    Create_Voucher_Error,
    Create_Voucher_Request,
    Create_Voucher_Success,
    Delete_Voucher_Error,
    Delete_Voucher_Request,
    Delete_Voucher_Success,
    End_Voucher_Early_Error,
    End_Voucher_Early_Request,
    End_Voucher_Early_Success,
    Fetch_Voucher_Detail_Error,
    Fetch_Voucher_Detail_Request,
    Fetch_Voucher_Detail_Success,
    Fetch_Voucher_Error,
    Fetch_Voucher_Request,
    Fetch_Voucher_Success,
    Reactivate_Voucher_Error,
    Reactivate_Voucher_Request,
    Reactivate_Voucher_Success,
    Update_Voucher_Error,
    Update_Voucher_Request,
    Update_Voucher_Success,
} from "../types/voucherTypes";
import {
    createPrivateVoucher,
    createPublicVoucher,
    deleteVoucher,
    endVoucherEarly,
    fetchAllVouchers,
    getVoucherById,
    reactivateVoucher,
    updateVoucher,
} from "../../Service/ApiVoucherService";

export const fetchAllVoucherAction = (filters = {}, page = 0, size = 5) => {
    return async (dispatch) => {
        dispatch({ type: Fetch_Voucher_Request });
        try {
            const response = await fetchAllVouchers(filters, page, size);
            dispatch({
                type: Fetch_Voucher_Success,
                payload: response.vouchers,
                totalItems: response.totalItems,
                totalPages: response.totalPages,
            });
        } catch (error) {
            dispatch({ type: Fetch_Voucher_Error });
            console.error("Lỗi lấy danh sách phiếu giảm giá");
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
            console.success("Lấy phiếu giảm giá chi tiết thành công");
        } catch (error) {
            dispatch({ type: Fetch_Voucher_Detail_Error });
            console.error("Lấy phiếu giảm giá chi tiết thất bại");
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
            console.success("Tạo phiếu giảm giá thành công");
        } catch (error) {
            dispatch({ type: Create_Voucher_Error });
            console.error("Tạo phiếu giảm giá thất baị");
        }
    };
};

export const updateVoucherAction = (id, updatedVoucher) => {
    return async (dispatch) => {
        dispatch({ type: Update_Voucher_Request });
        try {
            const response = await updateVoucher(id, updatedVoucher);

            dispatch({ type: Update_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            console.success("Sửa phiếu giảm giá thành công");
        } catch (error) {
            dispatch({ type: Update_Voucher_Error, payload: error.message });
            console.error("Sửa phiếu giảm giá thất bại");
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
            console.success("Xóa phiếu giảm giá thành công");
        } catch (error) {
            dispatch({ type: Delete_Voucher_Error });
            console.error("Xóa phiếu giảm giá thất bại");
        }
    };
};

export const endVoucherEarlyAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: End_Voucher_Early_Request });
        try {
            const response = await endVoucherEarly(id);
            dispatch({ type: End_Voucher_Early_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            console.success("Kết thúc sớm thành công");
        } catch (error) {
            dispatch({ type: End_Voucher_Early_Error });
            console.error("Kết thúc sớm thất bại");
        }
    };
};

export const reactivateVoucherAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: Reactivate_Voucher_Request });
        try {
            const response = await reactivateVoucher(id);
            dispatch({ type: Reactivate_Voucher_Success, payload: response });
            dispatch(fetchAllVoucherAction());
            console.success("Bật kết thúc sớm thành công");
        } catch (error) {
            dispatch({ type: Reactivate_Voucher_Error });
            console.error("Bật kết thúc sớm thất bại");
        }
    };
};

