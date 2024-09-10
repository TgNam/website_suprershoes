import { Fetch_ProductFavorite_Request, Fetch_ProductFavorite_Success, Fetch_ProductFavorite_Error, Fetch_Search_ProductFavorite_Request } from '../types/productFavoriteTypes';
import { findByStatusActiveFromProductFavorite, findByName } from '../../Service/ApiProductFavoriteService';
import { toast } from 'react-toastify';

export const fetchAllProductFavorite = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromProductFavorite();
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
export const fetchSearchProductFavorite = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchProductFavoriteRequest());
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
        type: Fetch_ProductFavorite_Request
    }
}
export const FetchSearchProductFavoriteRequest = () => {
    return {
        type: Fetch_Search_ProductFavorite_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_ProductFavorite_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_ProductFavorite_Error
    }
}