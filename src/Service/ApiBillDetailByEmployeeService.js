import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateBillDetailByEmployee = async (codeBill, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/createBillDetailByEmployee?codeBill=${codeBill}`, idProductDetail)
    return response;
};
const postUpdateBillDetailByEmployee = async (codeBill, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/updateBillAndCreateBillDetailByIdBill?codeBill=${codeBill}`, idProductDetail)
    return response;
};
const findBillDetailByEmployeeByCodeBill = async (codeBill) => {
    const response = await authorizeAxiosInstance.get(`/billDetailByEmployee/detail?codeBill=${encodeURIComponent(codeBill)}`)
    return response;
};

const plusBillDetailByQuang = async (codeBill, idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/bill-detail/plusBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};

const subtractBillDetailByQuang = async (codeBill, idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/bill-detail/subtractBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};

const deleteBillDetailByQuang = async (codeBill, idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.delete(`/bill-detail/deleteBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};

const plusBillDetail = async (idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/plusBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};
const subtractBillDetail = async (idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/subtractBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};
const deleteBillDetail = async (idBillDetail, idProductDetail) => {
    const response = await authorizeAxiosInstance.delete(`/billDetailByEmployee/deleteBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProductDetail=${encodeURIComponent(idProductDetail)}`)
    return response;
};
export { plusBillDetail, subtractBillDetail, deleteBillDetail, postCreateBillDetailByEmployee, findBillDetailByEmployeeByCodeBill, postUpdateBillDetailByEmployee, plusBillDetailByQuang, deleteBillDetailByQuang, subtractBillDetailByQuang };
