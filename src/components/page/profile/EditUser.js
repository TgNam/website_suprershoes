import React, { useState, useEffect } from "react";
import "./EditUser.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { findAccountRequest } from "../../../redux/action/AccountAction";
import { updateAccount } from "../../../Service/ApiAccountService";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";
import { getAccountLogin } from '../../../Service/ApiAccountService';

const EditUserInfoForm = ({ idCustomer, onSuccess }) => {
    
    const dispatch = useDispatch();
    const accountDetail = useSelector((state) => state.account.accountDetail);
    const [show, setShow] = useState(false);

    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Fetch account details when modal is opened
    useEffect(() => {
        if (show) {
            dispatch(findAccountRequest(idCustomer));
        }
    }, [dispatch, show, idCustomer]);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    // Validation schema
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required("Tên là bắt buộc")
            .min(2, "Tên phải chứa ít nhất 2 ký tự")
            .max(50, "Tên không được vượt quá 50 ký tự")
            .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Tên không được chứa số hoặc ký tự đặc biệt"),
        phoneNumber: yup.string()
            .required("Số điện thoại là bắt buộc")
            .matches(/^0[0-9]{9,10}$/, "Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số"),
        gender: yup.string().required("Giới tính là bắt buộc"),
        birthday: yup.date().required("Ngày sinh là bắt buộc").max(minAge, "Bạn phải ít nhất 18 tuổi"),
    });

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const updatedUser = { ...values };
            try {
                const response = await updateAccount(idCustomer, updatedUser);
                if (response.status === 200) {
                    dispatch(findAccountRequest(idCustomer));
                    resetForm();
                    handleClose();
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật người dùng:", error);
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật thông tin. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Chỉnh sửa thông tin
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: accountDetail?.name || "",
                            phoneNumber: accountDetail?.phoneNumber || "",
                            birthday: accountDetail?.birthday
                                ? accountDetail.birthday.split("T")[0]
                                : "",
                            gender: accountDetail?.gender || "1",
                        }}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <div className="form-group">
                                    <label>Họ và tên:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>

                                {/* Phone Number Field */}
                                <div className="form-group">
                                    <label>Số điện thoại:</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <div className="text-danger">{errors.phoneNumber}</div>
                                    )}
                                </div>

                                {/* Birthday Field */}
                                <div className="form-group">
                                    <label>Ngày sinh:</label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        className="form-control"
                                        value={values.birthday}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.birthday && errors.birthday && (
                                        <div className="text-danger">{errors.birthday}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Giới tính:</label>
                                </div>

                                {/* Gender Field */}
                                <div className="">

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="nam"
                                            value="1"
                                            checked={values.gender === 1}
                                            onChange={() => setFieldValue('gender', 1)}
                                        />
                                        <label className="form-check-label" htmlFor="nam">
                                            Nam
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="nu"
                                            value="2"
                                            checked={values.gender === 2}
                                            onChange={() => setFieldValue('gender', 2)}
                                        />
                                        <label className="form-check-label" htmlFor="nu">
                                            Nữ
                                        </label>
                                    </div>
                                    {touched.gender && errors.gender && <div className="text-danger">{errors.gender}</div>}
                                </div>

                                {/* Modal Footer */}
                                <div className="modal-footer">
                                    <Button variant="secondary" onClick={handleClose}>
                                        Hủy
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Cập nhật
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditUserInfoForm;
