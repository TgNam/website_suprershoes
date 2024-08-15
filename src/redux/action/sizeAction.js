import { Fetch_Size_Request, Fetch_Size_Success, Fetch_Size_Error } from './types';
import { findByStatusActiveFromSize } from '../../Service/ApiSizeService';
import { toast } from 'react-toastify';

export const fetchAllSize = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromSize();
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
        type: Fetch_Size_Request
    }
}

export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Size_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Size_Error
    }
}