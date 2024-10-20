import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/billDetailByEmployee'
});

const postCreateBillDetailByEmployee = async (codeBill,idProductDetail) => {
    const response = await apiClient.post(`/createBillDetailByEmployee?codeBill=${codeBill}&idProductDetail=${idProductDetail}`)
    return response;
};
export { postCreateBillDetailByEmployee };
