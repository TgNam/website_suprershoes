import React, { useEffect } from "react";

const CartListener = ({ updateCart }) => {
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8080/sse/notifications");

        eventSource.onmessage = (event) => {
            if (event.data === "UPDATE_SIZE") {
                console.log("Received update notification");
                updateCart(); // Gọi lại API để cập nhật giỏ hàng
            }
        };

        return () => eventSource.close(); // Đóng kết nối khi component unmount
    }, [updateCart]);

    return null; // Component này chỉ dùng để lắng nghe sự kiện
};

export default CartListener;
