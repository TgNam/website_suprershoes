import React, { useState } from "react";
import "./EditUser.scss";

const EditPass = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
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
        console.log("Updated Password:", formData);
        // Add logic to handle password update, such as an API call.
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-info-form">
            <div className="row form-group">
                <div className="col-12">
                    <label>Mật khẩu cũ</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div className="actions">
                <button type="submit">CẬP NHẬT MẬT KHẨU</button>
                <button type="button" onClick={onCancel}>
                    HỦY
                </button>
            </div>
        </form>
    );
};

export default EditPass;
