import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

const postCreateNewProductDetail = async (newProductDetail) => {
    return await apiClient.post('/create-productDetail', newProductDetail);
};

const findByStatusActiveFromProductDetail = async () => {
    try {
        const response = await apiClient.get('/productDetail')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-productDetail-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusProductDetail = (idProductDetail) => {
    return apiClient.put(`/update-status?id=${idProductDetail}`);
};

export { findByStatusActiveFromProductDetail, updateStatusProductDetail, postCreateNewProductDetail ,findByName};
