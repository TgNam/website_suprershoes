import {
    Fetch_Promotion_Request,
    Fetch_Promotion_Success,
    Fetch_Promotion_Error
} from '../types/promotionTypes';
import {
    fetchAllPromotions,
    postCreateNewPromotion,
    updatePromotion,
    deletePromotion
} from '../../Service/ApiPromotionService';

export const fetchAllPromotionAction = (filters = {}, page = 0, size = 10) => {
    return async (dispatch) => {
        dispatch({ type: Fetch_Promotion_Request });
        try {
            const response = await fetchAllPromotions(filters, page, size);
            if (response.status === 200) {
                dispatch({
                    type: Fetch_Promotion_Success,
                    payload: response.data.content,
                    totalElements: response.data.totalElements,
                    totalPages: response.data.totalPages,
                });
            } else {
                dispatch({ type: Fetch_Promotion_Error });
            }
        } catch (error) {
            dispatch({ type: Fetch_Promotion_Error });
        }
    };
};

export const createPromotionAction = (newPromotion) => {
    return async (dispatch) => {
        try {
            await postCreateNewPromotion(newPromotion);
            dispatch(fetchAllPromotionAction());
        } catch (error) {
            console.error(error);
        }
    };
};

export const updatePromotionAction = (id, updatedPromotion) => {
    return async (dispatch) => {
        try {
            await updatePromotion(id, updatedPromotion);
            dispatch(fetchAllPromotionAction());
        } catch (error) {
            console.error(error);
        }
    };
};

export const deletePromotionAction = (id) => {
    return async (dispatch) => {
        try {
            await deletePromotion(id);
            dispatch(fetchAllPromotionAction());
        } catch (error) {
            console.error(error);
        }
    };
};
