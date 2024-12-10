import { postCreateBillDetailByEmployee, findBillDetailByEmployeeByCodeBill ,postUpdateBillDetailByEmployee} from '../../Service/ApiBillDetailByEmployeeService'
import {
    Find_Posts_Bill_Detail_By_Employee_Request,
    Fetch_Posts_Bill_Detail_By_Employee_Success,
    Fetch_Posts_Bill_Detail_By_Employee_Error
} from '../types/billDetailByEmployeeTypes'
import { toast } from 'react-toastify';

export const createNewBillDetailByEmployee = (codeBill, idProductDetail) => {
    return async (dispatch) => {
        try {
            const response = await postCreateBillDetailByEmployee(codeBill, idProductDetail);
            if (response.status === 200) {
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
            dispatch(fetchPostsBillDetailByEmployeeError());
        }
    };
};

export const updateBillDetailByEmployee = (codeBill, idProductDetail) => {
    return async (dispatch) => {
        try {
            const response = await postUpdateBillDetailByEmployee(codeBill, idProductDetail);
            if (response.status === 200) {
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm :", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    // Xử lý lỗi validation (400 Bad Request)
                    if (Array.isArray(errorData)) {
                        errorData.forEach(err => {
                            toast.error(err); // Hiển thị từng lỗi trong mảng
                        });
                    } else {
                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                    }
                } else if (statusCode === 409) {
                    const { mess } = errorData;
                    toast.error(mess);
                } else {
                    // Xử lý các lỗi khác
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                // Lỗi do không nhận được phản hồi từ server
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                // Lỗi khác (cấu hình, v.v.)
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            dispatch(fetchPostsBillDetailByEmployeeError());
        }
    };
};

export const fetchBillDetailByEmployeeByCodeBill = (codeBill) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsBillDetailByEmployeeRequest());
        try {
            const response = await findBillDetailByEmployeeByCodeBill(codeBill);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsBillDetailByEmployeeSuccess(data))
            }
        } catch (error) {
            console.error("Lỗi hiển thị sản phẩm vào giỏ hàng:", error);
            dispatch(fetchPostsBillDetailByEmployeeError())
        }

    }
}
export const fetchPostsBillDetailByEmployeeRequest = () => {
    return {
        type: Find_Posts_Bill_Detail_By_Employee_Request
    }
}
export const fetchPostsBillDetailByEmployeeSuccess = (payload) => {
    return {
        type: Fetch_Posts_Bill_Detail_By_Employee_Success,
        payload
    }
}

export const fetchPostsBillDetailByEmployeeError = () => {
    return {
        type: Fetch_Posts_Bill_Detail_By_Employee_Error
    }
}