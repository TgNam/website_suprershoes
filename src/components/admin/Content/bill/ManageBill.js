import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import './ManageBill.scss';
import Button from 'react-bootstrap/Button';
import TableBill from './TableBill';
const ManageBill = () => {
    const dispatch = useDispatch();
    const [searchCodeBill, setSearchCodeBill] = useState("");
    return (
        <div className="content">
            <div className="hender-bill p-3">
                <h3 className='text-center'>Quản lý hóa đơn</h3>
            </div>
            <div className="filter-bill mb-3">
                <div className='m-3 p-2'>
                    <h5 className=''>Bộ lọc hoá đơn</h5>
                    <hr></hr>
                    <div className='row mb-4'>
                        <div className='col-1'>
                            <label htmlFor="codeBill" className="form-label">Mã hóa đơn:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="text"
                                className="form-control"
                                id="codeBill"
                                placeholder="Tìm kiếm kích hóa đơn theo mã...."
                                onChange={(event) => setSearchCodeBill(event.target.value)}
                            />
                        </div>
                        <div className='col-1'>
                            <label htmlFor="codeBill" className="form-label">Loại hóa đơn:</label>
                        </div>
                        <div className='col-5'>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Loại hóa đơn</option>
                                <option value="1">Online</option>
                                <option value="2">Tại quầy</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-1'>
                            <label htmlFor="StartDate" className="form-label">Ngày bắt đầu:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="StartDate"
                            />
                        </div>
                        <div className='col-1'>
                            <label htmlFor="EndDate" className="form-label">Ngày kết thúc:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="EndDate"
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='d-flex justify-content-evenly'>
                            <Button variant="primary">Tìm kiếm</Button>
                            <Button variant="danger">Làm mơi</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-bill p-3'>
                <h5 className=''>Danh sách hoá đơn</h5>
                <hr></hr>
                <div className='nav-tab-bill mb-3'>
                    <Nav justify variant="tabs" defaultActiveKey="all" className="my-nav-tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="all">Tất cả</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="1">
                                
                                Chờ xác nhận
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2">Xác nhận</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3">Đang giao</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="4">Hoàn thành</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="5">Đã hủy</Nav.Link>
                        </Nav.Item>
                    </Nav>

                </div>
                <div className='table-bill'>
                    <TableBill />
                </div>
            </div>
        </div>
    )
}
export default ManageBill;