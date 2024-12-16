
import { toast } from "react-toastify";
import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

export const fetchEmailsByCustomerIds = async (customerIds) => {
    try {
        const response = await authorizeAxiosInstance.post("/account-voucher/emails", { customerIds });
        return response.data.emails;
    } catch (error) {
        console.error("Lỗi lấy email khách hàng:", error.response?.data || error.message);
        throw error;
    }
};

export const sendEmail = async (emailContent) => {
    try {
      const response = await authorizeAxiosInstance.post(
        "/account-voucher/send-email",
        emailContent
      );
      if (response.data.includes("Email sending failed")) {
        toast.error("Gửi mail không thành công.");
      } else {
        toast.success("Gửi mail thành công.");
      }
      return response.data;
    } catch (error) {
      console.error("Lỗi gửi mail:", error.response?.data || error.message);
      toast.error("Gửi mail không thành công.");
      throw error; // Có thể bỏ throw nếu không muốn xử lý tiếp
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

        const response = await authorizeAxiosInstance.get(`/voucher/list-voucher?${params.toString()}`);
        return response.data;
    } catch (error) {
        toast.error(`Lỗi hiển thị phiếu giảm giá: ${error.message}`);
        throw error;
    }
};


export const createPublicVoucher = async (newVoucher) => {
    try {
        const response = await authorizeAxiosInstance.post("/voucher/create", newVoucher);
        return response.data;
    } catch (error) {
        console.error(`Tạo phiếu công khai lỗi: ${error.message}`);
        throw error;
    }
};


export const createPrivateVoucher = async (newVoucher) => {
  try {
    const response = await authorizeAxiosInstance.post(
      "/voucher/create",
      newVoucher
    );
    return response.data;
  } catch (error) {
    console.error(
      `Tạo phiếu riêng tư lỗi: ${error.response?.data?.mess || error.message}`
    );
    throw error; 
  }
};

export const getVoucherById = async (id) => {
    try {
        const response = await authorizeAxiosInstance.get(`/voucher/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi xem chi tiết: ${error.message}`);
        throw error;
    }
};
export const getVoucherByCodeVoucher = async (codeVoucher) => {
    try {
        const response = await authorizeAxiosInstance.get(`/voucher/findVoucherByCodeVoucher?codeVoucher=${codeVoucher}`);
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

      const currentDate = new Date();
      const startAtDate = new Date(updatedVoucher.startAt);
      const endAtDate = new Date(updatedVoucher.endAt);

      if (startAtDate > currentDate) {
        mergedVoucher.status = "UPCOMING";
      } else if (startAtDate <= currentDate && endAtDate > currentDate) {
        mergedVoucher.status = "ONGOING";
      } else {
        mergedVoucher.status = "EXPIRED";
      }

      const response = await authorizeAxiosInstance.put(
        `/voucher/update/${id}`,
        mergedVoucher
      );

      if (updatedVoucher.isPrivate) {
        console.log(
          "Phiếu giảm giá là riêng tư, bỏ qua cập nhật bảng AccountVoucher."
        );
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
        const response = await authorizeAxiosInstance.put(`/voucher/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi đổi trạng thái đã kết thúc: ${error.message}`);
        throw error;
    }
};

export const endVoucherEarly = async (id) => {
    try {
        const response = await authorizeAxiosInstance.put(`/voucher/end-early/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi kết thúc sớm: ${error.message}`);
        throw error;
    }
};

export const reactivateVoucher = async (id) => {
    try {
        const response = await authorizeAxiosInstance.put(`/voucher/reactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi bật trạng thái đã kết thúc: ${error.message}`);
        throw error;
    }
};

export const findAllVoucherBillPublic = async () => {
    try {
        const response = await authorizeAxiosInstance.get('/voucher/getListVoucherBillPublic')
        return response;
    } catch (error) {
        toast.error(error.message)
    }
}

export const findAllVoucherBillPrivate = async (idAccount) => {
    try {
        const response = await authorizeAxiosInstance.get(`/voucher/getListVoucherBillPrivate?idAccount=${idAccount}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }
}

export const findVoucherDetail = async (idVoucher) => {
    try {
        const response = await authorizeAxiosInstance.get(`/voucher/getFindVoucherBill?idVoucher=${idVoucher}`)
        return response;
    } catch (error) {
        toast.error(error.message)
    }
}
