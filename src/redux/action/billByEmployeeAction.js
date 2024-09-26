import { Find_Code_Bill, Fetch_Cart_Success, Fetch_Cart_Error, Add_Bill, Update_Displayed_Bills, Pay_Bill } from '../types/billByEmployeeTypes';
import { findCodeBillByEmployee, postCreateNewBill } from '../../Service/ApiBillByEmployeeService';
import { toast } from 'react-toastify';

export const CodeBillByEmployee = () => {
    return async (dispatch) => {
        dispatch(findCodeBillFromAccount());
        try {
            const response = await findCodeBillByEmployee();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            } else {
                toast.error('Error CodeBillByEmployee')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            dispatch(fetchPostsError)
        }

    }
}
export const createNewBill = () => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewBill();
            if (response.status === 200) {
                // Dispatch action với payload là mã hóa đơn mới
                const data = response.data;
                console.log(data);
                dispatch(addBill(data)); // Đảm bảo hàm này là function
                toast.success("Thêm hóa đơn thành công!")
            }
        } catch (error) {
            console.error("Error creating bill:", error);
            dispatch(fetchPostsError());
        }
    };
};
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
export const addBill = (payload) => {
    return {
        type: Add_Bill,
        payload
    }
}
export const updateDisplayedBills = (selectedBills) => {
    return {
        type: Update_Displayed_Bills,
        payload: selectedBills,
    };
};

export const fetchPostsError = () => {
    return {
        type: Fetch_Cart_Error
    }
}