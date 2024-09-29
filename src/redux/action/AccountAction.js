import { Fetch_Account_Cusomer_Request, Fetch_Search_Account_Cusomer_Request, Fetch_Account_Cusomer_Success, Fetch_Account_Cusomer_Error, Fetch_Account_Employee_Request, Fetch_Account_Employee_Success, Fetch_Account_Employee_Error } from '../types/AccountTypes';
import { postCreateNewAccount, getAllAccountsCusomer, findByNameAndStatus, getAllAccountsEmployee } from '../../Service/ApiAccountService';
import { toast } from 'react-toastify';

export const fetchAllAccountCusomer = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsCusomerRequest());
        try {
            const response = await getAllAccountsCusomer();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsCusomerSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsCusomerError);
            }
        } catch (error) {
            dispatch(fetchPostsCusomerError)
        }

    }
}
export const fetchSearchPostsCusomer = (searchName, status) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchPostsCusomerRequest());
        try {
            const response = await findByNameAndStatus(searchName, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsCusomerSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsCusomerError);
            }
        } catch (error) {
            dispatch(fetchPostsCusomerError)
        }

    }
}
export const createNewAccount = (createAccount) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewAccount(createAccount);
            if (response.status === 200) {
                dispatch(fetchAllAccountCusomer());
                toast.success("Thêm người dùng mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);

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
                    // Xử lý lỗi email đã tồn tại (409 Conflict)
                    const { mess } = errorData;
                    toast.error(mess || "Email đã tồn tại trong hệ thống.");
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

            dispatch(fetchPostsCusomerError());
        }
    };
};

export const fetchAllAccountEmployee = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsEmployeeRequest());
        try {
            const response = await getAllAccountsEmployee();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsEmployeeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsEmployeeError);
            }
        } catch (error) {
            dispatch(fetchPostsEmployeeError)
        }

    }
}
export const fetchPostsCusomerRequest = () => {
    return {
        type: Fetch_Account_Cusomer_Request
    }
}
export const fetchPostsEmployeeRequest = () => {
    return {
        type: Fetch_Account_Employee_Request
    }
}
export const FetchSearchPostsCusomerRequest = () => {
    return {
        type: Fetch_Search_Account_Cusomer_Request
    }
}
export const fetchPostsCusomerSuccess = (payload) => {
    return {
        type: Fetch_Account_Cusomer_Success,
        payload
    }
}
export const fetchPostsEmployeeSuccess = (payload) => {
    return {
        type: Fetch_Account_Employee_Success,
        payload
    }
}
export const fetchPostsCusomerError = () => {
    return {
        type: Fetch_Account_Cusomer_Error
    }
}
export const fetchPostsEmployeeError = () => {
    return {
        type: Fetch_Account_Employee_Error
    }
}