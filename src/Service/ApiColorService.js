import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/color'
});

const postCreateNewColor = async (newColor) => {
    return await apiClient.post('/create-color', newColor);
};

const findByStatusActiveFromColor = async () => {
    try {
        const response = await apiClient.get('/list-color')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-color-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusColor = (idColor) => {
    return apiClient.put(`/update-status?id=${idColor}`);
};

export { findByStatusActiveFromColor, updateStatusColor, postCreateNewColor ,findByName};
