import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/cart-detail'
});
const findCodeCart = async (id) => {
    try {
        const response = await apiClient.get(`/codeCart?id=${id}`)
        return response;
    } catch (error) {
        toast.error("Lỗi mã giỏ hàng")
    }

};
const findlistCactDetail = async () => {
    try {
        const response = await apiClient.get(`/listCactDetail`)
        return response;
    } catch (error) {
        toast.error("Lỗi giỏ hàng chi tiết")
    }

};
const deleteById = (id) => {
    return apiClient.delete(`/deleteById?id=${id}`);
};
export { findCart };
