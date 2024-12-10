
import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateNewAccount = async (createAccount) => {
    return await authorizeAxiosInstance.post('/account/create', createAccount);
};
const postCreateNewEmployee = async (employeeCreationRequest) => {
    return await authorizeAxiosInstance.post('/account/createEmployee', employeeCreationRequest);
};
const getAllAccountsCusomer = async () => {
    return await authorizeAxiosInstance.get('/account/list-accounts-customer');
};
const findCustomerByNameAndStatus = async (search, status) => {
    return await authorizeAxiosInstance.get(`/account/list-accounts-customer-search?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
};
const findAccountById = async (idAccount) => {
    return await authorizeAxiosInstance.get(`/account/findAccounts?idAccount=${encodeURIComponent(idAccount)}`);
};

const updateAccount = (idAccount, updatedAccount) => {
    return authorizeAxiosInstance.put(`/account/updateAccount?idAccount=${idAccount}`, updatedAccount);
};
const updateEmplloyee = (idAccount, idAddress, employeeUpdateRequest) => {
    return authorizeAxiosInstance.put(`/account/updateEmployee?idAccount=${idAccount}&idAddress=${idAddress}`, employeeUpdateRequest);
};
const updateStatusAccount = (idAccount, aBoolean) => {
    return authorizeAxiosInstance.put(`/account/updateStatus?id=${idAccount}&aBoolean=${aBoolean}`);
};
const getAllAccountsEmployee = async () => {
    return await authorizeAxiosInstance.get('/account/list-accounts-employee');
};
const findEmployeeByNameAndStatus = async (search, status) => {
    return await authorizeAxiosInstance.get(`/account/list-accounts-employee-search?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
};

const getAccountLogin = async () => {
    const response = await authorizeAxiosInstance.get("/account/get-account-login");
    return response;
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
