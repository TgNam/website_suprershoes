
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
} from "../types/accountVoucherTypes";

const initialState = {
  listAccountVoucher: [],
  loading: false,
  error: null,
};

const accountVoucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Account_Voucher_Request:
    case Create_Account_Voucher_Request:
    case Update_Account_Voucher_Request:
      return { ...state, loading: true, error: null };

    case Fetch_Account_Voucher_Success:
      return {
        ...state,
        loading: false,
        listAccountVoucher: action.payload,
      };

    case Create_Account_Voucher_Success:
    case Update_Account_Voucher_Success:
      return { ...state, loading: false, error: null };

    case Fetch_Account_Voucher_Error:
    case Create_Account_Voucher_Error:
    case Update_Account_Voucher_Error:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default accountVoucherReducer;
