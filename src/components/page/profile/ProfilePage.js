import { useState } from "react";
import "./Profile.scss";

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = "Valid contact number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted:", formData);
        }
    };

    return (
        <div className="profile-page my-3 p-3 rounded shadow-sm">
            <h6>Personal Info</h6>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Username</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                        </div>
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="col">
                        <label className="form-label">Email address</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">@</span>
                        </div>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="form-label">First Name</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Last Name</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Contact Number</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contact Number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                            <span className="input-group-text"><i className="fa fa-mobile"></i></span>
                        </div>
                        {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
                    </div>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default ProfilePage;
