import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/address'
});

const postCreateNewAddress = async (newAddress) => {
    return await apiClient.post('createAddress', newAddress);
};

const getAddressByidAccount = async (idAccount) => {
    try {
        const response = await apiClient.get(`getAddressByidAccount?idAccount=${idAccount}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findAddress = async (idAddress) => {
    try {
        const response = await apiClient.get(`findAddress?idAddress=${encodeURIComponent(idAddress)}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const deleteAddress = (addressId) => {
    return apiClient.delete(`delete?addressId=${addressId}`);
};

const updateAddress = (addressId, updatedAddress) => {
    return apiClient.put(`updateAddress?addressId=${addressId}`, updatedAddress);
};
const updateAddressType = (addressId) => {
    return apiClient.put(`updateAddressType?addressId=${addressId}`);
};
export { postCreateNewAddress, getAddressByidAccount, findAddress, deleteAddress, updateAddress, updateAddressType };
 