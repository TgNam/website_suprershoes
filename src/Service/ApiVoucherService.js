import axios from "axios";
import { toast } from "react-toastify";
import {
  postCreateAccountVoucher,
  updateAccountVoucher,
} from "./ApiAccountVoucherService";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchAllVouchers = async (filters, page, size) => {
  try {
    const params = new URLSearchParams();

    if (filters.status) params.append("status", filters.status);
    if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.type) params.append("type", filters.type);

    params.append("page", page);
    params.append("size", size);

    const response = await apiClient.get(
      `/voucher/list-voucher?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createPublicVoucher = async (newVoucher) => {
  try {
    const response = await apiClient.post("/voucher/create", newVoucher);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const createPrivateVoucher = async (newVoucher) => {
  try {
    const response = await apiClient.post("/voucher/create", newVoucher);
    if (newVoucher.isPrivate) {
      for (const accountId of newVoucher.accountIds) {
        await postCreateAccountVoucher({
          voucherId: response.data.id,
          accountId,
        });
      }
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const updatePublicVoucher = async (id, updatedVoucher) => {
  try {
    return await apiClient.put(`/voucher/update/${id}`, updatedVoucher);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const updatePrivateVoucher = async (id, updatedVoucher) => {
  try {
    const response = await apiClient.put(
      `/voucher/update/${id}`,
      updatedVoucher
    );
    if (updatedVoucher.isPrivate) {
      for (const accountId of updatedVoucher.accountIds) {
        await updateAccountVoucher(accountId, {
          dateOfUse: updatedVoucher.dateOfUse,
        });
      }
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const deleteVoucher = async (id) => {
  try {
    return await apiClient.put(`/voucher/delete/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const endVoucherEarly = async (id) => {
  try {
    return await apiClient.put(`/voucher/end-early/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const reactivateVoucher = async (id) => {
  try {
    return await apiClient.put(`/voucher/reactivate/${id}`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const checkExpiredVouchers = async () => {
  try {
    return await apiClient.get(`/voucher/check-expired`);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
