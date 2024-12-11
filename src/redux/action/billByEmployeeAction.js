import { Find_Code_Bill, Fetch_Cart_Success, Fetch_Bill_Success, Fetch_Cart_Error } from '../types/billByEmployeeTypes';
import { findCodeBillByEmployee, postCreateNewBill, sortDisplayBillsByEmployee, findBillResponseByCodeBill, postPayBillByEmployee } from '../../Service/ApiBillByEmployeeService';
import { toast } from 'react-toastify';

export const CodeBillByEmployee = () => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await findCodeBillByEmployee();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi hiển thị hóa đơn:", error);
            dispatch(fetchPostsError())
        }

    }
}
export const findBillByCodeAndEmployee = (codeBill) => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await findBillResponseByCodeBill(codeBill);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsBillSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi hiển thị hóa đơn:", error);
            dispatch(fetchPostsError())
        }

    }
}
export const sortDisplayBills = (displayBills, selectills) => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await sortDisplayBillsByEmployee(displayBills, selectills);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
                toast.success("Cập nhật hóa đơn hiển thị thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi sắp xếp hóa đơn:", error);
            dispatch(CodeBillByEmployee());
            dispatch(fetchPostsError());
        }

    }
}
export const postCreateBill = (displayBills) => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await postCreateNewBill(displayBills);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
                toast.success("Thêm mới hóa đơn thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi sắp xếp hóa đơn:", error);
            dispatch(CodeBillByEmployee());
            dispatch(fetchPostsError());
        }

    }
}
export const postPayBillByEmployeeAction = (codeBill, delivery, postpaid, codeVoucher, idAccount, name, phoneNumber, address, note) => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await postPayBillByEmployee(codeBill, delivery, postpaid, codeVoucher, idAccount, name, phoneNumber, address, note);
            if (response.status === 200) {
                const data = response.data;
                dispatch(CodeBillByEmployee())
                toast.success(data);
                return true; // Thành công
            }
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            dispatch(fetchPostsError());
            return false; // Thất bại
        }

    }
}
export const findCodeBillFromAccount = () => {
    return {
        type: Find_Code_Bill
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Cart_Success,
        payload
    }
}
export const fetchPostsBillSuccess = (payload) => {
    return {
        type: Fetch_Bill_Success,
        payload
    }
}
export const fetchPostsError = () => {
    return {
        type: Fetch_Cart_Error
    }
}