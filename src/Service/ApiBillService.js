import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/bill'
});

const postCreateNewBill = async (newBill) => {
    try {
        const response = await apiClient.post('/create-bill', newBill);
        return response;
    } catch (error) {
        toast.error(error.message);
        throw error; // Re-throw the error to be handled by the calling function
    }
};

const findByStatusActiveFromBill = async () => {
    try {
        const response = await apiClient.get('/list-bills');
        return response;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-bill-search?search=${searchName}`);
        return response;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

const updateStatusBill = async (idBill) => {
    try {
        const response = await apiClient.put(`/update-status?id=${idBill}`);
        return response;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

export { findByStatusActiveFromBill, updateStatusBill, postCreateNewBill, findByName };
