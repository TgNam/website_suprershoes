import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/account'
});

const postCreateNewAccount = async (createAccount) => {
    return await apiClient.post('create', createAccount);
};

const getAllAccountsCusomer = async () => {
    try {
        const response = await apiClient.get('list-accounts-customer')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findByNameAndStatus = async (search, status) => {
    try {
        const response = await apiClient.get(`list-accounts-customer-search?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findAccountById = async (idAccount) => {
    try {
        const response = await apiClient.get(`findAccounts?idAccount=${encodeURIComponent(idAccount)}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const getAllAccountsEmployee = async () => {
    try {
        const response = await apiClient.get('list-accounts-employee')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const updateAccount = (idAccount, updatedAccount) => {
    return apiClient.put(`updateAccount?idAccount=${idAccount}`, updatedAccount);
};

export { postCreateNewAccount, getAllAccountsCusomer, findByNameAndStatus, updateAccount, findAccountById, getAllAccountsEmployee };
