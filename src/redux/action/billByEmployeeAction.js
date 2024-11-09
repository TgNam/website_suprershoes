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
            } else {
                toast.error('Error CodeBillByEmployee')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            dispatch(fetchPostsError)
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
            } else {
                toast.error('Error CodeBillByEmployee')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            dispatch(fetchPostsError)
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
            } else {
                toast.error('Error CodeBillByEmployee')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            console.log((error))
            console.error("Lỗi khi sắp xếp hóa đơn:", error);
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
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
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
            } else {
                toast.error('Error CodeBillByEmployee')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            console.error("Lỗi khi sắp xếp hóa đơn:", error);

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
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
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
            } else {
                toast.error('Lỗi thanh toán')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            console.error("Lỗi thanh toán:", error);

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
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            dispatch(fetchPostsError());
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