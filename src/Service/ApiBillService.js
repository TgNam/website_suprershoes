import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080/bill',
    timeout: 5000,
});

const handleError = (error) => {
    if (error.response) {
        console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while fetching the bills');
    } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response received from the server');
    } else {
        console.error('General error:', error.message);
        throw new Error('An error occurred: ' + error.message);
    }
};

export const fetchBills = async (filters) => {
    try {
        const params = {
            ...filters,
            codeBill: filters.searchCodeBill,
            deliveryDate: filters.deliveryDate ? new Date(filters.deliveryDate).toISOString().split('.')[0] : null,
            receiveDate: filters.receiveDate ? new Date(filters.receiveDate).toISOString().split('.')[0] : null,
            sort: filters.sort || 'createdAt',
            sortDirection: filters.sortDirection || 'DESC',
            page: filters.page, // Pass the current page
            size: filters.size  // Pass the page size (number of items per page)
        };

        const response = await apiClient.get('/list-bills', { params });
        return response;
    } catch (error) {
        handleError(error);
    }
};



export const fetchBillByStatus = async (status) => {
    try {
        const response = await apiClient.get(`/list-bills`, {
            params: { status }
        });
        return response; 
    } catch (error) {
        handleError(error);
    }
};


export const fetchBillByCode = async (codeBill) => {
    try {
        const response = await apiClient.get(`/detail/${codeBill}`);
        return response;
    } catch (error) {
        handleError(error);
    }
};


export const updateBillStatusAndNote = async (codeBill, status, note) => {
    try {
        const response = await apiClient.put(`/update-status-note/${codeBill}`, null, {
            params: { status, note },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};


export const addNewBill = async (billData) => {
    try {
        const response = await apiClient.post('/add', billData);
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Update an existing bill by its codeBill
export const updateBillByCode = async (codeBill, billData) => {
    try {
        const response = await apiClient.put(`/updateCodeBill/${codeBill}`, billData);
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Delete a bill by its ID
export const deleteBillById = async (id) => {
    try {
        const response = await apiClient.delete(`/delete/${id}`);
        return response;
    } catch (error) {
        handleError(error);
    }
};
