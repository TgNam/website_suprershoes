import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ModelAddQuanityPrice({ productDetail, setProductDetail, setSelectedProductDetail }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Schema validation với Yup
    const validationSchema = yup.object().shape({
        quantity: yup
            .number()
            .required('Số lượng không được để trống')
            .min(1, 'Số lượng phải lớn hơn hoặc bằng 1')
            .max(100000, 'Số lượng không vượt quá 100000')
            .integer('Số lượng phải là số nguyên'),
        price: yup
            .number()
            .required('Giá không được để trống')
            .max(100000000000, 'Giá không vượt quá 100,000,000,000')
            .min(0, 'Giá phải lớn hơn hoặc bằng 0'),

    });

    // Hàm xử lý cập nhật toàn bộ productDetail
    const handleUpdateDetails = (values) => {
        const { quantity, price } = values;
        const updatedDetails = productDetail.map((detail) => ({
            ...detail,
            quantity: parseInt(quantity, 10),
            price: parseFloat(price),
        }));

        setProductDetail(updatedDetails); // Cập nhật state ở cha
        setSelectedProductDetail([])
        handleClose(); // Đóng modal sau khi cập nhật
    };
    const formatCurrency = (value) => {
        if (!value) return "0";
        const roundedValue = Math.round(value);
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chỉnh số lượng và giá chung
            </Button>

            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa số lượng và giá</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{
                        quantity: 1, // Default value
                        price: 0, // Default value
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdateDetails}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <Modal.Body>
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label">
                                            Số lượng
                                        </label>
                                        <Field
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className="form-control"
                                            placeholder="Nhập số lượng mới"
                                            min='1'
                                            max='100000'
                                            value={values.quantity}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage
                                            name="quantity"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            Giá
                                        </label>
                                        <Field
                                            type="number"
                                            id="price"
                                            name="price"
                                            className="form-control"
                                            placeholder="Nhập giá mới"
                                            min='0'
                                            max='100000000000'
                                            value={values.price}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage
                                            name="price"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                >
                                    Lưu
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Formik>
            </Modal>
        </>
    );
}

export default ModelAddQuanityPrice;
