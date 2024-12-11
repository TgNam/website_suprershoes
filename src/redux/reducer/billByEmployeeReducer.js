import { Find_Code_Bill, Fetch_Cart_Success, Fetch_Bill_Success, Fetch_Cart_Error } from '../types/billByEmployeeTypes';

const INITIAL_STATE = {
  displayBills: [], // danh sách hóa đơn hiện tại
  waitingList: [], // danh sách chờ
  billByCode: {}
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Find_Code_Bill:
      return { ...state };

    case Fetch_Cart_Success:
      const { displayBills, waitingBills } = action.payload;
      return {
        ...state,
        displayBills: displayBills, // Cập nhật danh sách hóa đơn hiển thị
        waitingList: waitingBills, // Cập nhật danh sách chờ
      };
    case Fetch_Bill_Success:
      console.log("action.payload", action.payload)
      return {
        ...state,
        billByCode: action.payload,
      };
    case Fetch_Cart_Error:
      return { ...state };
    default:
      return state;
  }
};

export default counterReducer;
