import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/promotion'
});

export const postCreateNewPromotion = async (newPromotion) => {
    return await apiClient.post('/create', newPromotion);
};

export const updatePromotion = async (id, updatedPromotion) => {
    try {
        return await apiClient.put(`/update/${id}`, updatedPromotion);
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

export const deletePromotion = async (id) => {
    try {
        return await apiClient.delete(`/delete/${id}`);
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

export const fetchAllPromotions = async (filters, page, size) => {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.codePromotion) params.append('codePromotion', filters.codePromotion);
        params.append('page', page);
        params.append('size', size);

        const response = await apiClient.get(`/list-promotion?${params.toString()}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};

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