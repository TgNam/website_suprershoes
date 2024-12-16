import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBills } from '../../../../redux/action/billAction';
import TableBill from './TableBill';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './ManageBill.scss';
import Modal from 'react-bootstrap/Modal';
import { MdSearch, MdResetTv, MdQrCodeScanner } from "react-icons/md";
import PrintBillButton from './PrintBillButton';

const ManageBill = () => {
    const dispatch = useDispatch();
    const { listBill, loading, error, totalPages, number } = useSelector((state) => state.bill);

    const [filters, setFilters] = useState({
        searchCodeBill: '',
        type: '',
        deliveryDate: '',
        receiveDate: '',
        status: '',
        page: 0,
        size: 10,
    });

    // Fetch bills on component mount and when filters change
    useEffect(() => {
        dispatch(fetchAllBills(filters)); // Dispatch fetch action with filters
    }, [filters, dispatch]);

    // Handle status change
    const handleStatusChange = (status) => {
        setFilters((prevFilters) => ({ ...prevFilters, status, page: 0 }));
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setFilters((prevFilters) => ({ ...prevFilters, page: pageNumber }));
    };
    const handleReset = () => {
        setFilters({
            searchCodeBill: '',
            type: '',
            deliveryDate: '',
            receiveDate: '',
            status: '',
            page: 0,
            size: 10,
        });
    };

    return (
        <div className="content">

            {/* Filter Section */}
            <div className="filter-bill mb-3">
                <div className="header-bill p-3">
                    <h3 className="text-center pt-3">Quản lý hóa đơn</h3>
                </div>
                <div className="m-3 p-2">
                    <h5>Bộ lọc hoá đơn</h5>
                    <hr />
                    <div className="row mb-4">
                        <div className="col-1">
                            <label htmlFor="searchCodeBill" className="form-label">Mã hóa đơn:</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="text"
                                className="form-control"
                                id="searchCodeBill"
                                placeholder="Tìm kiếm hóa đơn theo mã..."
                                value={filters.searchCodeBill}
                                onChange={(event) => setFilters({ ...filters, searchCodeBill: event.target.value })}
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="type" className="form-label">Loại hóa đơn:</label>
                        </div>
                        <div className="col-5">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={filters.type}
                                onChange={(event) => setFilters({ ...filters, type: event.target.value })}
                            >
                                <option value="">Tất cả</option>
                                <option value="1">Online</option>
                                <option value="2">Tại quầy</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-1">
                            <label htmlFor="deliveryDate" className="form-label">Ngày bắt đầu:</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="date"
                                className="form-control"
                                id="deliveryDate"
                                value={filters.deliveryDate}
                                onChange={(event) => setFilters({ ...filters, deliveryDate: event.target.value })}
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="receiveDate" className="form-label">Ngày kết thúc:</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="date"
                                className="form-control"
                                id="receiveDate"
                                value={filters.receiveDate}
                                onChange={(event) => setFilters({ ...filters, receiveDate: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="d-flex justify-content-evenly">
                            {/* <Button variant="primary" onClick={handleSearch}> <MdSearch /></Button> */}
                            <Button variant="danger" onClick={handleReset}><MdResetTv /></Button>
                            {/* <PrintBillButton /> */}


                        </div>
                    </div>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="body-bill p-3">
                <h5>Danh sách hoá đơn</h5>
                <hr />
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
                        <Nav.Link eventKey="WAITTING_FOR_SHIPPED" onClick={() => handleStatusChange('WAITTING_FOR_SHIPPED')}>Chờ giao hàng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="SHIPPED" onClick={() => handleStatusChange('SHIPPED')}>Đang giao</Nav.Link>
                    </Nav.Item>
                   
                    <Nav.Item>
                        <Nav.Link eventKey="COMPLETED" onClick={() => handleStatusChange('COMPLETED')}>Hoàn thành</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="FAILED" onClick={() => handleStatusChange('FAILED')}>Giao thất bại</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="CANCELLED" onClick={() => handleStatusChange('CANCELLED')}>Đã hủy</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Table with Pagination */}
                <TableBill bills={listBill} totalPages={totalPages} number={number} onPageChange={handlePageChange} />

                {/* Loading and Error Handling */}
                {/* {loading && <p>Loading...</p>}
                {error && <p className="text-danger">Error: {error}</p>} */}
            </div>
        </div>
    );
};

export default ManageBill;
