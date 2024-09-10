import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

const postCreateNewProductFavorite = async (newProductFavorite) => {
    return await apiClient.post('/create-ProductFavorite', newProductFavorite);
};

const findByStatusActiveFromProductFavorite = async () => {
    try {
        const response = await apiClient.get('/ProductFavorite')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-ProductFavorite-search?search=${searchName}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateStatusProductFavorite = (idProductFavorite) => {
    return apiClient.put(`/update-status?id=${idProductFavorite}`);
};
const deleteProductFavorite = (idProductFavorite) => {
    return apiClient.delete(`/delete-ProductFavorite?id=${idProductFavorite}`);
};

export { findByStatusActiveFromProductFavorite, updateStatusProductFavorite, postCreateNewProductFavorite ,findByName,deleteProductFavorite};
