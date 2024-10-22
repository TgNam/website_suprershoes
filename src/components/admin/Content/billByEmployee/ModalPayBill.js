
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalAddVoucher from './ModalAddVoucher';
import { MdPayment, MdPayments } from "react-icons/md";

const ModalPayBill = () => {
    return (
        <>
            <div className='pay-money'>
                <div>
                    <div className='title'>
                        <h5>Thanh toán hóa đơn</h5>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-6 mt-5'>
                        <Form>
                            <Form.Group className="mb-4" >
                                <Form.Control type="text" placeholder="Tên khách hàng" />
                            </Form.Group>
                            <Form.Group className="mb-4" >
                                <Form.Control type="text" placeholder="Số điện thoại khách hàng" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control type="text" placeholder="Địa chỉ khách hàng" />
                            </Form.Group>
                            <div className='row m-1 mb-4'>
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn tỉnh</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn quận</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Select aria-label="Default select example" className='col m-1'>
                                    <option>Chọn phường xã</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={5} placeholder='Ghi chú' />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col-6'>
                        <h5><MdPayments /> Thông tin thanh toán</h5>
                        <hr />
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Khách thanh toán: </h6>
                            <Button style={{ width: '100px' }}><MdPayment /></Button>

                            <h6 className='pt-2'>0 VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Mã giảm giá: </h6>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>
                            <ModalAddVoucher />
                        </div>
                        <div className='d-flex justify-content-start mb-3'>
                            <h6 className='pt-2'>Trả sau: </h6>
                            <Form>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    className='m-2 ms-5'
                                />
                            </Form>
                        </div>
                        <div className='d-flex justify-content-start mb-3'>
                            <h6 className='pt-2'>Giao hàng: </h6>
                            <Form>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    className='m-2 ms-5'
                                />
                            </Form>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Tiền hàng: </h6>
                            <h6 className='pt-2'>0 VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h6 className='pt-2'>Giảm giá: </h6>
                            <h6 className='pt-2'>0 VND </h6>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <h5 className='pt-2'>Tổng tiền: </h5>
                            <h5 className='pt-2' style={{ color: 'red' }}>0 VND </h5>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <Button style={{ width: '30%' }}>Xác nhận thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ModalPayBill;