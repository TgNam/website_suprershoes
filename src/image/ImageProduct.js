import React, { useState, useEffect } from 'react';
import { findImageByIdProduct } from '../Service/ApiProductService';

const ImageProduct = ({ id, maxWidth, maxHeight }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await findImageByIdProduct(id);
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
        fetchImage();
    }, [id]); // Đừng quên thêm id vào dependency array

    return (
        <>
            {images ? (
                <img
                    src={`data:image/jpeg;base64,${images.imageByte}`}
                    alt="Product"
                    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
                    onError={(e) => {
                        e.target.src = "https://placehold.co/150x150"; // Đổi nguồn ảnh khi lỗi
                    }}
                />
            ) : (
                <img src={`https://placehold.co/150x150`} alt="" style={{ maxWidth: maxWidth, maxHeight: maxHeight }} />
            )}

        </>
    );
};

export default ImageProduct;
