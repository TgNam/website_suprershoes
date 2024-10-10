import React, { useState } from 'react';
import './ModalDetailBill.scss';
import { AiFillBank } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ModalUpdateCustomer from './ModalUpdateCustomer.js'
import ModalUpdateProduct from './ModalUpdateProduct.js';
const ModalDetailBill = () => {
    const status1 = true;
    const status2 = true;
    const status3 = true;
    const status4 = false;
    return (
        <div className="main">
            <div className="progress-container">
                <div className="card card-timeline px-2 border-none">
                    {/* Tùy vào trạng thái hóa đơn như nào thì sẽ thêm  active vào className*/}
                    <ul className="bs4-order-tracking">
                        <li className={status1 ? "step active" : "step"}>
                            <div><AiFillBank /></div>
                            Chờ xác nhận
                        </li>
                        <li className={status2 ? "step active" : "step"}>
                            <div><AiFillBank /></div>
                            Xác nhận
                        </li>
                        <li className={status3 ? "step active" : "step"}>
                            <div><AiFillBank /></div>
                            Đang giao
                        </li>
                        <li className={status4 ? "step active" : "step"}>
                            <div><AiFillBank /></div>
                            Hoàn thành
                        </li>
                    </ul>
                    <div className="bth m-3 text-center">
                        <Button variant="primary" className="m-3">Hoàn thành</Button>
                        <Button variant="danger" className="m-3">Hủy</Button>
                    </div>
                </div>
            </div>
            <div className="history-pay m-3">
                <h4>Lịch sử thanh toán</h4>
                <hr></hr>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th className=' text-center'>STT</th>
                            <th className=' text-center'>Mã giao dịch</th>
                            <th className=' text-center'>Số tiền</th>
                            <th className=' text-center'>Trạng thái</th>
                            <th className=' text-center'>Thời gian</th>
                            <th className=' text-center'>Loại giao dịch</th>
                            <th className=' text-center'>Phương thức thanh toán</th>
                            <th className=' text-center'>Ghi chú</th>
                            <th className=' text-center'>Người xác nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=' text-center'>1</td>
                            <td className=' text-center'>Pay0841610545215</td>
                            <td className=' text-center'>4.850.000 VND</td>
                            <td className=' text-center'>Tiền mặt</td>
                            <td className=' text-center'>23-08-2024</td>
                            <td className=' text-center'><h6><span className="badge text-bg-danger">Trả sau</span></h6></td>
                            <td className=' text-center'><h6><span className="badge text-bg-success">Tiền mặt</span></h6></td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>|</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="infBill m-3">
                <div className="d-flex justify-content-between">
                    <h4>Thông tin đơn hàng: HD564645221</h4>
                    <ModalUpdateCustomer />
                </div>
                <hr></hr>
                <div className='row'>
                    <div className='col'>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Trạng thái:</h5>
                            <h5><span className="badge text-bg-danger">Trả sau</span></h5>
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Loại:</h5>
                            <h5><span className="badge text-bg-danger">Trả sau</span></h5>
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Địa chỉ:</h5>
                            <h5>Hà nội</h5>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Tên khách hàng:</h5>
                            <h5>Nguyễn Văn A</h5>
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>SDT:</h5>
                            <h5>09837292654</h5>
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Ghi chú:</h5>
                            <h5></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="history-product m-3">
                <div className="d-flex justify-content-between mb-3">
                    <h4>Thông tin sản phẩm đã mua</h4>
                    <ModalUpdateProduct />
                </div>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th className=' text-center'>STT</th>
                            <th className=' text-center'>Ảnh sản phẩm</th>
                            <th className=' text-center'>Thông tin sản phẩm</th>
                            <th className=' text-center'>Màu sắc</th>
                            <th className=' text-center'>Số lượng</th>
                            <th className=' text-center'>Tổng tiền</th>
                            <th className=' text-center'>Trạng thái</th>
                            <th className=' text-center'>Hàng động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=' text-center'>1</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>AIR MAX 1</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>2</td>
                            <td className=' text-center'>2.5000.000 VND</td>
                            <td className=' text-center'><h6><span className="badge text-bg-success">Thành công</span></h6></td>
                            <td className=' text-center'><Button variant="danger"><MdDeleteOutline /></Button></td>
                        </tr>
                        <tr>
                            <td className=' text-center'>2</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>AIR MAX 1</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>2</td>
                            <td className=' text-center'>2.5000.000 VND</td>
                            <td className=' text-center'><h6><span className="badge text-bg-success">Thành công</span></h6></td>
                            <td className=' text-center'><Button variant="danger"><MdDeleteOutline /></Button></td>
                        </tr>
                        <tr>
                            <td className=' text-center'>3</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>AIR MAX 1</td>
                            <td className=' text-center'>|</td>
                            <td className=' text-center'>2</td>
                            <td className=' text-center'>2.5000.000 VND</td>
                            <td className=' text-center'><h6><span className="badge text-bg-success">Thành công</span></h6></td>
                            <td className=' text-center'><Button variant="danger"><MdDeleteOutline /></Button></td>
                        </tr>
                    </tbody>
                </Table>
                <div className='d-flex justify-content-end'>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
            <div className='moneyPay d-flex justify-content-end m-5'>
                <div className=''>
                    <div className='status d-flex flex-row mb-3'>
                        <h5 className='mx-3'>Tổng tiền hàng:</h5>
                        <h5 >9.500.000 VND</h5>
                    </div>
                    <div className='status d-flex flex-row mb-3'>
                        <h5 className='mx-3'>Voucher giảm giá:</h5>
                        <h5>150.000 VND</h5>
                    </div>
                    <hr />
                    <div className='status d-flex flex-row mb-3'>
                        <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                        <h5>9.350.000 VND</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailBill;
