import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchAllProduct } from '../../../../../redux/action/productAction';
import TableProduct from './TableProduct';
import TableProductDetail from './TableProductDetail';
import './ModelCreatePromotion.scss';

export default function ModelCreatePromotion() {
    const dispatch = useDispatch();
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedProductDetailIds, setSelectedProductDetailIds] = useState([]);
    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);
    useEffect(() => {
        console.log(selectedProductDetailIds)
    }, [selectedProductDetailIds]);

    const validationSchema = yup.object().shape({
        codePromotion: yup.string()
            .required('Mã khuyến mãi là bắt buộc')
            .min(3, 'Mã khuyến mãi phải chứa ít nhất 3 ký tự'),
        name: yup.string()
            .required('Tên chương trình khuyến mãi là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự'),
        value: yup.number()
            .required('Giá trị khuyến mãi là bắt buộc')
            .positive('Giá trị phải lớn hơn 0'),
        startAt: yup.date()
            .required('Ngày bắt đầu là bắt buộc'),
        endAt: yup.date()
            .required('Ngày kết thúc là bắt buộc')
            .min(yup.ref('startAt'), 'Ngày kết thúc phải sau ngày bắt đầu'),
        quantity: yup.number()
            .required('Số lượng là bắt buộc')
            .positive('Số lượng phải lớn hơn 0'),
        note: yup.string()
            .max(255, 'Ghi chú không được vượt quá 255 ký tự'),
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const createUser = { ...values };

            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm người dùng. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="model-create-promotion container p-2">
            <h4 className='text-center p-2'>Thêm chương trình khuyến mãi</h4>
            <div className='model-promotion-product mx-2 row'>
                <Formik
                    initialValues={{
                        codePromotion: '',
                        name: '',
                        type: '',
                        value: '',
                        startAt: '1',
                        endAt: '',
                        quantity: '',
                        note: '',
                        status: 'ACTIVE',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitCreate}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <div className='model-promotion col'>
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputCodePromotion">Mã khuyến mãi</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="CodePromotion"
                                            name="codePromotion"
                                            value={values.codePromotion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.codePromotion && errors.codePromotion && <div className="text-danger">{errors.codePromotion}</div>}
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputNamePromotion">Tên chương trình khuyến mãi</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="NamePromotion"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.name && errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputType">Loại khuyến mãi</Form.Label>
                                        <Form.Select
                                            id="Type"
                                            name="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="1">Phần trăm</option>
                                        </Form.Select>
                                        {touched.type && errors.type && <div className="text-danger">{errors.type}</div>}
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputValue">Giá trị</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="Value"
                                            name="value"
                                            value={values.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.value && errors.value && <div className="text-danger">{errors.value}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="StartDate">Ngày bắt đầu</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="StartDate"
                                            name="startAt"
                                            value={values.startAt}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.startAt && errors.startAt && <div className="text-danger">{errors.startAt}</div>}
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="EndDate">Ngày kết thúc</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="EndDate"
                                            name="endAt"
                                            value={values.endAt}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.endAt && errors.endAt && <div className="text-danger">{errors.endAt}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="quantity">Số lượng:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={values.quantity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.quantity && errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputNote">Ghi chú</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            id="Note"
                                            name="note"
                                            value={values.note}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.note && errors.note && <div className="text-danger">{errors.note}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Button variant="info" type="submit">
                                            <IoIosAddCircleOutline /> Thêm chương trình khuyến mãi
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
                <div className='model-table-product col'>
                    <TableProduct
                        selectedProductIds={selectedProductIds}
                        setSelectedProductIds={setSelectedProductIds}
                    />
                </div>
            </div>
            <div className='model-product-detail mb-3'>
                <h5>Danh sách sản phẩm chi tiết</h5>
                <TableProductDetail
                    selectedProductIds={selectedProductIds}
                    selectedProductDetailIds={selectedProductDetailIds}
                    setSelectedProductDetailIds={setSelectedProductDetailIds}
                />
            </div>
        </div>
    );
}
