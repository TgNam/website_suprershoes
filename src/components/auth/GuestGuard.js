import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const GuestGuard = ({children})=>{
    const navigate = useNavigate();
    const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);

    if(!isInitialized) return <>Loading...</>
    if(isAuthenticated) {
        navigate("/");
        return;
    }
    return <>{children}</>
} 
export default GuestGuard;