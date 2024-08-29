import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/voucher'
});

export const postCreateNewVoucher = async (newVoucher) => {
    return await apiClient.post('/create', newVoucher);
};

export const updateVoucher = async (id, updatedVoucher) => {
    return await apiClient.put(`/update/${id}`, updatedVoucher);
};

export const deleteVoucher = async (id) => {
    return await apiClient.delete(`/delete/${id}`);
};

export const fetchAllVouchers = async (filters, page, size) => {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.codeVoucher) params.append('codeVoucher', filters.codeVoucher);
        params.append('page', page);
        params.append('size', size);

        const response = await apiClient.get(`/list-voucher?${params.toString()}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};
