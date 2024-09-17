import { Find_Cart, Fetch_Cart_Success, Fetch_Cart_Error } from '../types/cartTypes';
import { findCart } from '../../Service/ApiCartService';
import { toast } from 'react-toastify';

export const findByCart = () => {
    return async (dispatch) => {
        dispatch(findCartFromAccount());
        try {
            const response = await findCart();
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
export const findCartFromAccount = () => {
    return {
        type: Find_Cart
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Cart_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Cart_Error
    }
}