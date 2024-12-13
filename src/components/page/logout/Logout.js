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

// Component App hoặc sử dụng trong các component chính
export function useSyncLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "logoutEvent") {
                // Nếu nhận được sự kiện logout, điều hướng về trang đăng nhập
                localStorage.removeItem("accessToken"); // Đảm bảo token bị xóa
                window.location.href = "/login";
            }
        };

        // Lắng nghe sự kiện thay đổi localStorage
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [navigate]);
}
