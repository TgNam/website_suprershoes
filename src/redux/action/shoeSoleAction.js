import { Fetch_Posts_ShoeSole_Request, Fetch_Posts_ShoeSole_Success, Fetch_Posts_ShoeSole_Error } from '../types/shoeSoleTypes';
import { findByStatusActiveFromShoeSole, findByName,postCreateNewShoeSole,updateStatusShoeSole } from '../../Service/ApiShoeSoleService';
import { toast } from 'react-toastify';

export const fetchAllShoeSole = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsShoeSoleRequest());
        try {
            const response = await findByStatusActiveFromShoeSole();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsShoeSoleSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsShoeSoleError);
            }
        } catch (error) {
            dispatch(fetchPostsShoeSoleError())
        }

    }
}
export const fetchSearchShoeSole = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsShoeSoleRequest());
        try {
            const response = await findByName(searchName);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsShoeSoleSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsShoeSoleError);
            }
        } catch (error) {
            dispatch(fetchPostsShoeSoleError())
        }

    }
}
export const createNewShoeSole = (createShoeSole) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await postCreateNewShoeSole(createShoeSole);
            if (response.status === 200) {
                dispatch(fetchAllShoeSole());
                toast.success("Thêm loại đế giày mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm loại đế giày mới:", error);

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
            dispatch(fetchPostsShoeSoleError());
        }
    };
};
export const updateStatusShoeSoleById = (idSize, newStatus) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusShoeSole(idSize, newStatus);
            if (response.status === 200) {
                dispatch(fetchAllShoeSole());
                toast.success("Cập nhật trạng loại đế giày thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật loại đế giày:", error);

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

            dispatch(fetchPostsShoeSoleError());
        }
    };
};
export const fetchPostsShoeSoleRequest = () => {
    return {
        type: Fetch_Posts_ShoeSole_Request
    }
}
export const fetchPostsShoeSoleSuccess = (payload) => {
    return {
        type: Fetch_Posts_ShoeSole_Success,
        payload
    }
}

export const fetchPostsShoeSoleError = () => {
    return {
        type: Fetch_Posts_ShoeSole_Error
    }
}