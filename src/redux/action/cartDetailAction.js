import { Find_Code_Cart_Detail, Find_List_Cart_Detail, Fetch_Cart_Detail_Success, Fetch_Cart_Detail_Error } from '../types/cartDetailTypes';
import { findCodeCart, findlistCactDetail } from '../../Service/ApiCartDetailService';
import { toast } from 'react-toastify';

export const findCodeCartDetailById = () => {
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
export const findCodeCartDetail = () => {
    return {
        type: Find_Code_Cart_Detail
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Cart_Detail_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Cart_Detail_Error
    }
}