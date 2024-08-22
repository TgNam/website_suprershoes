import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

const postCreateNewProduct = async (newProduct) => {
    return await apiClient.post('/create-product', newProduct);
};

const findByStatusActiveFromProduct = async () => {
    try {
        const response = await apiClient.get('/product')
        return response;
    } catch (error) {
        toast.error(error.message)
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

export { findByStatusActiveFromProduct, updateStatusProduct, postCreateNewProduct ,findByName,deleteProduct};
