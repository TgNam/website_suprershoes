import React, { useState } from 'react';
import "./RegisterPage.scss";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        gender: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

    };

    return (
        <div className="register-container">
            <div className="bg">
                <div className="img"></div>
                <div className="formdk">
                    <div className="form-panelDK one">
                        <div className="form-header">
                            <h1>Đăng Ký</h1>
                        </div>
                        <div className="form-content">
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group col">
                                        <label htmlFor="fullName">Họ và tên</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="phoneNumber">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Nhập email"
                                        />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="birthDate">Ngày sinh</label>
                                        <input
                                            type="date"
                                            id="birthDate"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col">
                                        <label>Giới tính</label>
                                        <div className="gender-options">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleInputChange}
                                                    required
                                                />{" "}
                                                Nam
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleInputChange}
                                                />{" "}
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn-submit">
                                            Đăng Ký
                                        </button>
                                    </div>
                                    <p className="form-group text">
                                        Bạn đã có tài khoản?{" "}
                                        <Link className="form-recovery" to="/login">
                                            Đăng nhập
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
