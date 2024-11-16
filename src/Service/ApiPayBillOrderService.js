import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';
const postCreateNewPayBill = async (newPayBill) => {
    return await authorizeAxiosInstance.post('/pay-bill/createPayBill', newPayBill);
};
const findAllPayBill = async (codeBill) => {
        const response = await authorizeAxiosInstance.get(`/pay-bill/listPayBill?codeBill=${codeBill}`)
        return response;

};
const deletePayBill = (idPayBill) => {
    return authorizeAxiosInstance.delete(`/pay-bill/deletePayBill?id=${idPayBill}`);
};

export { deletePayBill, postCreateNewPayBill, findAllPayBill };
