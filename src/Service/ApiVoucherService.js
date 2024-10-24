import axios from "axios";
import { toast } from "react-toastify";
import {
  postCreateAccountVoucher,
  updateAccountVoucher,
} from "./ApiAccountVoucherService";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchEmailsByCustomerIds = async (customerIds) => {
  try {
    
    const response = await apiClient.post("/account-voucher/emails", { customerIds });
    
  
    return response.data.emails;
  } catch (error) {
    console.error("Error fetching customer emails:", error.response?.data || error.message);
    throw error;
  }
};


export const sendEmail = async (emailContent) => {
  try {
    
    const response = await apiClient.post("/account-voucher/send-email", emailContent);
    
   
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    toast.error("Failed to send email. Please try again.");
    throw error;
  }
};


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


export const createPublicVoucher = async (newVoucher) => {
  try {
    const response = await apiClient.post("/voucher/create", newVoucher);
    return response.data;
  } catch (error) {
    toast.error(`Failed to create public voucher: ${error.message}`);
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
    toast.error(`Failed to create private voucher: ${error.message}`);
    throw error;
  }
};


export const getVoucherById = async (id) => {
  try {

    const response = await apiClient.get(`/voucher/detail/${id}`);

    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch voucher details: ${error.message}`);
    throw error;
  }
};


export const updatePublicVoucher = async (id, updatedVoucher) => {
  try {
    
    const existingVoucher = await getVoucherById(id);


    const mergedVoucher = { ...existingVoucher, ...updatedVoucher };

  
    const response = await apiClient.put(`/voucher/update/${id}`, mergedVoucher);

    return response.data;
  } catch (error) {
    toast.error(`Failed to update public voucher: ${error.message}`);
    throw error;
  }
};

export const updatePrivateVoucher = async (id, updatedVoucher) => {
  try {
 
    const existingVoucher = await getVoucherById(id);
 
    const mergedVoucher = { ...existingVoucher, ...updatedVoucher };

   
    const response = await apiClient.put(`/voucher/update/${id}`, mergedVoucher);

   
    if (updatedVoucher.isPrivate) {
      for (const accountId of updatedVoucher.accountIds) {
        await updateAccountVoucher(accountId, {
          dateOfUse: updatedVoucher.dateOfUse,
        });
      }
    } else {
    
      console.log("Voucher is now public. Clearing associated accounts...");
      mergedVoucher.accountIds = []; 
    }

    return response.data;
  } catch (error) {
    toast.error(`Failed to update private voucher: ${error.message}`);
    throw error;
  }
};

export const deleteVoucher = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/delete/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to delete voucher: ${error.message}`);
    throw error;
  }
};


export const endVoucherEarly = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/end-early/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to end voucher early: ${error.message}`);
    throw error;
  }
};

export const reactivateVoucher = async (id) => {
  try {
    const response = await apiClient.put(`/voucher/reactivate/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to reactivate voucher: ${error.message}`);
    throw error;
  }
};


export const checkExpiredVouchers = async () => {
  try {
    const response = await apiClient.get(`/voucher/check-expired`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to check expired vouchers: ${error.message}`);
    throw error;
  }
};
