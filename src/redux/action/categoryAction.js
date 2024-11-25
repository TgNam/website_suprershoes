import { Fetch_Posts_Category_Request, Fetch_Posts_Category_Success, Fetch_Posts_Category_Error } from '../types/categoryTypes';
import { findCategory, findByName, updateStatusCategory, postCreateNewCategory, findCategoryActive } from '../../Service/ApiCategoryService';
import { toast } from 'react-toastify';

export const fetchAllCategoryActive = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findCategoryActive();
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
export const fetchAllCategory = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findCategory();
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
export const fetchSearchCategory = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
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
export const createNewCategory = (createCategory) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await postCreateNewCategory(createCategory);
            if (response.status === 200) {
                dispatch(fetchAllCategory());
                toast.success("Thêm danh mục mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);

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
export const updateStatusCategoryById = (idCategory, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusCategory(idCategory, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllCategory());
                toast.success("Cập nhật trạng danh mục thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);

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
        type: Fetch_Posts_Category_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Posts_Category_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Posts_Category_Error
    }
}