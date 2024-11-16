
import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

export const fetchAllAccountVouchers = async () => {
  const response = await authorizeAxiosInstance.get("/account-voucher/");
  return response.data;
};

export const postCreateAccountVoucher = async (accountVoucher) => {
  const response = await authorizeAxiosInstance.post(
    "/account-voucher/create",
    accountVoucher
  );
  return response.data;
};

export const updateAccountVoucher = async (id, updatedData) => {
  const response = await authorizeAxiosInstance.put(
    `/account-voucher/update/${id}`,
    updatedData
  );
  return response.data;
};
