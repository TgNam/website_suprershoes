import axios from 'axios';
import { toast } from 'react-toastify';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
    // ,
    // auth: {
    //     Accountname: 'Account',
    //     password: 'Account'
    // }
});

const postCreateNewAccount = async (createAccount) => {
    return await apiClient.post('/Accounts/add', createAccount);
};

const getAllAccounts = async () => {
    try {
        const response = await apiClient.get('api/v1/guest/list-guest')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const getfindAccounts = (idAccount) => {
    return apiClient.get('/Accounts/detail/' + idAccount);
};

const deleteAccount = (idAccount) => {
    return apiClient.delete('/Accounts/delete/' + idAccount);
};

const updateAccount = (idAccount, updatedData) => {
    return apiClient.put('/Accounts/update/' + idAccount, updatedData);
};

export { postCreateNewAccount, getAllAccounts, getfindAccounts, deleteAccount, updateAccount };
