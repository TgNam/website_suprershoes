import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountLogin } from '../Service/ApiAccountService';
import { initialize } from '../redux/action/authAction';
const EventListener = ({ handlers }) => {
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8080/sse/notifications");

        eventSource.onmessage = (event) => {
            const handler = handlers[event.data]; // Lấy hàm xử lý tương ứng với event.data
            if (handler) {
                console.log(`Received notification for ${event.data}`);
                handler(); // Gọi hàm xử lý
            }
        };

        return () => eventSource.close(); // Đóng kết nối khi component unmount
    }, [handlers]);

    return null; // Component này chỉ dùng để lắng nghe sự kiện
};

export default EventListener;

export function useSyncAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = async (event) => {
            if (event.key === "logoutEvent") {
                // Đồng bộ logout
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }

            if (event.key === "loginEvent") {
                // Đồng bộ login
                const token = localStorage.getItem("accessToken");
                if (token) {
                    try {
                        const account = await getAccountLogin();
                        if (account.status === 200) {
                            const user = account.data;
                            window.location.href = "/";
                            dispatch(initialize({ isAuthenticated: true, user }));
                        }
                    } catch (error) {
                        console.error("Failed to fetch user data:", error);
                    }
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [navigate, dispatch]);
}
