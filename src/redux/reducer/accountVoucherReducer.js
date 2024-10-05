import {
  Fetch_AccountVoucher_Request,
  Fetch_AccountVoucher_Success,
  Fetch_AccountVoucher_Error,
  Create_AccountVoucher_Request,
  Create_AccountVoucher_Success,
  Create_AccountVoucher_Error,
  Update_AccountVoucher_Request,
  Update_AccountVoucher_Success,
  Update_AccountVoucher_Error,
  Delete_AccountVoucher_Request,
  Delete_AccountVoucher_Success,
  Delete_AccountVoucher_Error,
} from "../types/accountVoucherTypes";

const initialState = {
  listAccountVoucher: [],
  loading: false,
  error: null,
};

const accountVoucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case Fetch_AccountVoucher_Request:
    case Create_AccountVoucher_Request:
    case Update_AccountVoucher_Request:
    case Delete_AccountVoucher_Request:
      return { ...state, loading: true, error: null };

    case Fetch_AccountVoucher_Success:
      return {
        ...state,
        loading: false,
        listAccountVoucher: action.payload,
      };

    case Create_AccountVoucher_Success:
    case Update_AccountVoucher_Success:
    case Delete_AccountVoucher_Success:
      return { ...state, loading: false, error: null };

    case Fetch_AccountVoucher_Error:
    case Create_AccountVoucher_Error:
    case Update_AccountVoucher_Error:
    case Delete_AccountVoucher_Error:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default accountVoucherReducer;
