import axios from "axios";
import { toast } from "react-toastify";
import {
  postCreateAccountVoucher,
  updateAccountVoucher,
} from "./ApiAccountVoucherService";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

// Fetch all vouchers with filters
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

    const response = await apiClient.get(`/voucher/list-voucher?${params.toString()}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch vouchers: ${error.message}`);
    throw error;
  }
};

// Create a public voucher
export const createPublicVoucher = async (newVoucher) => {
  try {
    const response = await apiClient.post("/voucher/create", newVoucher);
    return response.data;
  } catch (error) {
    toast.error(`Failed to create public voucher: ${error.message}`);
    throw error;
  }
};

// Create a private voucher and associate it with specific accounts
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
    toast.error(`Failed to create private voucher: ${error.message}`);
    throw error;
  }
};

// Get voucher details by ID
export const getVoucherById = async (id) => {
  try {

    const response = await apiClient.get(`/voucher/detail/${id}`);
 
    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch voucher details: ${error.message}`);
    throw error;
  }
};

// Update a public voucher
export const updatePublicVoucher = async (id, updatedVoucher) => {
  try {
    // Fetch existing voucher details
    const existingVoucher = await getVoucherById(id);

    // Merge the existing voucher with updated values
    const mergedVoucher = { ...existingVoucher, ...updatedVoucher };

    // Perform the update request to the API
    const response = await apiClient.put(`/voucher/update/${id}`, mergedVoucher);

    return response.data;
  } catch (error) {
    toast.error(`Failed to update public voucher: ${error.message}`);
    throw error;
  }
};

// Update a private voucher and update its associated accounts if necessary
export const updatePrivateVoucher = async (id, updatedVoucher) => {
  try {
    // Fetch existing voucher details
    const existingVoucher = await getVoucherById(id);

    // Merge the existing voucher with updated values
    const mergedVoucher = { ...existingVoucher, ...updatedVoucher };

    // Perform the update request to the API
    const response = await apiClient.put(`/voucher/update/${id}`, mergedVoucher);

    // Handle the case where the voucher is still private
    if (updatedVoucher.isPrivate) {
      for (const accountId of updatedVoucher.accountIds) {
        await updateAccountVoucher(accountId, {
          dateOfUse: updatedVoucher.dateOfUse,
        });
      }
    } else {
      // If the voucher is no longer private, clear the associated accounts
      console.log("Voucher is now public. Clearing associated accounts...");
      mergedVoucher.accountIds = []; // Clear the account associations
    }

    return response.data;
  } catch (error) {
    toast.error(`Failed to update private voucher: ${error.message}`);
    throw error;
  }
};

// Delete a voucher by ID
export const deleteVoucher = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/delete/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to delete voucher: ${error.message}`);
    throw error;
  }
};

// End a voucher early
export const endVoucherEarly = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/end-early/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to end voucher early: ${error.message}`);
    throw error;
  }
};

// Reactivate a voucher
export const reactivateVoucher = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/reactivate/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to reactivate voucher: ${error.message}`);
    throw error;
  }
};

// Check expired vouchers
export const checkExpiredVouchers = async () => {
  try {
    const response = await apiClient.get(`/voucher/check-expired`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to check expired vouchers: ${error.message}`);
    throw error;
  }
};
