import React from 'react';
import { Link } from 'react-router-dom'; // Add this import to use Link for routing
import './contact.scss';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., validation, API calls)
    console.log('Form submitted');
  };

  return (
    <div className="row pt-5">
      <div className="col-6 p-5">
        <h1 className="pb-4">Liên hệ:</h1>
        <label>Địa chỉ chúng tôi</label>
        <p className="ps-1">Cầu Giấy, Hà Nội, Việt Nam</p>
        <label>Email chúng tôi:</label>
        <p className="ps-1">supershoes@gmail.com</p>
        <label>Điện thoại:</label>
        <p className="ps-1">+84 888 888 888</p>
        <img
          src="https://i.imgur.com/G3BrgMJ.jpg"
          alt="Contact Image"
          className="img-fluid"
        />
      </div>

      <div className="formdk col-6">
        <div className="form-panelDK one">
          <div className="form-header">
            <h1>Đăng Ký</h1>
          </div>
          <div className="form-content">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="form-group col">
                  <label htmlFor="fullName">Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email"
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="birthDate">Ngày sinh</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                  />
                </div>
                <div className="form-group col">
                  <label>Giới tính</label>
                  <div className="gender-options">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                      />{" "}
                      Nam
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                      />{" "}
                      Nữ
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn-submit">
                    Đăng Ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
