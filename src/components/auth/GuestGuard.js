import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const GuestGuard = ({ children }) => {
    const navigate = useNavigate();
    const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);

    if (!isInitialized)
        return (
            <div className="spinner-wrapper">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (isAuthenticated) {
        navigate("/");
        return;
    }
    return <>{children}</>
}
export default GuestGuard;