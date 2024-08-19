import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/size'
});

const postCreateNewSize = async (newSize) => {
    return await apiClient.post('/create-size', newSize);
};

const findByStatusActiveFromSize = async () => {
    try {
        const response = await apiClient.get('/list-size')
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
// const getfindUsers = (idUser) => {
//     return apiClient.get('/users/detail/' + idUser);
// };

// const deleteUser = (idUser) => {
//     return apiClient.delete('/users/delete/' + idUser);
// };

// const updateUser = (idUser, updatedData) => {
//     return apiClient.put('/users/update/' + idUser, updatedData);
// };
const updateStatusSize = (idSize) => {
    return apiClient.put(`/update-status?id=${idSize}`);
};

export { findByStatusActiveFromSize, updateStatusSize, postCreateNewSize ,findByName};
