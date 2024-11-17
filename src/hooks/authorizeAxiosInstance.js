import axios from "axios";
import { toast } from 'react-toastify';
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
authorizeAxiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response?.status == 401) {
    toast.error("Phiên đăng nhập đã hết hạn");
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      localStorage.removeItem("accessToken");
    }
  }
  else if (error.response?.status === 403) {
    // location.href ="/login";

  } else {
    toast.error(error.response?.data.error);
  }
  return Promise.reject(error);
});



export default authorizeAxiosInstance;