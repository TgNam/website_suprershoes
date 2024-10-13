import {
  Fetch_Account_Voucher_Request,
  Fetch_Account_Voucher_Success,
  Fetch_Account_Voucher_Error,
  Create_Account_Voucher_Request,
  Create_Account_Voucher_Success,
  Create_Account_Voucher_Error,
  Update_Account_Voucher_Request,
  Update_Account_Voucher_Success,
  Update_Account_Voucher_Error,
  Delete_Account_Voucher_Request,
  Delete_Account_Voucher_Success,
  Delete_Account_Voucher_Error,
} from "../types/accountVoucherTypes";

import {
  fetchAllAccountVouchers,
  postCreateAccountVoucher,
  updateAccountVoucher,
  deleteAccountVoucher,
} from "../../Service/ApiAccountVoucherService";

export const fetchAllAccountVoucherAction = () => {
  return async (dispatch) => {
    dispatch({ type: Fetch_Account_Voucher_Request });
    try {
      const response = await fetchAllAccountVouchers();
      dispatch({
        type: Fetch_Account_Voucher_Success,
        payload: response,
      });
    } catch (error) {
      dispatch({ type: Fetch_Account_Voucher_Error });
    }
  };
};

export const createAccountVoucherAction = (accountVoucher) => {
  return async (dispatch) => {
    dispatch({ type: Create_Account_Voucher_Request });
    try {
      const response = await postCreateAccountVoucher(accountVoucher);
      dispatch({ type: Create_Account_Voucher_Success, payload: response });
      dispatch(fetchAllAccountVoucherAction());
    } catch (error) {
      dispatch({ type: Create_Account_Voucher_Error });
    }
  };
};

export const updateAccountVoucherAction = (id, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: Update_Account_Voucher_Request });
    try {
      const response = await updateAccountVoucher(id, updatedData);
      dispatch({ type: Update_Account_Voucher_Success, payload: response });
      dispatch(fetchAllAccountVoucherAction());
    } catch (error) {
      dispatch({ type: Update_Account_Voucher_Error });
    }
  };
};

export const deleteAccountVoucherAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: Delete_Account_Voucher_Request });
    try {
      await deleteAccountVoucher(id);
      dispatch({ type: Delete_Account_Voucher_Success });
      dispatch(fetchAllAccountVoucherAction());
    } catch (error) {
      dispatch({ type: Delete_Account_Voucher_Error });
    }
  };
};
