import React from 'react';

const CompleteButton = ({ onComplete }) => {
    const handleClick = () => {
        // Giả sử selectedProducts là danh sách sản phẩm đã chọn
        const selectedProducts = [
            // Ví dụ dữ liệu sản phẩm
            // Thêm các sản phẩm khác nếu cần
];
        onComplete(selectedProducts);
    };

    return (
        <button onClick={handleClick}>Hoàn tất</button>
    );
};

export default CompleteButton;
