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
const findByNameAndStatus = async (searchName, status) => {
    try {
        const response = await apiClient.get(`list-accounts-customer-search?search=${encodeURIComponent(searchName)}&status=${encodeURIComponent(status)}`)
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

// const getfindAccounts = (idAccount) => {
//     return apiClient.get('/Accounts/detail/' + idAccount);
// };

// const deleteAccount = (idAccount) => {
//     return apiClient.delete('/Accounts/delete/' + idAccount);
// };

// const updateAccount = (idAccount, updatedData) => {
//     return apiClient.put('/Accounts/update/' + idAccount, updatedData);
// };

export { postCreateNewAccount, getAllAccountsCusomer, findByNameAndStatus, getAllAccountsEmployee };
