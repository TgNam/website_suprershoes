import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const postCreateNewVoucher = async (newVoucher) => {
  return await apiClient.post("/voucher/create", newVoucher);
};

export const updateVoucher = async (id, updatedVoucher) => {
  try {
    return await apiClient.put(`/voucher/update/${id}`, updatedVoucher);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const deleteVoucher = async (id) => {
  try {
    return await apiClient.delete(`/voucher/delete/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const fetchAllVouchers = async (filters, page, size) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);
    params.append("page", page);
    params.append("size", size);

    const response = await apiClient.get(
      `/voucher/list-voucher?${params.toString()}`
    );
    return response;
  } catch (error) {
    toast.error(error.message);
  }
};

export const postCreateAccountVoucher = async (accountVoucher) => {
  return await apiClient.post("/account-voucher/create", accountVoucher);
};

export const updateAccountVoucher = async (id, updatedData) => {
  return await apiClient.put(`/account-voucher/update/${id}`, updatedData);
};

export const deleteAccountVoucher = async (id) => {
  try {
    return await apiClient.delete(`/account-voucher/delete/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
