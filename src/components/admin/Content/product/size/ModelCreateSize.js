import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createNewSize } from '../../../../../redux/action/sizeAction';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';

function ModelCreateSize() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        name: yup
            .number()
            .typeError('Giá trị phải là một số')
            .required('Tên kích cỡ là bắt buộc')
            .min(35, 'Kích cỡ phải lớn hơn hoặc bằng 35')
            .max(50, 'Kích cỡ phải nhỏ hơn hoặc bằng 50')
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const createSize = { ...values };
            dispatch(createNewSize(createSize));
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm kích cỡ. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm kích cỡ
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm kích cỡ</Modal.Title>
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
                                <Form.Label htmlFor="name"><span className="text-danger">*</span> Tên kích cỡ:</Form.Label>
                                <Form.Control
                                    type="number"
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

export default ModelCreateSize;
