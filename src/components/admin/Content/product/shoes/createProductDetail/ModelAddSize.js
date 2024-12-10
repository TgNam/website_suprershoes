import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { IoIosAddCircle } from "react-icons/io";
import { fetchSizeByStatusActive, createNewSize } from '../../../../../../redux/action/sizeAction';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik } from 'formik';

function ModelAddSize({
    selectedSizes,
    setSelectedSizes
}) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const sizes = useSelector((state) => state.size.listSize);
    useEffect(() => {
        dispatch(fetchSizeByStatusActive());
    }, [dispatch]);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleSizeClick = (id) => {
        setSelectedSizes((prev) => {
            if (prev.includes(id)) {
                // Nếu ID đã có, xóa nó khỏi danh sách
                return prev.filter((sizeId) => sizeId !== id);
            } else {
                // Nếu ID chưa có, thêm nó vào danh sách
                return [...prev, id];
            }
        });
    };
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
            dispatch(fetchSizeByStatusActive());
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm kích cỡ. Vui lòng thử lại sau.");
        }
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <IoIosAddCircle />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm size</Modal.Title>
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
                                    <Button variant="primary" type="submit">
                                        Thêm kích cỡ
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                    {sizes.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`btn m-2 ${selectedSizes.includes(item.id)
                                ? "btn-primary"
                                : "btn-outline-primary"
                                }`}
                            onClick={() => handleSizeClick(item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModelAddSize;
