import { Fetch_Posts_PayBillOrder_Request, Fetch_Posts_PayBillOrder_Success, Fetch_Posts_PayBillOrder_Error } from '../types/PayBillOrderType';
import { deletePayBill, postCreateNewPayBill, findAllPayBill } from '../../Service/ApiPayBillOrderService';
import { toast } from 'react-toastify';

export const fetchAllPayBillOrder = (codeBill) => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsPayBillOrderRequest());
        try {
            const response = await findAllPayBill(codeBill);
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsPayBillOrderSuccess(data))
             
            } else {
                toast.error('Error')
                dispatch(fetchPostsPayBillOrderError());
            }
        } catch (error) {
            dispatch(fetchPostsPayBillOrderError())
        }

    }
}
export const createNewPayBillOrder = (codeBill, createPayBillOrder) => {
    return async (dispatch) => {
        try {
            const response = await postCreateNewPayBill(createPayBillOrder);
            if (response.status === 200) {
                dispatch(fetchAllPayBillOrder(codeBill));
                toast.success("Thêm thanh toán mới thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm thanh toán mới:", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    // Xử lý lỗi validation (400 Bad Request)
                    if (Array.isArray(errorData)) {
                        errorData.forEach(err => {
                            toast.error(err); // Hiển thị từng lỗi trong mảng
                        });
                    } else {
                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                    }
                } else if (statusCode === 409) {
                    const { mess } = errorData;
                    toast.error(mess);
                } else {
                    // Xử lý các lỗi khác
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                // Lỗi do không nhận được phản hồi từ server
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                // Lỗi khác (cấu hình, v.v.)
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            dispatch(fetchPostsPayBillOrderError());
        }
    };
};
export const deletePayBillOrder = (codeBill, idPayBill) => {
    return async (dispatch) => {
        try {
            const response = await deletePayBill(idPayBill);
            if (response.status === 200) {
                dispatch(fetchAllPayBillOrder(codeBill));
                toast.success("Xóa thanh toán thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa thanh toán:", error);

            if (error.response) {
                const statusCode = error.response.status;
                const errorData = error.response.data;

                if (statusCode === 400) {
                    // Xử lý lỗi validation (400 Bad Request)
                    if (Array.isArray(errorData)) {
                        errorData.forEach(err => {
                            toast.error(err); // Hiển thị từng lỗi trong mảng
                        });
                    } else {
                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
                    }
                } else if (statusCode === 409) {
                    const { mess } = errorData;
                    toast.error(mess);
                } else {
                    // Xử lý các lỗi khác
                    toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                // Lỗi do không nhận được phản hồi từ server
                toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                // Lỗi khác (cấu hình, v.v.)
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            dispatch(fetchPostsPayBillOrderError());
        }
    };
};
export const fetchPostsPayBillOrderRequest = () => {
    return {
        type: Fetch_Posts_PayBillOrder_Request
    }
}
export const fetchPostsPayBillOrderSuccess = (payload) => {
    return {
        type: Fetch_Posts_PayBillOrder_Success,
        payload
    }
}
export const fetchPostsPayBillOrderError = () => {
    return {
        type: Fetch_Posts_PayBillOrder_Error
    }
}