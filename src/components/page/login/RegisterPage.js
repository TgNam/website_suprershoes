import React, { useState } from 'react';
import "./RegisterPage.scss";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createNewAccount } from '../../../redux/action/AccountAction';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Formik } from 'formik';

const RegisterPage = () => {
    const dispatch = useDispatch();

    // Yup validation schema
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Họ và tên là bắt buộc')
            .min(2, 'Họ và tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Họ và tên không được vượt quá 50 ký tự'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^0[0-9]{9,10}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số'),
        email: yup
            .string()
            .required('Email là bắt buộc')
            .email('Email không hợp lệ'),
        birthDate: yup
            .date()
            .required('Ngày sinh là bắt buộc')
            .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'Bạn phải ít nhất 18 tuổi'),
        gender: yup.string().required('Giới tính là bắt buộc'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Ensure additional fields (role, status) are included in the payload
            const payload = {
                ...values,
                role: 'CUSTOMER',
                status: 'ACTIVE',
            };
    
            // Dispatch the action with the payload
            dispatch(createNewAccount(payload));
            toast.success('Đăng ký thành công!');
            resetForm();
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
        }
    };
    

    return (
        <div className="register-container">
            <div className="bg p-5">
            
                <div className="formdk">
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
                                    birthDate: '',
                                    gender: 1,
                                    role: 'CUSTOMER',
                                    status: 'ACTIVE',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <div className="form-group col">
                                            <label htmlFor="name">Họ và tên</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                maxLength={50}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Nhập họ và tên"
                                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                            />
                                            {touched.name && errors.name && (
                                                <div className="invalid-feedback">{errors.name}</div>
                                            )}
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="phoneNumber">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Nhập số điện thoại"
                                                className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                                            />
                                            {touched.phoneNumber && errors.phoneNumber && (
                                                <div className="invalid-feedback">{errors.phoneNumber}</div>
                                            )}
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Nhập email"
                                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                            />
                                            {touched.email && errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>
                                        <div className="form-group col">
                                            <label htmlFor="birthDate">Ngày sinh</label>
                                            <input
                                                type="date"
                                                id="birthDate"
                                                name="birthDate"
                                                value={values.birthDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`form-control ${touched.birthDate && errors.birthDate ? 'is-invalid' : ''}`}
                                            />
                                            {touched.birthDate && errors.birthDate && (
                                                <div className="invalid-feedback">{errors.birthDate}</div>
                                            )}
                                        </div>
                                        <div className="form-group col">
                                            <label className="labels">
                                                <span className="text-danger">*</span> Giới tính:
                                            </label>
                                            <div className="gender-options">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
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
                                                        className="form-check-input"
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
                                            <button type="submit" className="btn-submit">
                                                Đăng Ký
                                            </button>
                                        </div>
                                        <p className="form-group text">
                                            Bạn đã có tài khoản?{" "}
                                            <Link className="form-recovery" to="/login">
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;