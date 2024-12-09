import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createNewBrand } from '../../../../../redux/action/brandAction';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';
function ModelCreateBrand() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên hãng là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
            .matches(/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Tên không được chứa ký tự đặc biệt'),
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const createBrand = { ...values };
            dispatch(createNewBrand(createBrand));
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm hãng. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm hãng sản phẩm
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm hãng sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitCreate}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Label htmlFor="name"><span className="text-danger">*</span> Tên hãng:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name" // Đổi id thành name
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name} // Hiển thị lỗi
                                />
                                {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
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
        </>
    );
}

export default ModelCreateBrand;