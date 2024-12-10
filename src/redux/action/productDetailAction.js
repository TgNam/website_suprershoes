import {
    Fetch_Posts_Product_Request,
    Fetch_Posts_Product_Success,
    Fetch_Posts_ProductPromotion_Success,
    Fetch_Posts_Product_Error,
    Fetch_Posts_Find_Product_Detail_Success,
    Fetch_PriceRange_Promotion_Success,
    Fetch_PriceRange_PromotionByQuang_Success,
} from '../types/productDetailTypes';

import {
    getAllProductDetailByIdProduct,
    getFilterProductDetailByIdProduct,
    getAllProductPromotion,
    getFilterProductPromotion,
    getAllPriceRangePromotion,
    findProductPromotionByIdProcuctAndIdColorAndIdSize,
    getAllPriceRangePromotionByQuang,
    updateStatusProductDetail,
    getProductDetailActiveByIdProduct
} from '../../Service/ApiProductDetailService';

import { toast } from 'react-toastify';

export const updateStatusProductDetailById = (idProduct, idProductDetail, aBoolean) => {
    return async (dispatch) => {
        try {
            if (!idProduct) {
                toast.error("Không được để trống id!");
                return;
            }
            const response = await updateStatusProductDetail(idProductDetail, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllProductDetail(idProduct));
                toast.success("Cập nhật sản phẩm thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);

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
export const fetchFindProductDetailByIdProduct = (idProduct, idColor, idSize) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findProductPromotionByIdProcuctAndIdColorAndIdSize(idProduct, idColor, idSize);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsFindProductDetailSuccess(data));
            } else {
                const errorMessage = response.data.mess || 'Error';
                toast.error(errorMessage);
                dispatch(fetchPostsError());
            }
        } catch (error) {
            console.error("Sản phẩm đã hết hàng:", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                } else if (statusCode === 409) {
                    const { mess } = errorData;
                    dispatch(fetchPostsFindProductDetailSuccess());
                    toast.error(mess || "Sản phẩm hết hàng!");
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
    }
}


export const fetchPriceRangePromotionByQuang = (nameProduct, idColor, idSize, idBrand, idCategory, minPrice, maxPrice, gender) => {
    return async (dispatch) => {
        try {
            const response = await getAllPriceRangePromotionByQuang(nameProduct, idColor, idSize, idBrand, idCategory, minPrice, maxPrice, gender);
            // console.log("API response1213:", response);
            if (response.status === 200) {
                dispatch(fetchPriceRangePromotionByQuangSuccess(response));
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
};


export const fetchFilterProductDetailByIdProduct = (listIdProducts, search, nameSize, nameColor, priceRange) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getFilterProductDetailByIdProduct(listIdProducts, search, nameSize, nameColor, priceRange);
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
export const fetchFilterProductPromotion = (search, nameSize, nameColor, priceRange) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getFilterProductPromotion(search, nameSize, nameColor, priceRange);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsProductPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchAllProductDetail = (listIdProducts) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllProductDetailByIdProduct(listIdProducts);

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
export const fetchProductDetailActive = (idProducts) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getProductDetailActiveByIdProduct(idProducts);

            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsProductPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchAllProductPromotion = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllProductPromotion();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsProductPromotionSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError());
            }
        } catch (error) {
            dispatch(fetchPostsError())
        }

    }
}
export const fetchAllPriceRangePromotion = () => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllPriceRangePromotion();
            if (response && response.status === 200) {
                dispatch(fetchPriceRangePromotionSuccess(response.data));
            } else {
                toast.error('Error fetching price range promotions');
                dispatch(fetchPostsError('Unexpected response status'));
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching price range promotions');
            dispatch(fetchPostsError(error.message));
        }
    };
};

export const fetchPostsRequest = () => {
    return {
        type: Fetch_Posts_Product_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Posts_Product_Success,
        payload
    }
}
export const fetchPostsFindProductDetailSuccess = (payload) => {
    return {
        type: Fetch_Posts_Find_Product_Detail_Success,
        payload
    }
}
export const fetchPostsProductPromotionSuccess = (payload) => {
    return {
        type: Fetch_Posts_ProductPromotion_Success,
        payload
    }
}
export const fetchPostsError = () => {
    return {
        type: Fetch_Posts_Product_Error
    }


}
export const fetchPriceRangePromotionSuccess = (payload) => ({ type: Fetch_PriceRange_Promotion_Success, payload });

const fetchPriceRangePromotionByQuangSuccess = (payload) => ({
    type: Fetch_PriceRange_PromotionByQuang_Success,
    payload,
});

