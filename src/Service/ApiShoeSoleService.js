import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/shoeSole'
});

const postCreateNewShoeSole = async (newShoeSole) => {
    return await apiClient.post('/create-shoeSole', newShoeSole);
};

const findByStatusActiveFromShoeSole = async () => {
    try {
        const response = await apiClient.get('/list-shoeSole')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-shoeSole-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusShoeSole = (idShoeSole,aBoolean) => {
    return apiClient.put(`/update-status?id=${idShoeSole}&aBoolean=${aBoolean}`);
};

export { findByStatusActiveFromShoeSole, updateStatusShoeSole, postCreateNewShoeSole ,findByName};