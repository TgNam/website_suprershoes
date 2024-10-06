import {
    Fetch_Address_Request,
    Fetch_Search_Address_Success,
    Fetch_Address_Success,
    Fetch_Address_Error
} from '../types/addressTypes';
import { postCreateNewAddress, getAddressByidAccount, deleteAddress,findAddress, updateAddress, updateAddressType } from '../../Service/ApiAddressService';
import { toast } from 'react-toastify';

export const fetchAllAddress = (idAccount) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAddressByidAccount(idAccount);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            dispatch(fetchPostsError)
        }

    }
}
export const findAddressByIdAddress = (idAddress) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findAddress(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchSearchAddressSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError);
            }
        } catch (error) {
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
export const createNewAddress = (newAddress) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewAddress(newAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Thêm địa chỉ mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi địa chỉ mới:", error);

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
export const updateAddressFromAccount = (addressId, Address) => {
    return async (dispatch) => {
        try {
            const response = await updateAddress(addressId, Address);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Cập nhật địa chỉ thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ:", error);

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
export const updateAddressTypeByIdAddress = (idAddress) => {
    return async (dispatch) => {
        try {
            const response = await updateAddressType(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Cập nhật địa chỉ mặc định thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ mặc định:", error);

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
export const deleteByIdAddress = (idAddress) => {
    return async (dispatch) => {
        try {
            const response = await deleteAddress(idAddress);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchAllAddress(data.idAccount));
                toast.success("Xóa địa chỉ thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa địa chỉ:", error);

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
export const fetchPostsRequest = () => {
    return {
        type: Fetch_Address_Request
    }
}
export const FetchSearchAddressSuccess = (payload) => {
    return {
        type: Fetch_Search_Address_Success,
        payload
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Address_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Address_Error
    }
}