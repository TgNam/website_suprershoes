import { Fetch_Account_Request, Fetch_Account_Success, Fetch_Account_Error } from '../types/AccountTypes';
import { getAllAccounts } from '../../Service/ApiAccountService';
import { toast } from 'react-toastify';

export const fetchAllAccount = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getAllAccounts();
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
        type: Fetch_Account_Request
    }
}

export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Account_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Account_Error
    }
}