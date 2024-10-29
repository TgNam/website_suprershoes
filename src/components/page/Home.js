import React, { useState, useEffect } from 'react';
// import TableAccount from './TableAccount';
import LocationForm from './LocationForm';
import ModelAddImage from './ModelAddImage';
import ModelAddListImage from './ModelAddListImage';
import Button from 'react-bootstrap/Button';
import Countdown  from './Countdown'
import axios from 'axios';
const Home = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách ảnh
        axios.get('http://localhost:8080/api/image/listProductImage')
            .then(response => {
                setImages(response.data);
                console.log("Images fetched successfully", response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the images!", error);
            });
    }, []);
    return (
        <>
            <LocationForm />
            <ModelAddImage />
            <ModelAddListImage />
            <Countdown/>
            <div>
                <h1>Product Images</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ margin: '10px' }}>
                            <img
                                src={`data:image/jpeg;base64,${image.imageByte}`}
                                alt={`Product ${index}`}
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;