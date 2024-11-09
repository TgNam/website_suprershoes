import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/billDetailByEmployee'
});

const postCreateBillDetailByEmployee = async (codeBill, idProductDetail) => {
    const response = await apiClient.post(`/createBillDetailByEmployee?codeBill=${codeBill}`,idProductDetail)
    return response;
};
const findBillDetailByEmployeeByCodeBill = async (codeBill) => {
    try {
        const response = await apiClient.get(`detail?codeBill=${encodeURIComponent(codeBill)}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
export { postCreateBillDetailByEmployee, findBillDetailByEmployeeByCodeBill };
