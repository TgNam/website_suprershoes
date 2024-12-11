import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page403.scss'; 

const Page403 = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div className="container-fluid page403-container">
            <h1 className="page403-title">403</h1>
            <p className="page403-message">Bạn không có quyền truy cập vào trang này.</p>
            <button className="page403-button" onClick={handleGoHome}>
                Quay về trang chủ
            </button>
        </div>
    );
};

export default Page403;
