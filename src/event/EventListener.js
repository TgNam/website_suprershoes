import React, { useEffect } from "react";

const EventListener = ({ handlers }) => {
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8080/sse/notifications");
        const eventQueue = []; // Hàng đợi sự kiện

        const processEvent = () => {
            if (eventQueue.length > 0) {
                const event = eventQueue.shift(); // Lấy sự kiện đầu tiên
                const handler = handlers[event];
                if (handler) handler();
            }
        };

        eventSource.onmessage = (event) => {
            console.log(`Received notification for ${event.data}`);
            eventQueue.push(event.data); // Đưa sự kiện vào hàng đợi
            processEvent();
        };

        return () => eventSource.close();
    }, [handlers]);

    return null;
};


export default EventListener;
