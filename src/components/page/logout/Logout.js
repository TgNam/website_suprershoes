import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }, [navigate]);
    return <>Logout Page</>

}