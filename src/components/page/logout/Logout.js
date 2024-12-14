import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Xóa accessToken và kích hoạt sự kiện logout
        localStorage.removeItem("accessToken");
        localStorage.setItem("logoutEvent", Date.now()); // Lưu timestamp để kích hoạt sự kiện
        window.location.href = "/login";
    }, [navigate]);

    return <>Logout Page</>;
}

