import { Fetch_ShoeSole_Request, Fetch_ShoeSole_Success, Fetch_ShoeSole_Error, Fetch_Search_ShoeSole_Request } from '../types/shoeSoleTypes';
import { findByStatusActiveFromShoeSole, findByName } from '../../Service/ApiShoeSoleService';
import { toast } from 'react-toastify';

export const fetchAllShoeSole = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromShoeSole();
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
export const fetchSearchShoeSole = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchShoeSoleRequest());
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
        type: Fetch_ShoeSole_Request
    }
}
export const FetchSearchShoeSoleRequest = () => {
    return {
        type: Fetch_Search_ShoeSole_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_ShoeSole_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_ShoeSole_Error
    }
}