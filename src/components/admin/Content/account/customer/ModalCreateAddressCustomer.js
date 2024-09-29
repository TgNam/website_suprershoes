// ModalCreateAddressCustomer.js
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';

function ModalCreateAddressCustomer({ onSubmitSuccess }) {
    const [show, setShow] = useState(true); // Modal mặc định mở khi được render

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            // Logic thêm địa chỉ mới
            resetForm();
            toast.success("Thêm địa chỉ thành công!");
            handleClose();
            onSubmitSuccess(); // Gọi hàm này để mở lại ModalAddressCustomer sau khi submit thành công
        } catch (error) {
            toast.error("Lỗi khi thêm địa chỉ. Vui lòng thử lại sau.");
        }
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Tên là bắt buộc').min(2, 'Tên phải chứa ít nhất 2 ký tự').max(50, 'Tên không được vượt quá 50 ký tự'),
        phoneNumber: yup.string().required('Số điện thoại là bắt buộc').test('isValidPhone', 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số', (value) => /^0[0-9]{9,10}$/.test(value))
    });

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm địa chỉ mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: '',
                        phoneNumber: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitCreate}
                >{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.name && !!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" type="submit">
                                Lưu
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCreateAddressCustomer;
