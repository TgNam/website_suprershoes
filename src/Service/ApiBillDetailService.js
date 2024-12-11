import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance'; // Sử dụng authorizeAxiosInstance thay vì apiClient

const handleError = (error) => {
    if (error.response) {
        // console.error('Error response:', error.response);
        throw new Error(error.response.data.message || 'An error occurred while processing the request');
    } else if (error.request) {
        // console.error('Error request:', error.request);
        throw new Error('No response received from the server');
    } else {
        // console.error('General error:', error.message);
        throw new Error('An error occurred: ' + error.message);
    }
};

// Fetch bill details and payment history
export const fetchBillDetailsAndPayments = async (codeBill, page) => {
    try {
        const [
            billSummaryResponse,
            billResponse,
            payBillResponse,
            billHistoryResponse
        ] = await Promise.all([
            authorizeAxiosInstance.get('/bill/list-bill-summaries', { params: { codeBill } }),
            authorizeAxiosInstance.get('/bill-detail/list-bill-details', { params: { codeBill, page, size: 10 } }),
            authorizeAxiosInstance.get('/pay-bill/list-pay-bills', { params: { codeBill } }),
            authorizeAxiosInstance.get(`/bill-history/viewHistory/${codeBill}`)
        ]);

        return {
            billSummary: billSummaryResponse.data.content?.[0] || {},
            billDetails: billResponse.data.content || [],
            totalPages: billResponse.data.totalPages || 0,
            payBill: payBillResponse.data.content || [],
            billHistory: billHistoryResponse.data.DT || []
        };
    } catch (error) {
        console.error('Error in fetchBillDetailsAndPayments:', error);
        return handleError(error);
    }
};

// Update bill status and note
export const updateBillStatusAndNote = async (codeBill, status, note) => {
    try {
        const response = await authorizeAxiosInstance.put(`/bill/update-status-note/${codeBill}`, null, {
            params: { status, note },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updatePaymentByQUang = async (codeBill, status) => {
    try {
        const response = await authorizeAxiosInstance.put(`/pay-bill/update-pay-bill/${codeBill}`, null, {
            params: { status },
        });
        return response.data;
    } catch (error) {
        // handleError(error);
    }
};

export const createHistory = async (note, createdAt, billId, accountId, status) => {
    try {
        const response = await authorizeAxiosInstance.post(`/bill-history/add`, {
            note,
            createdAt,
            billId,
            accountId,
            status,
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error; // Re-throwing for additional handling if needed
    }
};


// Complete a bill
export const completeBill = async (codeBill) => {
    try {
        const response = await authorizeAxiosInstance.put(`/bill/update-status/${codeBill}`);
        return response.data;
    } catch (error) {
        handleError('Sản phẩm trong giỏ hàng đã hết');
    }
};

// Fetch statistics of products
export const fetchStatisticsProduct = async () => {
    try {
        const response = await authorizeAxiosInstance.get(`/bill-detail/statisticsProduct`);
        console.log('API Response:', response); // Log the full response

        // Gộp dữ liệu dựa trên id
        const aggregatedData = response.data.reduce((acc, current) => {
            const existingItem = acc.find(item => item.idProduct === current.idProduct);
            if (existingItem) {
                // Cộng dồn quantity và priceDiscount
                existingItem.quantity += current.quantity;
                existingItem.priceDiscount += current.priceDiscount;
                existingItem.revenue += current.revenue;
            } else {
                // Thêm mục mới nếu chưa tồn tại
                acc.push({ ...current });
            }
            return acc;
        }, []);

        return aggregatedData; // Trả về dữ liệu đã cộng dồn
    } catch (error) {
        handleError(error);
    }
};


