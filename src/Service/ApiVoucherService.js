import axios from "axios";
import {toast} from "react-toastify";
import {postCreateAccountVoucher,} from "./ApiAccountVoucherService";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const fetchEmailsByCustomerIds = async (customerIds) => {
    try {
        const response = await apiClient.post("/account-voucher/emails", {customerIds});
        return response.data.emails;
    } catch (error) {
        console.error("Lỗi lấy email khách hàng:", error.response?.data || error.message);
        throw error;
    }
};

export const sendEmail = async (emailContent) => {
    try {
        const response = await apiClient.post("/account-voucher/send-email", emailContent);
        return response.data;
    } catch (error) {
        console.error("Lỗi gửi mail:", error.response?.data || error.message);
        toast.error("Gửi mail không thành công");
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
        toast.error(`Lỗi hiển thị phiếu giảm giá: ${error.message}`);
        throw error;
    }
};

export const createPublicVoucher = async (newVoucher) => {
    try {
        const response = await apiClient.post("/voucher/create", newVoucher);
        return response.data;
    } catch (error) {
        console.error(`Tạo phiếu công khai lỗi: ${error.message}`);
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
        console.error(`Tạo phiếu riêng tư lỗi: ${error.message}`);
        throw error;
    }
};

export const getVoucherById = async (id) => {
    try {
        const response = await apiClient.get(`/voucher/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi xem chi tiết: ${error.message}`);
        throw error;

    }
};

export const updateVoucher = async (id, updatedVoucher) => {
    try {
        const existingVoucher = await getVoucherById(id);

        const mergedVoucher = {
            ...existingVoucher,
            startAt: updatedVoucher.startAt,
            endAt: updatedVoucher.endAt,
            quantity: updatedVoucher.quantity,
        };

        const response = await apiClient.put(`/voucher/update/${id}`, mergedVoucher);

        if (updatedVoucher.isPrivate) {
            console.log("Phiếu giảm giá là riêng tư, bỏ qua cập nhật bảng AccountVoucher.");
        } else {
            console.log("Voucher is now public. Clearing associated accounts...");
            mergedVoucher.accountIds = [];
        }

        return response.data;
    } catch (error) {
        console.error(`Lỗi cập nhật phiếu giảm giá: ${error.message}`);
        throw error;
    }
};


export const deleteVoucher = async (id) => {
    try {
        const response = await apiClient.put(`/voucher/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi đổi trạng thái đã kết thúc: ${error.message}`);
        throw error;
    }
};

export const endVoucherEarly = async (id) => {
    try {
        const response = await apiClient.put(`/voucher/end-early/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi kết thúc sớm: ${error.message}`);
        throw error;
    }
};

export const reactivateVoucher = async (id) => {
    try {
        const response = await apiClient.put(`/voucher/reactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi bật trạng thái đã kết thúc: ${error.message}`);
        throw error;
    }
};

export const checkExpiredVouchers = async () => {
    try {
        const response = await apiClient.get(`/voucher/check-expired`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi thay đổi trạng thái đã kết thúc: ${error.message}`);
        throw error;
    }
};
export const findAllVoucherBillPublic = async () => {
  try {
    const response = await apiClient.get('/voucher/getListVoucherBillPublic')
    return response;
  } catch (error) {
    toast.error(error.message)
  }
}
export const findAllVoucherBillPrivate = async (idAccount) => {
  try {
    const response = await apiClient.get(`/voucher/getListVoucherBillPrivate?idAccount=${idAccount}`)
    return response;
  } catch (error) {
    toast.error(error.message)
  }
}
export const findVoucherDetail = async (idVoucher) => {
  try {
    const response = await apiClient.get(`/voucher/getFindVoucherBill?idVoucher=${idVoucher}`)
    return response;
  } catch (error) {
    toast.error(error.message)
  }
}
