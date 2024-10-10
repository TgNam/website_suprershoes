import {
  Fetch_Voucher_Request,
  Fetch_Voucher_Success,
  Fetch_Voucher_Error,
  Create_Voucher_Request,
  Create_Voucher_Success,
  Create_Voucher_Error,
  Update_Voucher_Request,
  Update_Voucher_Success,
  Update_Voucher_Error,
  Delete_Voucher_Request,
  Delete_Voucher_Success,
  Delete_Voucher_Error,
  End_Voucher_Early_Request,
  End_Voucher_Early_Success,
  End_Voucher_Early_Error,
  Reactivate_Voucher_Request,
  Reactivate_Voucher_Success,
  Reactivate_Voucher_Error,
  Check_Expired_Vouchers_Request,
  Check_Expired_Vouchers_Success,
  Check_Expired_Vouchers_Error,
} from "../types/voucherTypes";
import {
  fetchAllVouchers,
  createPublicVoucher,
  createPrivateVoucher,
  updatePublicVoucher,
  updatePrivateVoucher,
  deleteVoucher,
  endVoucherEarly,
  reactivateVoucher,
  checkExpiredVouchers,
} from "../../Service/ApiVoucherService";

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
    } catch (error) {
      dispatch({ type: Create_Voucher_Error });
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
      dispatch({ type: Update_Voucher_Error });
    }
  };
};

export const deleteVoucherAction = (id, isPrivate) => {
  return async (dispatch) => {
    dispatch({ type: Delete_Voucher_Request });
    try {
      await deleteVoucher(id);
      dispatch({ type: Delete_Voucher_Success });
      dispatch(fetchAllVoucherAction());
    } catch (error) {
      dispatch({ type: Delete_Voucher_Error });
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
    } catch (error) {
      dispatch({ type: End_Voucher_Early_Error });
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
    } catch (error) {
      dispatch({ type: Reactivate_Voucher_Error });
    }
  };
};

export const checkExpiredVouchersAction = () => {
  return async (dispatch) => {
    dispatch({ type: Check_Expired_Vouchers_Request });
    try {
      await checkExpiredVouchers();
      dispatch({ type: Check_Expired_Vouchers_Success });
    } catch (error) {
      dispatch({ type: Check_Expired_Vouchers_Error, error: error.message });
    }
  };
};