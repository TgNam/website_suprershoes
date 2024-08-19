import { Fetch_Category_Request, Fetch_Category_Success, Fetch_Category_Error,Fetch_Search_Category_Request } from '../types/categoryTypes';
import { findByStatusActiveFromCategory, findByName } from '../../Service/ApiCategoryService';
import { toast } from 'react-toastify';

export const fetchAllCategory = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromCategory();
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
        dispatch(FetchSearchCategoryRequest());
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
        type: Fetch_Category_Request
    }
}
export const FetchSearchCategoryRequest = () => {
    return {
        type: Fetch_Search_Category_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Category_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Category_Error
    }
}