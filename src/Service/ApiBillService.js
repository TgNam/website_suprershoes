import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance'; // Sử dụng authorizeAxiosInstance
import { toast } from 'react-toastify';


const handleError = (error) => {
    if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while processing the request');
    } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response received from the server');
    } else {
        console.error('General error:', error.message);
        throw new Error('An error occurred: ' + error.message);
    }
};

// New function to fetch bill statistics
export const fetchBillStatistics = async () => {
    const response = await authorizeAxiosInstance.get('/bill/statistics/completed');
    return response;
};

// Fetch all bills with filters
export const fetchBills = async (filters) => {
    try {
        const params = {
            ...filters,
            codeBill: filters.searchCodeBill,
            deliveryDate: filters.deliveryDate ? new Date(filters.deliveryDate).toISOString().split('.')[0] : null,
            receiveDate: filters.receiveDate ? new Date(filters.receiveDate).toISOString().split('.')[0] : null,
            sort: filters.sort || 'createdAt',
            sortDirection: filters.sortDirection || 'DESC',
            page: filters.page,
            size: filters.size,
        };
        const response = await authorizeAxiosInstance.get('/bill/list-bills', { params });
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Fetch a bill by status
export const fetchBillByStatus = async (status) => {
    try {
        const response = await authorizeAxiosInstance.get('/bill/list-bills', { params: { status } });
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Fetch bill by code
export const fetchBillByCode = async (codeBill) => {
    try {
        const response = await authorizeAxiosInstance.get(`/bill/detail/${codeBill}`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Update bill status and note
export const updateBillStatusAndNote = async (codeBill, status, note) => {
    try {
        const response = await authorizeAxiosInstance.put(`/bill/update-status-note/${codeBill}`, null, {
            params: { status, note },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Add a new bill
export const addNewBill = async (billData) => {
    try {
        const response = await authorizeAxiosInstance.post('/bill/add', billData);
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Update an existing bill by codeBill
export const updateBillByCode = async (codeBill, billData) => {
    try {
        const response = await authorizeAxiosInstance.put(`/bill/updateCodeBill/${codeBill}`, billData);
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Delete a bill by ID
export const deleteBillById = async (id) => {
    try {
        const response = await authorizeAxiosInstance.delete(`/bill/delete/${id}`);
        return response;
    } catch (error) {
        handleError(error);
    }
};
