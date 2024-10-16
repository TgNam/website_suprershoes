import { Fetch_Posts_Request, Fetch_Posts_Success, Fetch_Posts_Error, Fetch_Search_Posts_Request } from '../types/shoeSoleTypes';
import { findByStatusActiveFromShoeSole, findByName,postCreateNewShoeSole,updateStatusShoeSole } from '../../Service/ApiShoeSoleService';
import { toast } from 'react-toastify';

export const fetchAllShoeSole = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromShoeSole();
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
export const fetchSearchShoeSole = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchPostsRequest());
        try {
            const response = await findByName(searchName);
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
            dispatch(fetchPostsError());
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

            dispatch(fetchPostsError());
        }
    };
};
export const fetchPostsRequest = () => {
    return {
        type: Fetch_Posts_Request
    }
}
export const FetchSearchPostsRequest = () => {
    return {
        type: Fetch_Search_Posts_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Posts_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Posts_Error
    }
}