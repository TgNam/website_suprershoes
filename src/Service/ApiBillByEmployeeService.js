import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const findCodeBillByEmployee = async () => {
    const response = await authorizeAxiosInstance.get(`/billByEmployee/list-codeBill`)
    return response;
};
const findBillResponseByCodeBill = async (codeBill) => {
    const response = await authorizeAxiosInstance.get(`/billByEmployee/findBillRequestBycodeBill?codeBill=${codeBill}`)
    return response;
};
const postCreateNewBill = async (displayBills) => {
    const response = await authorizeAxiosInstance.post('/billByEmployee/create-billByEmployee', displayBills)
    return response;
};
const postPayBillByEmployee = async (codeBill, delivery, postpaid, codeVoucher, idAccount, name, phoneNumber, address, note) => {
    const response = await authorizeAxiosInstance.post(`/billByEmployee/payBillByEmployee?codeBill=${codeBill}&delivery=${delivery}&postpaid=${postpaid}&codeVoucher=${codeVoucher}&idAccount=${idAccount}&name=${name}&phoneNumber=${phoneNumber}&address=${address}&note=${note}`)
    return response;
};
const sortDisplayBillsByEmployee = async (displayBills, selectills) => {
    const response = await authorizeAxiosInstance.get(`/billByEmployee/sortDisplayBills?displayBills=${displayBills}&&selectills=${selectills}`)
    return response;
};
export { findCodeBillByEmployee, postCreateNewBill, sortDisplayBillsByEmployee, findBillResponseByCodeBill, postPayBillByEmployee };
