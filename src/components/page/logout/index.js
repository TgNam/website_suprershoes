import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();

    localStorage.removeItem("accessToken");
    navigate("/");
    return<>Logout Page</>

}