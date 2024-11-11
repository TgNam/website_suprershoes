import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBillDetailsAndPayments, updateBillStatusAndNote, completeBill, deleteProductFromBill } from '../../../../Service/ApiBillDetailService';// Import the refactored API functions
import './ModalDetailBill.scss';
import { Button, Table, Pagination, Alert, Modal } from 'react-bootstrap';
import { AiFillBank } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import ModalUpdateCustomer from './ModalUpdateCustomer';
import ModalUpdateProduct from './ModalUpdateProduct';
import TableBillHistory from './TableBillHistory';
import { FaPenToSquare } from "react-icons/fa6";

const ModalDetailBill = () => {
    const { codeBill } = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [payBill, setPayBill] = useState([]);
    const [billSummary, setBillSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [billHistory, setBillHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [status, setStatus] = useState({ status1: false, status2: false, status3: false, status4: false });
    const [showHistoryModal, setShowHistoryModal] = useState(false);


    const formatCurrency = (value) => {
        if (!value) return 0;
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleShowHistoryModal = () => setShowHistoryModal(true);
    const handleCloseHistoryModal = () => setShowHistoryModal(false);


    const totalAmount = billDetail.reduce((acc, product) => acc + product.totalAmount, 0);
    const priceDiscount = billDetail.reduce((acc, product) => acc + product.priceDiscount, 0);
    const totalMerchandise = billDetail.reduce((acc, product) => acc + product.totalMerchandise, 0);

    const handleUpdateProduct = (productCode, nameColor) => {

        console.log('Cập nhật sản phẩm với mã sản phẩm:', productCode, 'và tên màu:', nameColor);


    };

    const fetchBillDetailsAndPayBill = async (currentPage) => {
        setLoading(true);
        try {
            const data = await fetchBillDetailsAndPayments(codeBill, currentPage);
            setBillSummary(data.billSummary);
            setBillDetail(data.billDetails);
            setPayBill(data.payBill);
            setBillHistory(data.billHistory);
            setTotalPages(data.totalPages);
            if (data.billSummary) {
                updateStatus(data.billSummary.status);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    const handleAddProductSuccess = () => {
        fetchBillDetailsAndPayBill(page);
    };


    const handleCancelBill = async () => {
        const note = prompt("Vui lòng nhập ghi chú cho việc hủy bỏ:", "");

        if (note) {
            try {
                await updateBillStatusAndNote(codeBill, 'CANCELLED', note);
                alert("Trạng thái hóa đơn đã được cập nhật thành 'Đã hủy' thành công.");

                fetchBillDetailsAndPayBill(page);
            } catch (error) {
                alert(error.message);
            }
        }
    };


    const handleCompleteBill = async () => {
        try {
            await completeBill(codeBill);
            alert("Trạng thái hóa đơn đã được cập nhật thành 'Hoàn thành' thành công.");

            fetchBillDetailsAndPayBill(page);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteProduct = async (productCode, nameColor, sizeName) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            try {
                await deleteProductFromBill(productCode, nameColor, sizeName);
                alert("Sản phẩm đã được xóa thành công.");
                fetchBillDetailsAndPayBill(page);
            } catch (error) {
                alert("Lỗi khi xóa sản phẩm: " + error.message);
            }
        }
    };

    const showStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Xác nhận';
            case 'CONFIRMED':
                return 'Đang giao';
            case 'SHIPPED':
                return 'Hoàn thành';
            case 'COMPLETED':
                return 'Đã hoàn tất';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return 'Hoàn thành';
        }
    };



    const updateStatus = (billStatus) => {
        const statusMap = {
            'PENDING': { status1: true, status2: false, status3: false, status4: false },
            'CONFIRMED': { status1: true, status2: true, status3: false, status4: false },
            'SHIPPED': { status1: true, status2: true, status3: true, status4: false },
            'COMPLETED': { status1: true, status2: true, status3: true, status4: true },
            'CANCELLED': { status1: false, status2: false, status3: false, status4: false },
        };
        setStatus(statusMap[billStatus] || { status1: false, status2: false, status3: false, status4: false });
    };


    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill(page);
        }
    }, [codeBill, page]);


    const renderTableRows = (data, type) => {
        return data.length > 0 ? (
            data.map((item, index) => (
                <tr key={item.tradingCode || item.productCode || `${item.productCode}-${index}`}>
                    <td className='text-center'>{index + 1}</td>
                    {type === "payment" ? (
                        <>
                            <td className='text-center'>{item.tradingCode}</td>
                            <td className='text-center'>{formatCurrency(item.amount)}</td>
                            <td className='text-center'>
                                <span className={`badge ${item.status === 'COMPLETED' ? 'text-bg-success' :
                                    item.status === 'PENDING_PAYMENT' ? 'text-bg-danger' : 'text-bg-warning'}`}>
                                    {item.status === 'COMPLETED' ? 'Đã thanh toán' :
                                        item.status === 'PENDING_PAYMENT' ? 'Chưa thanh toán' : 'Đang xử lý'}
                                </span>
                            </td>

                            <td className='text-center'>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className='text-center'>
                                <span className={`badge text-bg-${item.type === 0 ? 'success' : 'danger'}`}>
                                    {item.type === 0 ? 'Trả trước' : 'Trả sau'}
                                </span>
                            </td>

                            <td className='text-center'>{item.namePayment}</td>

                        </>
                    ) : (
                        <>
                            <td className='text-center'>
                                <img src={`data:image/jpeg;base64,${item.imageByte}`} alt="Product" className="product-image" />
                            </td>
                            <td className='text-center'>{item.nameProduct}</td>
                            <td className='text-center'>{item.nameColor}</td>
                            <td className='text-center'>{item.sizeName}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>{formatCurrency(item.totalAmount)}</td>

                            <td className='text-center'>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteProduct(item.productCode, item.nameColor, item.sizeName)} // Ensure item.nameColor exists
                                    disabled={billSummary?.status === 'SHIPPED' || billSummary?.status === 'COMPLETED' || billSummary?.status === 'CONFIRMED' || billSummary?.status === 'CANCELLED'}
                                >
                                    <MdDeleteOutline />
                                </Button>



                            </td>
                        </>
                    )}
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={type === "payment" ? 9 : 8} className='text-center'>No {type === "payment" ? 'payment history' : 'products'} found for this bill.</td>
            </tr>
        );
    };

    return (
        <div className="main">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <div className="progress-container">
                        <div className="card card-timeline px-2 border-none">
                            <ul className={`bs4-order-tracking ${status.status4 || !status.status1 ? "disabled-tracking" : ""}`}>
                                {['Chờ xác nhận', 'Xác nhận', 'Đang giao', 'Hoàn thành'].map((label, i) => {
                                    const isActive = status[`status${i + 1}`];
                                    const isCancelled = status.status === 'CANCELLED';

                                    return (
                                        <li
                                            key={i}
                                            className={`step ${isCancelled ? "deActive" : isActive ? "active" : ""}`}
                                        >
                                            <div><AiFillBank /></div>
                                            {label}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="bth m-3 text-center">
                                <Button
                                    variant="primary"
                                    className="m-3"
                                    disabled={status.status4 || !status.status1}
                                    onClick={handleCompleteBill}
                                >
                                    {showStatus(billSummary?.status)}
                                </Button>


                                <Button
                                    variant="danger"
                                    className="m-3"
                                    disabled={status.status4 || !status.status1}
                                    onClick={handleCancelBill}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="history-pay m-3 d-flex align-items-center">
                        <h4 className="me-3">Lịch sử hóa đơn:</h4>
                        {billHistory && billHistory.length > 0 ? (
                            <div className="d-flex flex-column" onClick={handleShowHistoryModal} style={{ cursor: 'pointer' }}>
                                <p className="mb-0 text-secondary">
                                    {new Date(billHistory[0].createdAt).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })} - {billHistory[0].note}
                                </p>
                            </div>
                        ) : (
                            <p className="mb-0">Không có lịch sử hóa đơn nào.</p>
                        )}

                        <Modal show={showHistoryModal} onHide={handleCloseHistoryModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết lịch sử hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <TableBillHistory onAddTableBillHistory={handleAddProductSuccess} codeBill={codeBill} />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseHistoryModal}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>



                    <div className="history-pay m-3">
                        <h4>Lịch sử thanh toán</h4>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th><th>Mã giao dịch</th><th>Số tiền</th><th>Trạng thái</th><th>Thời gian</th>
                                    <th>Loại giao dịch</th><th>Phương thức thanh toán</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(payBill, "payment")}</tbody>
                        </Table>
                    </div>

                    <div className="infBill m-3">
                        <div className="d-flex justify-content-between">
                            <h4>Thông tin đơn hàng: {codeBill}</h4>
                            {billSummary?.status !== 'SHIPPED' && billSummary?.status !== 'COMPLETED' && billSummary?.status !== 'CONFIRMED' && billSummary?.status !== 'CANCELLED' ? (
                                <ModalUpdateCustomer
                                    customerData={billSummary}
                                    onUpdate={() => fetchBillDetailsAndPayBill(page)}
                                />
                            ) : (
                                <Button variant="secondary" disabled>
                                    Cập nhật thông tin
                                </Button>
                            )}
                        </div>

                        {billSummary && (
                            <div className='row'>
                                <div className='col'>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Tên khách hàng:</h5>
                                        <h5>{billSummary.nameCustomer || ''}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Địa chỉ:</h5>
                                        <h5>{billSummary.address || ''}</h5>
                                    </div>
                                </div>
                                <div className='col'>

                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>SDT:</h5>
                                        <h5>{billSummary.phoneNumber || ''}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Ghi chú:</h5>
                                        <h5>{billSummary.note || ''}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="history-product m-3">
                        <div className="d-flex justify-content-between mb-3">
                            <h4>Thông tin sản phẩm đã mua</h4>
                            {billSummary?.status !== 'SHIPPED' && billSummary?.status !== 'COMPLETED' && billSummary?.status !== 'CONFIRMED' && billSummary?.status !== 'CANCELLED' ? (
                                <ModalUpdateProduct onAddProductSuccess={handleAddProductSuccess} />
                            ) : (
                                <Button variant="secondary" disabled>
                                    Thêm sản phẩm
                                </Button>
                            )}
                        </div>


                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th><th>Ảnh sản phẩm</th><th>Thông tin sản phẩm</th><th>Màu sắc</th><th>Size</th><th>Số lượng</th>
                                    <th>Tổng tiền</th><th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(billDetail, "product")}</tbody>
                        </Table>

                        <div className='d-flex justify-content-end'>
                            <Pagination>
                                <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
                                <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0} />
                                {[...Array(totalPages).keys()].map(p => (
                                    <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
                                        {p + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1} />
                                <Pagination.Last onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1} />
                            </Pagination>
                        </div>
                    </div>

                    <div className='moneyPay d-flex justify-content-end m-5'>
                        <div className=''>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền hàng:</h5>
                                <h5 className='text-center'>{formatCurrency(totalMerchandise)} VND</h5>
                            </div>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Voucher giảm giá:</h5>
                                <h5 className='text-center'>
                                    {priceDiscount ? `${formatCurrency(priceDiscount)} VND` : 'Không có'}
                                </h5>

                            </div>
                            <hr />
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                                <h5>{formatCurrency(totalAmount)} VND</h5>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalDetailBill;