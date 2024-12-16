import axios from "axios";
import { toast } from 'react-toastify';
import swal from 'sweetalert';
// import { useStore } from "@/store/hooks";




let authorizeAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
});

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authorizeAxiosInstance.defaults.withCredentials = true;

authorizeAxiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window !== 'undefined') {
      let accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      switch (statusCode) {
        case 401: {
          const mess = errorData?.mess || "Phiên đăng nhập đã hết hạn!";
          toast.error(mess);
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          }
          break;
        }
        case 403:
          window.location.href = "/Page403";
          break;
        case 404:
          toast.error("Không tìm thấy tài nguyên!");
          break;
        case 400: {
          // Xử lý lỗi 400 (Validation)
          if (Array.isArray(errorData)) {
            errorData.forEach(err => {
              toast.error(err); // Hiển thị từng lỗi trong mảng
            });
          } else {
            toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");
          }
          break;
        }
        case 409: {
          const mess = errorData?.mess || "Xung đột dữ liệu!";
          toast.error(mess);
          break;
        }
        case 423: // Tài khoản bị khóa
          swal({
            title: "Tài khoản bị khóa",
            text: errorData.mess || "Tài khoản của bạn đã bị khóa.",
            icon: "error",
            buttons: {
              confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              }
            }
          }).then(() => {
            // Chuyển hướng sau khi người dùng bấm OK
            window.location.href = "/logout";
          });
          break;
        case 500:
          toast.error("Lỗi máy chủ: " + (errorData.errorDetails?.join(", ") || "Sự cố không mong muốn."));
          break;
        default:
          toast.error(errorData?.error || "Đã xảy ra lỗi hệ thống!");
      }
    } else if (error.request) {
      // Lỗi do không nhận được phản hồi từ server
      toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    } else {
      // Lỗi khác (cấu hình, v.v.)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;