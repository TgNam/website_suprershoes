import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/category'
});

const postCreateNewCategory = async (newCategory) => {
    return await apiClient.post('/create-category', newCategory);
};

const findByStatusActiveFromCategory = async () => {
    try {
        const response = await apiClient.get('/list-category')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-category-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusCategory = (idCategory) => {
    return apiClient.put(`/update-status?id=${idBrand}`);
};

export { findByStatusActiveFromCategory, updateStatusCategory, postCreateNewCategory ,findByName};