import React, { useEffect } from "react";

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