import {
    Fetch_Employee_Request,
    Fetch_Employee_Success,
    Fetch_Employee_Error,
    Fetch_Search_Employee_Request,
} from '../types/EmployeeTypes';
import { findByStatusActiveFromEmployee, findByName } from '../../Service/ApiEmployeeService';
import { toast } from 'react-toastify';

export const fetchAllEmployee = () => {
    return async (dispatch, getState) => {
        dispatch(fetchEmployeesRequest());
        try {
            const response = await findByStatusActiveFromEmployee();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchEmployeesSuccess(data));
            } else {
                toast.error('Error fetching employees');
                dispatch(fetchEmployeesError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchEmployeesError());
        }
    };
};

export const fetchSearchEmployee = (searchName) => {
    return async (dispatch, getState) => {
        dispatch(fetchSearchEmployeeRequest());
        try {
            const response = await findByName(searchName);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchEmployeesSuccess(data));
            } else {
                toast.error('Error fetching employees');
                dispatch(fetchEmployeesError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchEmployeesError());
        }
    };
};

export const fetchEmployeesRequest = () => {
    return {
        type: Fetch_Employee_Request,
    };
};

export const fetchSearchEmployeeRequest = () => {
    return {
        type: Fetch_Search_Employee_Request,
    };
};

export const fetchEmployeesSuccess = (payload) => {
    return {
        type: Fetch_Employee_Success,
        payload,
    };
};

export const fetchEmployeesError = () => {
    return {
        type: Fetch_Employee_Error,
    };
};
