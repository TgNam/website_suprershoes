import { Fetch_Color_Request, Fetch_Color_Success, Fetch_Color_Error, Fetch_Search_Color_Request } from '../types/colorTypes';
import { findByStatusActiveFromColor, findByName } from '../../Service/ApiColorService';
import { toast } from 'react-toastify';

export const fetchAllColor = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromColor();
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
export const fetchSearchColor = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchColorRequest());
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
        type: Fetch_Color_Request
    }
}
export const FetchSearchColorRequest = () => {
    return {
        type: Fetch_Search_Color_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Color_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Color_Error
    }
}