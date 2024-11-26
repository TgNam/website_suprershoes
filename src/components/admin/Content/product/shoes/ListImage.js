import React, { useState, useEffect } from 'react';
import { findListImageByIdProductDetail } from '../../../../../Service/ApiProductImage';

const ListImageProduct = ({ id, maxWidth, maxHeight }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await findListImageByIdProductDetail(id);
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };
        fetchImage();
    }, [id]);

    return (
        <div className='d-flex flex-row'>
            {images && images.length > 0 ? (
                images.map((image, index) => (
                    <img
                        key={index} // Thêm key cho mỗi phần tử trong danh sách
                        src={`data:image/jpeg;base64,${image.imageByte}`}
                        alt={`Product ${index}`}
                        className="d-block w-100 mx-3"
                        style={{
                            objectFit: 'cover',
                            maxWidth: maxWidth,
                            maxHeight: maxHeight,
                        }}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/100x100"; // Placeholder image if error
                        }}
                    />
                ))
            ) : (
                <img src="https://placehold.co/100x100" alt="Placeholder" />
            )}
        </div>
    );
};

export default ListImageProduct;
