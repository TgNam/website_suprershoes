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
export const updateStatusPromotion = (idPromotion,aBoolean) => {
    return apiClient.put(`/updateStatus?id=${idPromotion}&&aBoolean=${aBoolean}`);
};