import React, { useState } from "react";
import "./EditUser.scss";

const EditGmail = ({ onCancel }) => {
    // State for managing Gmail input
    const [formData, setFormData] = useState({
        email: "",
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Email:", formData.email);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-info-form">
            <div className="row form-group">
                <div className="col-12">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
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

export default EditGmail;
