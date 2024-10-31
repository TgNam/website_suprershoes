import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/promotion'
});
export const getAllPromotions = async () => {
    try {
        const response = await apiClient.get(`/listPromotion`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};
export const findPromotionAndProductPromotion = async (idPromotion) => {
    try {
        const response = await apiClient.get(`/getPromotionDetailResponse?idPromotion=${idPromotion}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};
export const findSearchPromotionAndProductPromotion = async (idPromotion, search, nameSize, nameColor, priceRange) => {
    try {
        const response = await apiClient.get(`/getSearchPromotionDetailResponse?idPromotion=${idPromotion}&search=${search}&nameSize=${nameSize}&nameColor=${nameColor}&priceRange=${priceRange}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};
export const listSearchPromotion = async (search, status) => {
    try {
        const response = await apiClient.get(`/listSearchPromotion?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};
export const postCreatePromotion = async (promotionCreationRequest) => {
    return await apiClient.post('/createPromotion', promotionCreationRequest);
};
export const updatePromotion = async (promotionUpdatesRequest) => {
    return await apiClient.put('/updatePromotion', promotionUpdatesRequest);
};
export const updateStatusPromotion = async (idPromotion, aBoolean) => {
    return await apiClient.put(`/updateStatus?id=${idPromotion}&&aBoolean=${aBoolean}`);
};