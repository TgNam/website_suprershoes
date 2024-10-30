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
const findBillResponseByCodeBill = async (codeBill) => {
    try {
        const response = await apiClient.get(`/findBillRequestBycodeBill?codeBill=${codeBill}`)
        return response;
    } catch (error) {
        toast.error("Lỗi giỏ hàng")
    }

};
const postCreateNewBill = async (displayBills) => {
    const response = await apiClient.post('/create-billByEmployee', displayBills)
    return response;
};
const sortDisplayBillsByEmployee = async (displayBills, selectills) => {
    try {
        const response = await apiClient.get(`/sortDisplayBills?displayBills=${displayBills}&&selectills=${selectills}`)
        return response;
    } catch (error) {
        toast.error("Lỗi giỏ hàng")
    }

};
export { findCodeBillByEmployee, postCreateNewBill, sortDisplayBillsByEmployee, findBillResponseByCodeBill };
