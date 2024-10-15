import {
    Fetch_Posts_Request,
    Fetch_Posts_Success,
    Fetch_Posts_Error
} from '../types/promotionTypes';
import {
    getAllPromotions,
    listSearchPromotion,
    postCreatePromotion,
} from '../../Service/ApiPromotionService';
import { toast } from 'react-toastify';

export const fetchAllPromotion = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllPromotions();
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
export const fetchSearchPostsCusomer = (search, status) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await listSearchPromotion(search, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
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

            dispatch(fetchPostsError());
        }
    };
};

export const fetchPostsRequest = () => {
    return {
        type: Fetch_Posts_Request
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