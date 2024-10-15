import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
});

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

// Fetch bill details and payment history
export const fetchBillDetailsAndPayments = async (codeBill, page) => {
    try {
        const [billSummaryResponse, billResponse, payBillResponse] = await Promise.all([
            apiClient.get('/bill/list-bill-summaries', { params: { codeBill } }),
            apiClient.get('/bill-detail/list-bill-details', { params: { codeBill, page, size: 10 } }), // This line
            apiClient.get('/pay-bill/list-pay-bills', { params: { codeBill } }),
        ]);

 

        return {
            billSummary: billSummaryResponse.data.content[0] || {},
            billDetails: billResponse.data.content || [],
            totalPages: billResponse.data.totalPages || 0,
            payBill: payBillResponse.data.content || [],
        };
    } catch (error) {
        console.error('Error in fetchBillDetailsAndPayments:', error);
        return handleError(error);
    }
};


// Update bill status and note
export const updateBillStatusAndNote = async (codeBill, status, note) => {
    try {
        const response = await apiClient.put(`bill/update-status-note/${codeBill}`, null, {
            params: { status, note },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Complete a bill
export const completeBill = async (codeBill) => {
    try {
        const response = await apiClient.put(`bill/update-status/${codeBill}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete a product from a bill
export const deleteProductFromBill = async (productCode, nameColor) => {
    try {
        const response = await apiClient.delete(`/bill-detail/delete-by-product-and-color`, {
            params: { productCode, nameColor } 
        });
        return response.data;
    } catch (error) {
        handleError(error); 
    }
};

