import React, { useState } from "react";
import "./EditUser.scss";

const EditUserInfoForm = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: "Wang",
        lastName: "Wang",
        day: "9",
        month: "8",
        year: "1997",
        gender: "Nam",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Information:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-info-form">
            <div className="row form-group">
                <div className="col-12">
                    <label>Tên</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <label>Họ</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <label>Ngày Sinh</label>
                    <div>
                        <input
                            type="date"
                            name="day"
                            value={formData.day}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-6">
                    <label>Giới Tính</label>
                    <div className="gender-options">
                        <div>
                            <input
                                type="radio"
                                id="gender-male"
                                name="gender"
                                value="Nam"
                                checked={formData.gender === "Nam"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="gender-male">Nam</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="gender-female"
                                name="gender"
                                value="Nữ"
                                checked={formData.gender === "Nữ"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="gender-female">Nữ</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button type="submit">CẬP NHẬT THÔNG TIN</button>
                <button type="button" onClick={onCancel}>
                    HỦY
                </button>
            </div>
        </form>
    );
};

export default EditUserInfoForm;
