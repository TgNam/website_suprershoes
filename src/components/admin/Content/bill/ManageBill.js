import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBills } from '../../../../redux/action/billAction'; // Redux action for fetching bills
import TableBill from './TableBill';
import QRCode from './QRCoder'; // Import the QRCode component
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Import Modal from react-bootstrap
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import './ManageBill.scss';
import { MdQrCodeScanner, MdSearch, MdResetTv, MdOutlineDocumentScanner } from "react-icons/md";

const ManageBill = () => {
    const dispatch = useDispatch();
    const { listBill, loading, error, totalPages, number } = useSelector((state) => state.bill); // Get bills from Redux state

    const [filters, setFilters] = useState({
        searchCodeBill: '',
        type: '',
        deliveryDate: '',
        receiveDate: '',
        status: '',
        page: 0,
        size: 10,
    });
    const [showQRCode, setShowQRCode] = useState(false); // Control the modal

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

    // Handle search button click
    const handleSearch = () => {
        setFilters((prevFilters) => ({ ...prevFilters, page: 0 }));
    };

    // Handle reset button click
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

    // Function to toggle QR code scanner modal
    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    // Function to handle scanned QR code data
    const handleScanComplete = (scannedData) => {
        setFilters((prevFilters) => ({ ...prevFilters, searchCodeBill: scannedData }));
        setShowQRCode(false); // Close the QR scanner modal after scanning
    };

    // Function to export listBill to Excel
    const handleExportToExcel = () => {
        // Convert bill data to a worksheet
        const ws = XLSX.utils.json_to_sheet(listBill.content); // Replace 'content' with your actual data field

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Bills');

        // Generate an Excel file and prompt the user to download it
        XLSX.writeFile(wb, 'Bills_Report.xlsx');
    };

    return (
        <div className="content">
            <div className="header-bill p-3">
                <h3 className="text-center">Quản lý hóa đơn</h3>
            </div>

            {/* Filter Section */}
            <div className="filter-bill mb-3">
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
                                <option value="">Loại hóa đơn</option>
                                <option value="1">Online</option>
                                <option value="0">Tại quầy</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-1">
                            <label htmlFor="deliveryDate" className="form-label">Ngày bắt đầu:</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="datetime-local"
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
                                type="datetime-local"
                                className="form-control"
                                id="receiveDate"
                                value={filters.receiveDate}
                                onChange={(event) => setFilters({ ...filters, receiveDate: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="d-flex justify-content-evenly">
                            <Button variant="primary" onClick={handleSearch}> <MdSearch /></Button>
                          
                            <Button variant="primary" onClick={handleExportToExcel}>
                            <MdOutlineDocumentScanner />
                            </Button>
                            <Button variant="primary" onClick={toggleQRCode}>
                            <MdQrCodeScanner />
                            </Button>
                            <Button variant="danger" onClick={handleReset}><MdResetTv/></Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* QRCode Modal */}
            <Modal show={showQRCode} onHide={toggleQRCode} centered>
                <Modal.Header closeButton>
                    <Modal.Title>QR Code Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QRCode onClose={toggleQRCode} onScanComplete={handleScanComplete} />
                </Modal.Body>
            </Modal>

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
                        <Nav.Link eventKey="SHIPPED" onClick={() => handleStatusChange('SHIPPED')}>Đang giao</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="COMPLETED" onClick={() => handleStatusChange('COMPLETED')}>Hoàn thành</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="CANCELLED" onClick={() => handleStatusChange('CANCELLED')}>Đã hủy</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Table with Pagination */}
                <TableBill bills={listBill} totalPages={totalPages} number={number} onPageChange={handlePageChange} />

                {/* Loading and Error Handling */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">Error: {error}</p>}
            </div>
        </div>
    );
};

export default ManageBill;
