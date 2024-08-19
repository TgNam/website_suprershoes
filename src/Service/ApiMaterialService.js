import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/material'
});

const postCreateNewMaterial = async (newMaterial) => {
    return await apiClient.post('/create-material', newMaterial);
};

const findByStatusActiveFromMaterial = async () => {
    try {
        const response = await apiClient.get('/list-material')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-material-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusMaterial = (idMaterial) => {
    return apiClient.put(`/update-status?id=${idMaterial}`);
};

export { findByStatusActiveFromMaterial, updateStatusMaterial, postCreateNewMaterial ,findByName};