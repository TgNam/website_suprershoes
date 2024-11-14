import axios from 'axios';
import { toast } from 'react-toastify';
import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/account'
});

const postCreateNewAccount = async (createAccount) => {
    return await authorizeAxiosInstance.post('/account/create', createAccount);
};
const postCreateNewEmployee = async (employeeCreationRequest) => {
    return await apiClient.post('createEmployee', employeeCreationRequest);
};
const getAllAccountsCusomer = async () => {
    try {
        const response = await apiClient.get('list-accounts-customer')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findCustomerByNameAndStatus = async (search, status) => {
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

const updateAccount = (idAccount, updatedAccount) => {
    return apiClient.put(`updateAccount?idAccount=${idAccount}`, updatedAccount);
};
const updateEmplloyee = (idAccount,idAddress, employeeUpdateRequest) => {
    return apiClient.put(`/updateEmployee?idAccount=${idAccount}&idAddress=${idAddress}`, employeeUpdateRequest);
};
const updateStatusAccount = (idAccount, aBoolean) => {
    return apiClient.put(`/updateStatus?id=${idAccount}&aBoolean=${aBoolean}`);
};
const getAllAccountsEmployee = async () => {
    try {
        const response = await apiClient.get('list-accounts-employee')
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};
const findEmployeeByNameAndStatus = async (search, status) => {
    try {
        const response = await apiClient.get(`list-accounts-employee-search?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }

};

const getAccountLogin = async ()=>{
    try {
        const response = await authorizeAxiosInstance.get("/account/get-account-login")
        return response;
    } catch (error) {
        toast.error(error.message)
    }
}

export {
    postCreateNewAccount,
    getAllAccountsCusomer,
    findCustomerByNameAndStatus,
    updateAccount,
    findAccountById,
    getAllAccountsEmployee,
    findEmployeeByNameAndStatus,
    updateStatusAccount,
    postCreateNewEmployee,
    updateEmplloyee,
    getAccountLogin
};
