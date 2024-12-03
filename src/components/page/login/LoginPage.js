import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authorizeAxiosInstance from "../../../hooks/authorizeAxiosInstance";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/action/authAction";
import { useNavigate } from "react-router-dom";
import GuestGuard from "../../auth/GuestGuard";
import { getAccountLogin } from "../../../Service/ApiAccountService";
import "./Login.scss";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    let vali = true;
    let newError = {
      username: "",
      password: "",
    };

    if (!username) {
      newError.username = "Vui lòng nhập tên đăng nhập!";
      vali = false;
    }
    if (!password) {
      newError.password = "Vui lòng nhập mật khẩu!";
      vali = false;
    }
    setError(newError);
    return vali;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        let userRq = {
          email: username,
          password,
        };
        let response = await authorizeAxiosInstance.post("auth/login", userRq);
        let accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        let user = await getAccountLogin();
        dispatch(signIn(user));
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <GuestGuard>
      <div>
        <div className="bg p-5">
          <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
              <div className="form-header">
                <h1>Đăng nhập</h1>
              </div>
              <div className="form-content">
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    {error.username && (
                      <span style={{ color: "red" }}>{error.username}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật Khẩu</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {error.password && (
                      <span style={{ color: "red" }}>{error.password}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <button
                      onClick={handleLogin}
                      variant="primary"
                      type="button"
                    >
                     Đăng nhập
                    </button>
                  </div>
                  <p className="form-group text">
                    Bạn chưa có tài khoản?
                    <Link className="form-recovery link-item" to="/register">
                      {" "}
                      Đăng ký
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
};
export default LoginPage;
