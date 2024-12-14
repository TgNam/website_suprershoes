import React from "react";
import { Link } from "react-router-dom";
import authorizeAxiosInstance from "../../../hooks/authorizeAxiosInstance";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/action/authAction";
import GuestGuard from "../../auth/GuestGuard";
import { getAccountLogin } from "../../../Service/ApiAccountService";
import { Formik } from "formik";
import * as yup from "yup";
import "./Login.scss";

const LoginPage = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập!")
      .email("Tên đăng nhập phải là email hợp lệ!"),
    password: yup.string().required("Vui lòng nhập mật khẩu!"),
  });

  const handleLogin = async (values) => {
    try {
      const userRq = {
        email: values.username,
        password: values.password,
      };
      try {
        const response = await authorizeAxiosInstance.post("auth/login", userRq);
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          // Phát tín hiệu login
          localStorage.setItem("loginEvent", Date.now());
          try {
            const account = await getAccountLogin();
            if (response.status === 200) {
              const user = account.data;
              dispatch(signIn(user));
              window.location.href = "/";
            }
          } catch (error) {
            window.location.href = "/login"
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error(error);
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
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.username && errors.username
                            ? "is-invalid"
                            : ""
                            }`}
                        />
                        {touched.username && errors.username && (
                          <div className="invalid-feedback">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Mật Khẩu</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${touched.password && errors.password
                            ? "is-invalid"
                            : ""
                            }`}
                        />
                        {touched.password && errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn-submit">
                          Đăng nhập
                        </button>
                      </div>
                      <p className="form-group text">
                        Bạn chưa có tài khoản?
                        <Link
                          className="form-recovery link-item"
                          to="/register"
                        >
                          {" "}
                          Đăng ký
                        </Link>
                      </p>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
};

export default LoginPage;
