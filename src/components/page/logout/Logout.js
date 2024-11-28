import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {

    useEffect(() => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"
        return
    }, [window]);
    return <>Logout Page</>

}