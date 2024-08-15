import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
    // ,
    // auth: {
    //     username: 'user',
    //     password: 'user'
    // }
});

const postCreateNewUser = async (createUser) => {
    return await apiClient.post('/users/add', createUser);
};

const getAllUsers = async () => {
    try {
        const response = await apiClient.get('api/v1/guest/list-guest')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const getfindUsers = (idUser) => {
    return apiClient.get('/users/detail/' + idUser);
};

const deleteUser = (idUser) => {
    return apiClient.delete('/users/delete/' + idUser);
};

const updateUser = (idUser, updatedData) => {
    return apiClient.put('/users/update/' + idUser, updatedData);
};

export { postCreateNewUser, getAllUsers, getfindUsers, deleteUser, updateUser };
