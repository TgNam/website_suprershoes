import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import TableProductPromotion from './TableProductPromotion';
import './ModelCreatePromotion.scss';
import { fetchPromotionAndProductPromotion,fetchSearchPromotionAndProductPromotion } from '../../../../../redux/action/promotionAction'
export default function ModelPromotionDetail() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { promotion } = useSelector(state => state.promotion);

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
            <h4 className='text-center p-2'>Thông tin chương trình khuyến mãi</h4>
            <div className='model-promotion-product mx-2 row'>
                <div className='model-promotion col'>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="inputNamePromotion">Tên chương trình khuyến mãi:</Form.Label>
                            <Form.Control
                                type="text"
                                id="NamePromotion"
                                name="name"
                                value={promotion.name}
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
                                value={promotion.type}
                                readOnly
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
                                value={promotion.value}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <Form.Label htmlFor="StartDate">Ngày bắt đầu</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="StartDate"
                                name="startAt"
                                value={formatEndDate(promotion.startAt)}
                                readOnly
                            />
                        </div>
                        <div className='col'>
                            <Form.Label htmlFor="EndDate">Ngày kết thúc</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="EndDate"
                                name="endAt"
                                value={formatEndDate(promotion.endAt)}
                                readOnly
                            />
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
                                value={promotion.note}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='model-product-detail mb-3'>
                <h5>Danh sách sản phẩm chi tiết</h5>
                <TableProductPromotion />
            </div>
        </div>
    );
}
