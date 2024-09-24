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
        if (error.response) {
            // Server responded with a status other than 200 range
            toast.error(`Error: ${error.response.data.message || 'Failed to create new bill'}`);
        } else if (error.request) {
            // No response was received from the server
            toast.error('No response from the server. Please try again.');
        } else {
            // Something else caused the error
            toast.error(`Error: ${error.message}`);
        }
        throw error; // Re-throw the error to be handled by the calling function
    }
};

const findByStatusActiveFromBill = async () => {
    try {
        const response = await apiClient.get('/list-bills');
        return response;
    } catch (error) {
        if (error.response) {
            toast.error(`Error: ${error.response.data.message || 'Failed to fetch bills'}`);
        } else if (error.request) {
            toast.error('No response from the server. Please try again.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        throw error;
    }
};

const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-bill-search?search=${searchName}`);
        return response;
    } catch (error) {
        if (error.response) {
            toast.error(`Error: ${error.response.data.message || 'Failed to search bill'}`);
        } else if (error.request) {
            toast.error('No response from the server. Please try again.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        throw error;
    }
};

const updateStatusBill = async (idBill) => {
    try {
        const response = await apiClient.put(`/update-status?id=${idBill}`);
        return response;
    } catch (error) {
        if (error.response) {
            toast.error(`Error: ${error.response.data.message || 'Failed to update bill status'}`);
        } else if (error.request) {
            toast.error('No response from the server. Please try again.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        throw error;
    }
};

export { findByStatusActiveFromBill, updateStatusBill, postCreateNewBill, findByName };
