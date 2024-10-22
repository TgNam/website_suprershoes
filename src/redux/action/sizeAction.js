import { Fetch_Posts_Size_Request, Fetch_Posts_Size_Success, Fetch_Posts_Size_Error } from '../types/sizeTypes';
import { findByStatusActiveFromSize, findByName, findAllSize, postCreateNewSize, updateStatusSize } from '../../Service/ApiSizeService';
import { toast } from 'react-toastify';

export const fetchAllSize = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsSizeRequest());
        try {
            const response = await findAllSize();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSizeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsSizeError);
            }
        } catch (error) {
            dispatch(fetchPostsSizeError)
        }

    }
}
export const fetchSizeByStatusActive = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsSizeRequest());
        try {
            const response = await findByStatusActiveFromSize();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSizeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsSizeError);
            }
        } catch (error) {
            dispatch(fetchPostsSizeError)
        }

    }
}
export const fetchSearchSize = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsSizeRequest());
        try {
            const response = await findByName(searchName);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSizeSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsSizeError);
            }
        } catch (error) {
            dispatch(fetchPostsSizeError)
        }

    }
}
export const createNewSize = (createSize) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewSize(createSize);
            if (response.status === 200) {
                dispatch(fetchAllSize());
                toast.success("Thêm kích cỡ mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm kích cỡ:", error);

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
            dispatch(fetchPostsSizeError());
        }
    };
};
export const updateStatusSizeById = (idSize, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusSize(idSize, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllSize());
                toast.success("Cập nhật trạng kích cỡ thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật kích cỡ:", error);

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

            dispatch(fetchPostsSizeError());
        }
    };
};

export const fetchPostsSizeRequest = () => {
    return {
        type: Fetch_Posts_Size_Request
    }
}
export const fetchPostsSizeSuccess = (payload) => {
    return {
        type: Fetch_Posts_Size_Success,
        payload
    }
}

export const fetchPostsSizeError = () => {
    return {
        type: Fetch_Posts_Size_Error
    }
}