import React, { useState, useEffect } from 'react';
import TableBill from './TableBill';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './ManageBill.scss';


const ManageBill = () => {
    const [bills, setBills] = useState({
        content: [],
        totalPages: 1,
        number: 0,
        size: 10,
    });
    const [filters, setFilters] = useState({
        searchCodeBill: '',
        type: '',
        deliveryDate: '',
        receiveDate: '',
        status: '',
        page: 0,
        size: 10
    });

    const fetchBills = (currentFilters = filters) => {
        const { status, searchCodeBill, type, deliveryDate, receiveDate, page, size } = currentFilters;

        const formattedDeliveryDate = deliveryDate ? new Date(deliveryDate).toISOString().split('.')[0] : null;
        const formattedReceiveDate = receiveDate ? new Date(receiveDate).toISOString().split('.')[0] : null;

        axios.get('http://localhost:8080/bill/list-bills', {
            params: {
                status,
                codeBill: searchCodeBill,
                type,
                deliveryDate: formattedDeliveryDate,
                receiveDate: formattedReceiveDate,
                page,
                size
            }
        })
        .then(response => {
            setBills(response.data);
        })
        .catch(error => {
            console.error('Error fetching bills:', error);
        });
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleStatusChange = (status) => {
        setFilters(prevFilters => {
            const updatedFilters = {
                ...prevFilters,
                status: status,
                page: 0
            };
            fetchBills(updatedFilters);
            return updatedFilters;
        });
    };

    const handlePageChange = (pageNumber) => {
        setFilters(prevFilters => {
            const updatedFilters = {
                ...prevFilters,
                page: pageNumber
            };
            fetchBills(updatedFilters);
            return updatedFilters;
        });
    };

    const handleSearch = () => {
        setFilters(prevFilters => {
            const updatedFilters = {
                ...prevFilters,
                page: 0
            };
            fetchBills(updatedFilters);
            return updatedFilters;
        });
    };

    const handleReset = () => {
        const resetFilters = {
            searchCodeBill: '',
            type: '',
            deliveryDate: '',
            receiveDate: '',
            status: '',
            page: 0,
            size: 10
        };
        setFilters(resetFilters);
        fetchBills(resetFilters);
    };

    return (
        <div className="content">
            <div className="header-bill p-3">
                <h3 className='text-center'>Quản lý hóa đơn</h3>
            </div>
            <div className="filter-bill mb-3">
                <div className='m-3 p-2'>
                    <h5>Bộ lọc hoá đơn</h5>
                    <hr />
                    <div className='row mb-4'>
                        <div className='col-1'>
                            <label htmlFor="searchCodeBill" className="form-label">Mã hóa đơn:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="text"
                                className="form-control"
                                id="searchCodeBill"
                                placeholder="Tìm kiếm hóa đơn theo mã..."
                                value={filters.searchCodeBill}
                                onChange={(event) => setFilters({
                                    ...filters,
                                    searchCodeBill: event.target.value
                                })}
                            />
                        </div>
                        <div className='col-1'>
                            <label htmlFor="type" className="form-label">Loại hóa đơn:</label>
                        </div>
                        <div className='col-5'>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={filters.type}
                                onChange={(event) => setFilters({
                                    ...filters,
                                    type: event.target.value
                                })}
                            >
                                <option value="">Loại hóa đơn</option>
                                <option value="1">Online</option>
                                <option value="0">Tại quầy</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-1'>
                            <label htmlFor="deliveryDate" className="form-label">Ngày bắt đầu:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="deliveryDate"
                                value={filters.deliveryDate}
                                onChange={(event) => setFilters({
                                    ...filters,
                                    deliveryDate: event.target.value
                                })}
                            />
                        </div>
                        <div className='col-1'>
                            <label htmlFor="receiveDate" className="form-label">Ngày kết thúc:</label>
                        </div>
                        <div className='col-5'>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="receiveDate"
                                value={filters.receiveDate}
                                onChange={(event) => setFilters({
                                    ...filters,
                                    receiveDate: event.target.value
                                })}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='d-flex justify-content-evenly'>
                            <Button variant="primary" onClick={handleSearch}>Tìm kiếm</Button>
                            <Button variant="danger" onClick={handleReset}>Làm mới</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-bill p-3'>
                <h5>Danh sách hoá đơn</h5>
                <hr />
                <div className='nav-tab-bill mb-3'>
                    <Nav justify variant="tabs" defaultActiveKey="all" className="my-nav-tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="all" onClick={() => handleStatusChange('')}>Tất cả</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="PENDING" onClick={() => handleStatusChange('PENDING')}>Chờ xác nhận</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="CONFIRMED" onClick={() => handleStatusChange('CONFIRMED')}>Xác nhận</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="SHIPPED" onClick={() => handleStatusChange('SHIPPED')}>Đang giao</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="COMPLETED" onClick={() => handleStatusChange('COMPLETED')}>Hoàn thành</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="CANCELLED" onClick={() => handleStatusChange('CANCELLED')}>Đã hủy</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className='table-bill'>
                    <TableBill bills={bills} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
};

export default ManageBill;
