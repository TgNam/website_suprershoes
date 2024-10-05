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
} from "../types/voucherTypes";

import {
  fetchAllVouchers,
  postCreateNewVoucher,
  updateVoucher,
  deleteVoucher,
  postCreateAccountVoucher,
  updateAccountVoucher,
  deleteAccountVoucher,
} from "../../Service/ApiVoucherService";

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
    dispatch({ type: Create_Voucher_Request });
    try {
      const response = await postCreateNewVoucher(newVoucher);
      if (response.status === 200) {
        const accountVoucherData = {
          voucherId: response.data.id,
          accountId: newVoucher.accountId,
        };
        await postCreateAccountVoucher(accountVoucherData);

        dispatch({ type: Create_Voucher_Success });
        dispatch(fetchAllVoucherAction());
      } else {
        dispatch({ type: Create_Voucher_Error });
      }
    } catch (error) {
      dispatch({ type: Create_Voucher_Error });
    }
  };
};

export const updateVoucherAction = (id, updatedVoucher) => {
  return async (dispatch) => {
    dispatch({ type: Update_Voucher_Request });
    try {
      await updateVoucher(id, updatedVoucher);
      await updateAccountVoucher(id, { dateOfUse: updatedVoucher.dateOfUse });
      dispatch({ type: Update_Voucher_Success });
      dispatch(fetchAllVoucherAction());
    } catch (error) {
      dispatch({ type: Update_Voucher_Error });
    }
  };
};

export const deleteVoucherAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: Delete_Voucher_Request });
    try {
      await deleteVoucher(id);
      await deleteAccountVoucher(id);
      dispatch({ type: Delete_Voucher_Success });
      dispatch(fetchAllVoucherAction());
    } catch (error) {
      dispatch({ type: Delete_Voucher_Error });
    }
  };
};
