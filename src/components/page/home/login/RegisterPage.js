import React, { useState, useEffect } from 'react';
import "./RegisterPage.scss";
import {Link, useNavigate} from 'react-router-dom';



const RegisterPage = () => {

    return <>
        <div>
            <div class="bg">
                <div class="img"></div>
                <div class="formdk">
                    <div class="form-toggle"></div>
                    <div class="form-panelDK one">
                        <div class="form-header">
                            <h1>Đăng Ký</h1>
                        </div>
                        <div class="form-content">
                            <form>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label htmlFor="">Họ Đệm</label>
                                        <input type="text" id="firstName" name="firstName" required="required"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName">Tên</label>
                                        <input type="lastName" id="lastName" name="" required="required"/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="username">Tên đăng nhập</label>
                                    <input type="text" id="username" name="username" required="required" />
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="phone">SDT </label>
                                        <input type="text" id="phone" name="phone" required="required" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="">Email</label>
                                        <input type="email" id="email" name="email" required="required" />
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="password">Mật Khẩu</label>
                                        <input type="password" id="password" name="password" required="required" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="password">Xác Nhận Mật Khẩu</label>
                                        <input type="password" id="passwordRepeat" name="passwordRepeat" required="required" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit">Đăng Ký</button>
                                </div>
                                <p class="form-group text">
                                    Bạn đã có tài khoản?
                                    <Link class="form-recovery" to="/login"> Đăng nhập</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default RegisterPage;