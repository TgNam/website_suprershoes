import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/brand'
});

const postCreateNewBrand = async (newBrand) => {
    return await apiClient.post('/create-brand', newBrand);
};

const findByStatusActiveFromBrand = async () => {
    try {
        const response = await apiClient.get('/list-brand')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-brand-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusBrand = (idBrand,aBoolean) => {
    return apiClient.put(`/update-status?id=${idBrand}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromBrand, updateStatusBrand, postCreateNewBrand ,findByName};
