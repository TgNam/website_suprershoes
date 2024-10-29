import {
    Fetch_Posts_Account_Request,
    Fetch_Account_Cusomer_Success,
    Fetch_Account_Employee_Success,
    Fetch_Find_Posts_Account_Success,
    Fetch_Posts_Account_Error,
} from '../types/AccountTypes';
import {
    postCreateNewAccount,
    getAllAccountsCusomer,
    findCustomerByNameAndStatus,
    updateAccount,
    findAccountById,
    getAllAccountsEmployee,
    findEmployeeByNameAndStatus,
    updateStatusAccount,
    postCreateNewEmployee,
    updateEmplloyee
} from '../../Service/ApiAccountService';
import { toast } from 'react-toastify';

export const fetchAllAccountCustomer = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllAccountsCusomer();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsCusomerSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const findAccountRequest = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findAccountById(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchFindPostsSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchSearchPostsCustomer = (searchName, status) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findCustomerByNameAndStatus(searchName, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsCusomerSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const createNewAccount = (createAccount) => {
    return async (dispatch) => {
        console.log("Bắt đầu thêm người dùng mới")
        // Bắt đầu đếm thời gian
        const startTime = Date.now();
        try {
            //Đếm thời gian loading
            const response = await postCreateNewAccount(createAccount);
            if (response.status === 200) {
                dispatch(fetchAllAccountCustomer());
                const endTime = Date.now();
                const elapsedTime = (endTime - startTime) / 1000; // tính bằng giây
                console.log("Kết thúc quá trình thêm người dùng mới với thời gian: ", elapsedTime)
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

            dispatch(fetchPostsError());
        }
    };
};
export const createNewEmployee = (employeeCreationRequest) => {
    return async (dispatch) => {
        console.log("Bắt đầu thêm người dùng mới")
        // Bắt đầu đếm thời gian
        const startTime = Date.now();
        try {
            //Đếm thời gian loading
            const response = await postCreateNewEmployee(employeeCreationRequest);
            if (response.status === 200) {
                dispatch(fetchAllAccountEmployee());
                const endTime = Date.now();
                const elapsedTime = (endTime - startTime) / 1000; // tính bằng giây
                console.log("Kết thúc quá trình thêm người dùng mới với thời gian: ", elapsedTime)
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

            dispatch(fetchPostsError());
        }
    };
};
export const updateAccountById = (idAccount, accountUD) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await updateAccount(idAccount, accountUD);
            if (response.status === 200) {
                dispatch(fetchAllAccountCustomer());
                dispatch(fetchAllAccountEmployee());
                toast.success("Cập nhật thông tin người dùng thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);

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

            dispatch(fetchPostsError());
        }
    };
};
export const updateEmployeeById = (idAccount, idAddress, employeeCreationRequest) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await updateEmplloyee(idAccount, idAddress, employeeCreationRequest);
            if (response.status === 200) {
                dispatch(fetchAllAccountCustomer());
                dispatch(fetchAllAccountEmployee());
                toast.success("Cập nhật thông tin người dùng thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);

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

            dispatch(fetchPostsError());
        }
    };
};
export const fetchAllAccountEmployee = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllAccountsEmployee();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsEmployeeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchSearchPostsEmployee = (searchName, status) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findEmployeeByNameAndStatus(searchName, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsEmployeeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const updateStatusAccountById = (idAccount, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusAccount(idAccount, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllAccountCustomer());
                dispatch(fetchAllAccountEmployee());
                toast.success("Cập nhật trạng tài khoản thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật tài khoản:", error);

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

            dispatch(fetchPostsError());
        }
    };
};
export const fetchPostsRequest = () => {
    return {
        type: Fetch_Posts_Account_Request
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
export const fetchFindPostsSuccess = (payload) => {
    return {
        type: Fetch_Find_Posts_Account_Success,
        payload
    }
}
export const fetchPostsError = () => {
    return {
        type: Fetch_Posts_Account_Error
    }
}