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
            }
        } catch (error) {
            console.error("Lỗi hiển thị tài khoản:", error);
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
            }
        } catch (error) {
            console.error("Lỗi hiển thị tài khoản:", error);
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
            }
        } catch (error) {
            console.error("Lỗi hiển thị tài khoản:", error);
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
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);
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
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);
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
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
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
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
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
            }
        } catch (error) {
            console.error("Lỗi hiển thị tài khoản:", error);
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
            }
        } catch (error) {
            console.error("Lỗi hiển thị tài khoản:", error);
            dispatch(fetchPostsError())
        }

    }
}
export const updateStatusAccountById = (idAccount, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusAccount(idAccount, aBoolean);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật tài khoản:", error);
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