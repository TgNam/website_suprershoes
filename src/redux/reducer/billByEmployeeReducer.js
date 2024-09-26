import { Find_Code_Bill, Fetch_Cart_Success, Fetch_Cart_Error, Add_Bill, Update_Displayed_Bills, Pay_Bill } from '../types/billByEmployeeTypes';

const INITIAL_STATE = {
  codeBill: [], // danh sách hóa đơn hiện tại
  waitingList: [], // danh sách chờ
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Find_Code_Bill:
      return { ...state };

    case Fetch_Cart_Success:
      const { payload } = action;
      // Chỉ giữ lại 5 hóa đơn mới nhất, các hóa đơn cũ sẽ vào danh sách chờ
      const updatedBills = [...state.codeBill, ...payload].slice(-5);
      const updatedWaitingList = [...state.waitingList, ...payload].slice(0, Math.max(0, payload.length - 5));
      return {
        ...state,
        codeBill: updatedBills,
        waitingList: updatedWaitingList,
      };

    case Fetch_Cart_Error:
      return { ...state };

    case Add_Bill:
      // Thêm hóa đơn mới vào danh sách, đẩy hóa đơn cũ vào danh sách chờ nếu vượt quá 5
      const newCodeBill = [...state.codeBill, action.payload];
      const newWaitingList = newCodeBill.length > 5 ? [...state.waitingList, newCodeBill[0]] : state.waitingList;
      return {
        ...state,
        codeBill: newCodeBill.slice(-5),
        waitingList: newWaitingList,
      };
    case Update_Displayed_Bills:
      const selectedBills = action.payload;
      // Gộp các hóa đơn được chọn vào danh sách hiển thị, chỉ giữ lại 5 hóa đơn mới nhất
      const newDisplayedBills = [...state.codeBill, ...selectedBills].slice(-5);

      // Cập nhật danh sách chờ sao cho không chứa các hóa đơn đã hiển thị trong newDisplayedBills
      const updateWaitingList = [...state.codeBill, ...state.waitingList].filter(
        (bill) => !newDisplayedBills.includes(bill)
      );
      return {
        ...state,
        codeBill: newDisplayedBills,
        waitingList: updateWaitingList,

      };

    case Pay_Bill:
      // Cập nhật danh sách khi thanh toán hóa đơn
      const remainingBills = state.codeBill.filter(bill => bill !== action.payload);
      const updatedDisplay = [...remainingBills, state.waitingList[0]].slice(-5);
      const remainingWaiting = state.waitingList.slice(1);
      return {
        ...state,
        codeBill: updatedDisplay,
        waitingList: remainingWaiting,
      };

    default:
      return state;
  }
};

export default counterReducer;
