import { 
    Fetch_Product_Request, 
    Fetch_Product_Success, 
    Fetch_Product_Error, 
    Fetch_Find_Product_Success 
} from '../types/productTypes';
import { 
    getAllProduct, 
    getFindSearch 
} from '../../Service/ApiProductService';
import { toast } from 'react-toastify';

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
export const FetchFindProductRequest = () => {
    return {
        type: Fetch_Find_Product_Success
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