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

const initialState = {
  listVoucher: [],
  loading: false,
  error: null,
  totalPages: 0,
  totalElements: 0,
};

const voucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case Fetch_Voucher_Request:
    case Create_Voucher_Request:
    case Update_Voucher_Request:
    case Delete_Voucher_Request:
      return { ...state, loading: true, error: null };

    case Fetch_Voucher_Success:
      return {
        ...state,
        loading: false,
        listVoucher: action.payload,
        totalPages: action.totalPages,
        totalElements: action.totalElements,
      };

    case Create_Voucher_Success:
    case Update_Voucher_Success:
    case Delete_Voucher_Success:
      return { ...state, loading: false, error: null };

    case Fetch_Voucher_Error:
    case Create_Voucher_Error:
    case Update_Voucher_Error:
    case Delete_Voucher_Error:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default voucherReducer;
