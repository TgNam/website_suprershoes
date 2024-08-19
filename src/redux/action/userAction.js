import { Fetch_User_Request, Fetch_User_Success, Fetch_User_Error } from '../types/customerTypes';
import { getAllUsers } from '../../Service/ApiService';
import { toast } from 'react-toastify';

export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllUsers();
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
        type: Fetch_User_Request
    }
}

export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_User_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_User_Error
    }
}