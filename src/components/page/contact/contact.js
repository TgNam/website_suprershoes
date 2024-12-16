import React from 'react';
import { Link } from 'react-router-dom'; // For routing
import './contact.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { postCreateNewAccount } from '../../../Service/ApiAccountService';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Formik } from 'formik';

const Contact = () => {
  const dispatch = useDispatch();

  // Validation schema for form inputs
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Họ và tên là bắt buộc')
      .min(2, 'Tên phải chứa ít nhất 2 ký tự')
      .max(50, 'Tên không được vượt quá 50 ký tự'),
    phoneNumber: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/^0[0-9]{9,10}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    birthday: yup.date().required('Ngày sinh là bắt buộc'),
    gender: yup
      .string()
      .required('Giới tính là bắt buộc')
      .oneOf(['1', '2'], 'Vui lòng chọn giới tính hợp lệ'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      };
      try {
        const response = await postCreateNewAccount(payload);
        if (response.status === 200) {
          toast.success(response.data);
          resetForm();
        }
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
    }
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
          alt="Contact"
          className="img-fluid"
        />
      </div>

      <div className="formdk col-6">
        <div className="form-panelDK one">
          <div className="form-header">
            <h1>Đăng Ký</h1>
          </div>
          <div className="form-content">
            <Formik
              initialValues={{
                name: '',
                phoneNumber: '',
                email: '',
                birthday: '',
                gender: '',
                role: 'CUSTOMER',
                status: 'ACTIVE',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="form-group col">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nhập họ và tên"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Nhập số điện thoại"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.phoneNumber && errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="birthday">Ngày sinh</label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={values.birthday}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.birthday && errors.birthday && <div className="text-danger">{errors.birthday}</div>}
                  </div>

                  <div className="form-group col">
                    <label className="labels">
                      <span className="text-danger">*</span> Giới tính:
                    </label>
                    <div className="gender-options">
                      <div className="">
                        <input

                          type="radio"
                          name="gender"
                          id="gender-male"
                          value="1"
                          checked={values.gender === '1'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label" htmlFor="gender-male">
                          Nam
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input

                          type="radio"
                          name="gender"
                          id="gender-female"
                          value="2"
                          checked={values.gender === '2'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label" htmlFor="gender-female">
                          Nữ
                        </label>
                      </div>
                    </div>
                    {touched.gender && errors.gender && (
                      <div className="text-danger">{errors.gender}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Đăng Ký
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
