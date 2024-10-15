import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createNewColor } from '../../../../../redux/action/colorAction';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';
function ModelCreateColor() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên màu sắc là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
            .matches(/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Tên không được chứa ký tự đặc biệt'),
        codeColor: yup.string()
            .required('Mã màu sắc là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const createColor = { ...values };
            dispatch(createNewColor(createColor));
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm màu sắc. Vui lòng thử lại sau.");
        }
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm màu sắc
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm màu sắc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            codeColor: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitCreate}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Label htmlFor="name"><span className="text-danger">*</span> Tên màu sắc:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name" // Đổi id thành name
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name} // Hiển thị lỗi
                                />
                                {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                <Form.Label htmlFor="name"><span className="text-danger">*</span> Mã màu sắc:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codeColor"
                                    value={values.codeColor}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name} // Hiển thị lỗi
                                />
                                {touched.codeColor && errors.codeColor && <div className="text-danger">{errors.codeColor}</div>}
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save
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

export default ModelCreateColor;