import { Fetch_Posts_Request, Fetch_Posts_Success, Fetch_Posts_Error, Fetch_Search_Posts_Request } from '../types/brandTypes';
import { findByStatusActiveFromBrand, findByName, updateStatusBrand, postCreateNewBrand } from '../../Service/ApiBrandService';
import { toast } from 'react-toastify';

export const fetchAllBrand = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromBrand();
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
export const fetchSearchBrand = (searchName) => {
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
export const createNewBrand = (createBrand) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await postCreateNewBrand(createBrand);
            if (response.status === 200) {
                dispatch(fetchAllBrand());
                toast.success("Thêm hãng mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm hãng:", error);

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
export const updateStatusBrandById = (idBrand, newStatus) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusBrand(idBrand, newStatus);
            if (response.status === 200) {
                dispatch(fetchAllBrand());
                toast.success("Cập nhật trạng hãng thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hãng:", error);

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