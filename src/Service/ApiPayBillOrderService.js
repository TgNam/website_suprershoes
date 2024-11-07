import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/pay-bill'
});

const postCreateNewPayBill = async (newPayBill) => {
    return await apiClient.post('/createPayBill', newPayBill);
};
const findAllPayBill = async (codeBill) => {
    try {
        const response = await apiClient.get(`/listPayBill?codeBill=${codeBill}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const deletePayBill = (idPayBill) => {
    return apiClient.delete(`/deletePayBill?id=${idPayBill}`);
};

export { deletePayBill, postCreateNewPayBill, findAllPayBill };
