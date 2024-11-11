import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Login.scss';


const LoginPage = () => {
    return (
        <div>
            <div className="bg">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Đăng nhập</h1>
                        </div>
                        <div className="form-content">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập</label>
                                    <input type="text" id="username" 
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật Khẩu</label>
                                    <input type="password" id="password" 
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label className="form-remember">
                                        <input type="checkbox"/>Nhớ tài khoản
                                    </label><a className="form-recovery link-item" href="/forgot-pass">Quên mật khẩu?</a>
                                </div>
                                <div className="form-group">
                                    <button variant="primary" type="submit" >Log In</button>
                                </div>
                                <p className="form-group text">
                                    Bạn chưa có tài khoản?
                                    <Link className="form-recovery link-item"  to="/register"> Đăng ký</Link>
                                </p>
                            </form>

                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;