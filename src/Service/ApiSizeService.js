import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/size'
});

const postCreateNewSize = async (newSize) => {
    return await apiClient.post('/create-size', newSize);
};
const findAllSize = async () => {
    try {
        const response = await apiClient.get('/list-size')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByStatusActiveFromSize = async () => {
    try {
        const response = await apiClient.get('/listSizeACTIVE')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-size-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusSize = (idSize,aBoolean) => {
    return apiClient.put(`/update-status?id=${idSize}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromSize, updateStatusSize, postCreateNewSize, findAllSize, findByName };
