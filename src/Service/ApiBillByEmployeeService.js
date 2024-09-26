import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/billByEmployee'
});
const findCodeBillByEmployee = async () => {
    try {
        const response = await apiClient.get(`/list-codeBill`)
        return response;
    } catch (error) {
        toast.error("Lỗi giỏ hàng")
    }

};
const postCreateNewBill = async () => {
    const response =await apiClient.post('/create-billByEmployee')
    return response;
};
export { findCodeBillByEmployee, postCreateNewBill };
