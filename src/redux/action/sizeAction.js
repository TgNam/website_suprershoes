import { Fetch_Size_Request, Fetch_Size_Success, Fetch_Size_Error,Fetch_Search_Size_Request } from '../types/sizeTypes';
import { findByStatusActiveFromSize, findByName,findAllSize } from '../../Service/ApiSizeService';
import { toast } from 'react-toastify';

export const fetchAllSize = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findAllSize();
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
export const fetchSizeByStatusActive = () => {
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
export const fetchSearchSize = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchSizeRequest());
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
        type: Fetch_Size_Request
    }
}
export const FetchSearchSizeRequest = () => {
    return {
        type: Fetch_Search_Size_Request
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