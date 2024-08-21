import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/account'
});

export const postCreateNewEmployee = async (newEmployee) => {
    try {
        const response = await apiClient.post('/create-employee', newEmployee);
        return response;
    } catch (error) {
        toast.error('Error creating employee: ' + error.message);
        throw error;
    }
};

export const findByStatusActiveFromEmployee = async () => {
    try {
        const response = await apiClient.get('/list-accounts-employee');
        return response;
    } catch (error) {
        toast.error('Error fetching employees: ' + error.message);
        throw error;
    }
};

export const findByName = async (searchName) => {
    try {
        const response = await apiClient.get(`/list-employee-search?search=${searchName}`);
        return response;
    } catch (error) {
        toast.error('Error searching for employee: ' + error.message);
        throw error;
    }
};

export const updateStatusEmployee = async (idEmployee) => {
    try {
        const response = await apiClient.put(`/update-status?id=${idEmployee}`);
        return response;
    } catch (error) {
        toast.error('Error updating employee status: ' + error.message);
        throw error;
    }
};

export const deleteEmployee = async (idEmployee) => {
    try {
        const response = await apiClient.delete(`/delete-employee?id=${idEmployee}`);
        return response;
    } catch (error) {
        toast.error('Error deleting employee: ' + error.message);
        throw error;
    }
};
