import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchAllAccountVouchers = async () => {
  try {
    const response = await apiClient.get("/account-voucher/");
    return response.data; 
  } catch (error) {
    toast.error(error.message);
  }
};

export const postCreateAccountVoucher = async (accountVoucher) => {
  try {
    const response = await apiClient.post(
      "/account-voucher/create",
      accountVoucher
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const updateAccountVoucher = async (id, updatedData) => {
  try {
    const response = await apiClient.put(
      `/account-voucher/update/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const deleteAccountVoucher = async (id) => {
  try {
    await apiClient.delete(`/account-voucher/delete/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
