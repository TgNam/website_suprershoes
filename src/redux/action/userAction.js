import { Fetch_User_Request, Fetch_User_Success, Fetch_User_Error } from './types';
import { getAllUsers } from '../../Service/ApiService';

export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllUsers();
            const data = response.data.DT;
            dispatch(fetchPostsSuccess(data))
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