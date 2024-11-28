import React, { useState, useEffect } from 'react';
import { findListImageByIdProductDetail } from '../Service/ApiProductImage';

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
        <>
            {images && images.length > 0 ? (
                <div
                    id={`productCarousel-${id}`} // Dùng id duy nhất cho mỗi carousel
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ maxWidth: maxWidth }}
                >
                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target={`#productCarousel-${id}`} // Dùng id duy nhất cho mỗi indicator
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    {/* Carousel Items */}
                    <div className="carousel-inner">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${image.imageByte}`}
                                    alt={`Product ${index}`}
                                    className="d-block w-100"
                                    style={{
                                        objectFit: 'cover',
                                        maxWidth: maxWidth,
                                        maxHeight: maxHeight,
                                    }}
                                    onError={(e) => {
                                        e.target.src = "https://placehold.co/100x100"; // Placeholder image if error
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#productCarousel-${id}`} // Dùng id duy nhất cho mỗi control
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#productCarousel-${id}`} // Dùng id duy nhất cho mỗi control
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : (
                <img src="https://placehold.co/100x100" alt="Placeholder" />
            )}
        </>
    );
};

export default ListImageProduct;
