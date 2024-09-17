import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/cart'
});
const findCart = async () => {
    try {
        const response = await apiClient.get(`/find`)
        return response;
    } catch (error) {
        toast.error("Lỗi không tìm thấy giỏ hàng")
    }

};

export { findCart };
