import { Fetch_Posts_Product_Request, Fetch_Posts_Product_Success,Fetch_Posts_ProductPromotion_Success, Fetch_Posts_Product_Error } from '../types/productDetailTypes';
import { getAllProductDetailByIdProduct, getFilterProductDetailByIdProduct,getAllProductPromotion,getFilterProductPromotion } from '../../Service/ApiProductDetailService';
import { toast } from 'react-toastify';

// export const fetchAllProductDetail = () => {
//     return async (dispatch, getState) => {
//         dispatch(fetchPostsRequest());
//         try {
//             const response = await findByStatusActiveFromProductDetail();
//             if (response.status === 200) {
//                 const data = response.data;
//                 dispatch(fetchPostsSuccess(data))
//             } else {
//                 toast.error('Error')
//                 dispatch(fetchPostsError);
//             }
//         } catch (error) {
//             dispatch(fetchPostsError)
//         }

//     }
// }
// export const fetchSearchProductDetail = (searchName) => {
//     return async (dispatch, getState) => {
//         dispatch(FetchSearchProductDetailRequest());
//         try {
//             const response = await findByName(searchName);
//             if (response.status === 200) {
//                 const data = response.data;
//                 dispatch(fetchPostsSuccess(data))
//             } else {
//                 toast.error('Error')
//                 dispatch(fetchPostsError);
//             }
//         } catch (error) {
//             dispatch(fetchPostsError)
//         }

//     }
// }
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
export const fetchFilterProductPromotion = ( search, nameSize, nameColor, priceRange) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getFilterProductPromotion( search, nameSize, nameColor, priceRange);
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