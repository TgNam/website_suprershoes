import {
    Fetch_Product_Request,
    Fetch_Product_Success,
    Fetch_Product_Error,
    Fetch_Find_Product_Success
} from '../types/productTypes';
import {
    postCreateNewProduct,
    getAllProduct,
    getFindSearch,
    updateStatusProduct,
    findProductPriceRangePromotion,
    findProductProductDetailResponse,
    filterProductProductDetailResponse,
    findProductResponseById,
    putUpdateProduct
} from '../../Service/ApiProductService';
import { toast } from 'react-toastify';

export const updateStatusProductById = (idProduct, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusProduct(idProduct, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllProductProductDetail());
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
export const findProductByIdProduct = (idProduct) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findProductResponseById(idProduct);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindProductRequest(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const fetchAllProductProductDetail = () => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findProductProductDetailResponse();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const fetchfilterProductProductDetail = (search, idCategory, idBrand, status) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await filterProductProductDetailResponse(search, idCategory, idBrand, status);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const createNewNewProduct = (newProduct) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewProduct(newProduct);
            if (response.status === 200) {
                toast.success("Thêm sản phẩm mới thành công!");
                return true; // Thành công
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);

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
                    // Xử lý lỗi email đã tồn tại (409 Conflict)
                    const { mess } = errorData;
                    toast.error(mess || "Lỗi khi thêm sản phẩm vào hệ thống.");
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
            return false; // Thất bại
        }
    };
};
export const updateProduct = (updateProduct) => {
    return async (dispatch) => {
        try {
            const response = await putUpdateProduct(updateProduct);
            if (response.status === 200) {
                toast.success("Cập nhật sản phẩm thành công!");
                return true; // Thành công
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
                    // Xử lý lỗi email đã tồn tại (409 Conflict)
                    const { mess } = errorData;
                    toast.error(mess || "Lỗi khi thêm sản phẩm vào hệ thống.");
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
            return false; // Thất bại
        }
    };
};
export const findProduct = (idProduct) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findProductPriceRangePromotion(idProduct);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindProductRequest(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const fetchAllProduct = () => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllProduct();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const fetchSearchProduct = (search) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getFindSearch(search);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}
export const fetchPostsRequest = () => {
    return {
        type: Fetch_Product_Request
    }
}
export const FetchFindProductRequest = (payload) => {
    return {
        type: Fetch_Find_Product_Success,
        payload
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Product_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Product_Error
    }
}