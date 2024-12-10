import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { createNewAccount } from '../../../../../redux/action/AccountAction';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Formik } from 'formik';

function ModalCreateAccountCustomer() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    // Yup validation schema
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
            .matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên không được chứa số hoặc ký tự đặc biệt'),
        email: yup
            .string()
            .email('Email không hợp lệ')
            .required('Email là bắt buộc'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .test('isValidPhone', 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số', (value) =>
                /^0[0-9]{9,10}$/.test(value)
            )
            .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
            .max(11, 'Số điện thoại không được quá 11 chữ số'),
        gender: yup
            .string()
            .required('Giới tính là bắt buộc'),
        birthday: yup
            .date()
            .required('Ngày sinh là bắt buộc')
            .max(minAge, 'Bạn phải ít nhất 18 tuổi'),
        status: yup
            .string()
            .required('Trạng thái tài khoản là bắt buộc'),
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const createUser = { ...values };
            dispatch(createNewAccount(createUser))
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm người dùng. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='mx-2'>
                Thêm khách hàng mới
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khách hàng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phoneNumber: '',
                            gender: 1,
                            birthday: '',
                            role: 'CUSTOMER',
                            status: 'ACTIVE',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitCreate}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className="container rounded bg-white mt-5 mb-5">
                                    <div className="row">
                                        <div className="col-md-3 border-right">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                <img
                                                    className="rounded-circle mt-5"
                                                    width="150px"
                                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                                    alt="profile"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-5 border-right">
                                            <div className="p-3 py-5">
                                                <div className="row mt-2">
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Họ và tên của người dùng:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Tên người dùng"
                                                            name="name"
                                                            maxLength={50}
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Số điện thoại của người dùng:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Số điện thoại"
                                                            name="phoneNumber"
                                                            maxLength={11}
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.phoneNumber && errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Giới tính:</label>
                                                    </div>
                                                    <div className="col-md-12">
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
                                                    <div className="col-md-12">
                                                        <label className="labels"><span className="text-danger">*</span> Địa chỉ email của người dùng:</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="NguyenVanA@gmail.com"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                                                    </div>
                                                    {/* Add other fields similarly */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-3 py-5">
                                                <div className="col-md-12">
                                                    <label className="labels"><span className="text-danger">*</span> Ngày sinh:</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="birthday"
                                                        value={values.birthday}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {touched.birthday && errors.birthday && <div className="text-danger">{errors.birthday}</div>}
                                                </div>
                                                <br />
                                                <div className="col-md-12">
                                                    <label className="labels"><span className="text-danger">*</span> Trạng thái tài khoản:</label>
                                                    <select
                                                        className="form-select"
                                                        name="status"
                                                        value={values.status}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option value="ACTIVE">Kích hoạt</option>
                                                        <option value="INACTIVE">Khóa</option>
                                                    </select>
                                                    {touched.status && errors.status && <div className="text-danger">{errors.status}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu thông tin người dùng
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCreateAccountCustomer;
