import {
    Fetch_Posts_Promotion_Request,
    Fetch_Posts_Promotion_Success,
    Fetch_Posts_Promotion_And_ProductPromotion_Success,
    Fetch_Posts_Promotion_Error
} from '../types/promotionTypes';
import {
    getAllPromotions,
    listSearchPromotion,
    postCreatePromotion,
    findPromotionAndProductPromotion,
    updateStatusPromotion,
    findSearchPromotionAndProductPromotion,
    updatePromotion
} from '../../Service/ApiPromotionService';
import { toast } from 'react-toastify';

export const fetchAllPromotion = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsPromotionRequest());
        try {
            const response = await getAllPromotions();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsPromotionError);
            }
        } catch (error) {
            dispatch(fetchPostsPromotionError)
        }

    }
}
export const fetchPromotionAndProductPromotion = (idPromotion) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsPromotionRequest());
        try {
            const response = await findPromotionAndProductPromotion(idPromotion);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsPromotionAndProductPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsPromotionError());
            }
        } catch (error) {
            dispatch(fetchPostsPromotionError())
        }

    }
}
export const fetchSearchPromotionAndProductPromotion = (idPromotion, listIdProducts, search, nameSize, nameColor, priceRange) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsPromotionRequest());
        try {
            const response = await findSearchPromotionAndProductPromotion(idPromotion, listIdProducts, search, nameSize, nameColor, priceRange);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsPromotionAndProductPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsPromotionError);
            }
        } catch (error) {
            dispatch(fetchPostsPromotionError)
        }

    }
}
export const fetchSearchPosts = (search, status) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsPromotionRequest());
        try {
            const response = await listSearchPromotion(search, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsPromotionError());
            }
        } catch (error) {
            dispatch(fetchPostsPromotionError())
        }

    }
}
export const createNewPromotion = (promotionCreationRequest) => {
    return async (dispatch) => {
        try {
            const response = await postCreatePromotion(promotionCreationRequest);
            if (response.status === 200) {
                dispatch(fetchAllPromotion());
                toast.success("Thêm khuyến mãi thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm khuyến mãi:", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    if (Array.isArray(errorData)) {
                        errorData.forEach(err => {
                            toast.error(err);
                        });
                    } else {
                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                    }
                } else {
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }

            dispatch(fetchPostsPromotionError());
        }
    };
};
export const postsUpdatePromotion = (promotionUpdatesRequest) => {
    return async (dispatch) => {
        try {
            const response = await updatePromotion(promotionUpdatesRequest);
            if (response.status === 200) {
                dispatch(fetchAllPromotion());
                toast.success("Cập nhật khuyến mãi thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật khuyến mãi:", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    if (Array.isArray(errorData)) {
                        errorData.forEach(err => {
                            toast.error(err);
                        });
                    } else {
                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                    }
                } else {
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }

            dispatch(fetchPostsPromotionError());
        }
    };
};
export const updateStatusPromotionById = (idPromotion, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusPromotion(idPromotion, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllPromotion());
                toast.success("Cập nhật trạng đợt giảm giá thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật đợt giảm giá:", error);

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

            dispatch(fetchPostsPromotionError());
        }
    };
};
export const fetchPostsPromotionRequest = () => {
    return {
        type: Fetch_Posts_Promotion_Request
    }
}
export const fetchPostsPromotionSuccess = (payload) => {
    return {
        type: Fetch_Posts_Promotion_Success,
        payload
    }
}
export const fetchPostsPromotionAndProductPromotionSuccess = (payload) => {
    return {
        type: Fetch_Posts_Promotion_And_ProductPromotion_Success,
        payload
    }
}
export const fetchPostsPromotionError = () => {
    return {
        type: Fetch_Posts_Promotion_Error
    }
}