import { Fetch_Product_Request, Fetch_Product_Success, Fetch_Product_Error, Fetch_Search_Product_Request } from '../types/productTypes';
import { findByStatusActiveFromProduct, findByName } from '../../Service/ApiProductService';
import { toast } from 'react-toastify';

export const fetchAllProduct = (filters = {}) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromProduct(filters);
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
export const fetchSearchProduct = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchProductRequest());
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
        type: Fetch_Product_Request
    }
}
export const FetchSearchProductRequest = () => {
    return {
        type: Fetch_Search_Product_Request
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