import { Fetch_ProductDetail_Request, Fetch_ProductDetail_Success, Fetch_ProductDetail_Error, Fetch_Search_ProductDetail_Request } from '../types/productDetailTypes';
import { findByStatusActiveFromProductDetail, findByName} from '../../Service/ApiProductDetailService';
import { toast } from 'react-toastify';

export const fetchAllProductDetail = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromProductDetail();
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
export const fetchSearchProductDetail = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchProductDetailRequest());
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
export const fetchPostsRequest = () => {
    return {
        type: Fetch_ProductDetail_Request
    }
}
export const FetchSearchProductDetailRequest = () => {
    return {
        type: Fetch_Search_ProductDetail_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_ProductDetail_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_ProductDetail_Error
    }
}