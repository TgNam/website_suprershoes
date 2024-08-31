import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/product'
});

const postCreateNewProduct = async (newProduct) => {
    return await apiClient.post('/create-product', newProduct);
};

export const findByStatusActiveFromProduct = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        // Nếu filters có giá trị và có thuộc tính status thì mới thêm vào params
        if (filters.status) {
            params.append('status', filters.status);
        }
  

        // Gửi yêu cầu GET đến API với các tham số đã được xây dựng
        const response = await apiClient.get(`/list-product?${params.toString()}`);
        return response;
    } catch (error) {
        toast.error(error.message);
    }
};


const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-product-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusProduct = (idProduct) => {
    return apiClient.put(`/update-status?id=${idProduct}`);
};
const deleteProduct = (idProduct) => {
    return apiClient.delete(`/delete-product?id=${idProduct}`);
};

export {  updateStatusProduct, postCreateNewProduct ,findByName,deleteProduct};
