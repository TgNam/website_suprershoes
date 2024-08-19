import { Fetch_Brand_Request, Fetch_Brand_Success, Fetch_Brand_Error, Fetch_Search_Brand_Request } from '../types/brandTypes';
import { findByStatusActiveFromBrand, findByName } from '../../Service/ApiBrandService';
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
        dispatch(FetchSearchBrandRequest());
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
        type: Fetch_Brand_Request
    }
}
export const FetchSearchBrandRequest = () => {
    return {
        type: Fetch_Search_Brand_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Brand_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Brand_Error
    }
}