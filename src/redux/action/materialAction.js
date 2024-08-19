import { Fetch_Material_Request, Fetch_Material_Success, Fetch_Material_Error,Fetch_Search_Material_Request } from '../types/materialTypes';
import { findByStatusActiveFromMaterial, findByName } from '../../Service/ApiMaterialService';
import { toast } from 'react-toastify';

export const fetchAllMaterial = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findByStatusActiveFromMaterial();
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
export const fetchSearchMaterial = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(FetchSearchMaterialRequest());
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
        type: Fetch_Material_Request
    }
}
export const FetchSearchMaterialRequest = () => {
    return {
        type: Fetch_Search_Material_Request
    }
}
export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Material_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Material_Error
    }
}