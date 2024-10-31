import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import TableUpdateProductPromotion from './TableUpdateProductPromotion';
import './ModelCreatePromotion.scss';
import { postsUpdatePromotion } from '../../../../../redux/action/promotionAction';

export default function ModelUpdatePromotion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { promotion } = useSelector(state => state.promotion);
    const [selectedPromotionDetailIds, setSelectedPromotionDetailIds] = useState([]);
    const [searchParams] = useSearchParams();
    const idPromotion = searchParams.get('idPromotion');

    const validationSchema = yup.object().shape({
        startAt: yup.date()
            .required('Ngày bắt đầu là bắt buộc')
            .test('is-after-initial', 'Ngày bắt đầu phải sau ngày bắt đầu hiện tại của khuyến mãi', function (value) {
                if (!promotion.startAt) return true; // Bỏ qua nếu `promotion.startAt` không tồn tại
                const promotionStartAt = new Date(promotion.startAt);
                return new Date(value) >= promotionStartAt;
            }),
        endAt: yup.date()
            .required('Ngày kết thúc là bắt buộc')
            .test('is-greater', 'Ngày kết thúc phải sau ngày bắt đầu', function (value) {
                const { startAt } = this.parent;
                return new Date(value) > new Date(startAt);
            })
            .test('is-future-end', 'Ngày kết thúc không được trước thời điểm hiện tại', function (value) {
                const now = new Date();
                return new Date(value) > now;
            })
    });

    const handleSubmitUpdate = async (values, { resetForm }) => {
        try {
            const promotionRequest = {
                id: values.id,
                startAt: new Date(values.startAt).toISOString(),
                endAt: new Date(values.endAt).toISOString()
            };
            const promotionDetailRequest = [...selectedPromotionDetailIds];
            const promotionUpdatesRequest = {
                promotionDetailRequest,
                promotionRequest,
            };
            console.log(promotionUpdatesRequest);
            // dispatch(postsUpdatePromotion(promotionUpdatesRequest));
            // resetForm();
            // navigate('/admins/manage-promotion');
        } catch (error) {
            toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        }
    };

    const formatEndDate = (date) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


    return (
        <div className="model-create-promotion container p-2">
            <h4 className='text-center p-2'>Cập nhật chương trình khuyến mãi</h4>
            <div className='model-promotion-product mx-2 row'>
                <Formik
                    enableReinitialize
                    initialValues={{
                        id: idPromotion,
                        name: promotion?.name || "",
                        type: '1',
                        value: promotion?.value || "",
                        startAt: promotion?.startAt ? formatEndDate(promotion.startAt) : "",
                        endAt: promotion?.endAt ? formatEndDate(promotion.endAt) : "",
                        note: promotion?.note || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitUpdate}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <div className='model-promotion col'>
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputNamePromotion">Tên chương trình khuyến mãi:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="NamePromotion"
                                            name="name"
                                            value={values.name}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputType">Loại khuyến mãi:</Form.Label>
                                        <Form.Select
                                            id="Type"
                                            name="type"
                                            value={values.type}
                                            disabled
                                        >
                                            <option value="1">Phần trăm</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="inputValue">Giá trị (%)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="Value"
                                            name="value"
                                            min={0}
                                            value={values.value}
                                            readOnly
                                        />
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
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Button variant="info" type="submit">
                                            <IoIosAddCircleOutline /> Cập nhật chương trình khuyến mãi
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
            <div className='model-product-detail mb-3'>
                <h5>Danh sách sản phẩm chi tiết</h5>
                <TableUpdateProductPromotion
                    selectedPromotionDetailIds={selectedPromotionDetailIds}
                    setSelectedPromotionDetailIds={setSelectedPromotionDetailIds}
                />
            </div>
        </div>
    );
}
