import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPromotion } from '../../../../../redux/action/promotionAction';
import TableProduct from './TableProduct';
import TableProductDetail from './TableProductDetail';
import './ModelCreatePromotion.scss';
export default function ModelCreatePromotion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedProductDetailIds, setSelectedProductDetailIds] = useState([]);

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Tên chương trình khuyến mãi là bắt buộc')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(50, 'Tên không được vượt quá 50 ký tự')
            .matches(/^[A-Za-zÀ-ỹ0-9\s]+$/, 'Tên không được chứa ký tự đặc biệt'),
        value: yup.number()
            .required('Giá trị khuyến mãi là bắt buộc')
            .positive('Giá trị phải lớn hơn 0')
            .max(99, 'Giá trị phải nhỏ hơn 100'),
        startAt: yup.date()
            .required('Ngày bắt đầu là bắt buộc')
            .test('is-future', 'Ngày bắt đầu phải sau thời điểm hiện tại', function (value) {
                const now = new Date(); // Lấy thời gian hiện tại
                return new Date(value) > now; // Kiểm tra ngày bắt đầu có sau thời điểm hiện tại không
            }),
        endAt: yup.date()
            .required('Ngày kết thúc là bắt buộc')
            .test('is-greater', 'Ngày kết thúc phải sau ngày bắt đầu', function (value) {
                const { startAt } = this.parent;  // Lấy giá trị của startAt từ formik
                return new Date(value) > new Date(startAt);  // So sánh các đối tượng Date
            })
            .test('is-future-end', 'Ngày kết thúc không được trước thời điểm hiện tại', function (value) {
                const now = new Date(); // Lấy thời gian hiện tại
                return new Date(value) > now; // Kiểm tra ngày kết thúc có sau thời điểm hiện tại không
            }),
        note: yup.string()
            .max(255, 'Ghi chú không được vượt quá 255 ký tự'),
    });




    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            const promotionRequest = {
                ...values,
                startAt: new Date(values.startAt).toISOString(),
                endAt: new Date(values.endAt).toISOString()
            };
            const promotionDetailRequest = [...selectedProductDetailIds];;
            const promotionCreationRequest = {
                promotionDetailRequest,
                promotionRequest,
            };
            console.log(promotionCreationRequest)
            dispatch(createNewPromotion(promotionCreationRequest));
            resetForm();
            navigate('/admins/manage-promotion');
        } catch (error) {
            toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="model-create-promotion container p-2">
            <h4 className='text-center p-2'>Thêm chương trình khuyến mãi</h4>
            <div className='model-promotion-product mx-2 row'>
                <Formik
                    initialValues={{
                        name: '',
                        type: '1',
                        value: '',
                        startAt: '',
                        endAt: '',
                        note: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitCreate}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <div className='model-promotion col'>
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputNamePromotion"><span className="text-danger">*</span> Tên chương trình khuyến mãi:</Form.Label>
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
                                        <Form.Label htmlFor="inputType"><span className="text-danger">*</span> Loại khuyến mãi:</Form.Label>
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
                                        <Form.Label htmlFor="inputValue"><span className="text-danger">*</span> Giá trị (%)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="Value"
                                            name="value"
                                            min={0}
                                            value={values.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.value && errors.value && <div className="text-danger">{errors.value}</div>}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="StartDate"><span className="text-danger">*</span> Ngày bắt đầu</Form.Label>
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
                                        <Form.Label htmlFor="EndDate"><span className="text-danger">*</span> Ngày kết thúc</Form.Label>
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
                                        <Form.Label htmlFor="inputNote">Ghi chú:</Form.Label>
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
