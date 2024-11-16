import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateBillDetailByEmployee = async (codeBill, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/createBillDetailByEmployee?codeBill=${codeBill}`, idProductDetail)
    return response;
};
const findBillDetailByEmployeeByCodeBill = async (codeBill) => {
    const response = await authorizeAxiosInstance.get(`/billDetailByEmployee/detail?codeBill=${encodeURIComponent(codeBill)}`)
    return response;
};
export { postCreateBillDetailByEmployee, findBillDetailByEmployeeByCodeBill };
