import {
    Fetch_Employee_Request,
    Fetch_Employee_Success,
    Fetch_Employee_Error,
    Fetch_Search_Employee_Request,
} from '../types/EmployeeTypes';

const initialState = {
    loading: false,
    listEmployee: [],
    error: '',
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_Employee_Request:
        case Fetch_Search_Employee_Request:
            return {
                ...state,
                loading: true,
            };
        case Fetch_Employee_Success:
            return {
                ...state,
                loading: false,
                listEmployee: action.payload,
                error: '',
            };
        case Fetch_Employee_Error:
            return {
                ...state,
                loading: false,
                listEmployee: [],
                error: 'Error fetching employee data',
            };
        default:
            return state;
    }
};

export default employeeReducer;
