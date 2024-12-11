import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBillDetailsAndPayments } from '../../../Service/ApiBillDetailService';
import '../../admin/Content/bill/ModalDetailBill.scss';
import { Button, Table, Alert, Modal } from 'react-bootstrap';
import { AiFillBank } from "react-icons/ai";
import { useSelector } from 'react-redux';
import TableBillHistory from '../../../components/admin/Content/bill/TableBillHistory';
import TableCart from './TableCart';
import Image from 'react-bootstrap/Image';
import imageCart from '../../../components/admin/Content/billByEmployee/image/imageCart.jpg';
import { fetchPostsPayBillOrderSuccess } from '../../../redux/action/PayBillOrderAction';
import { fetchAllPayBillOrder } from '../../../redux/action/PayBillOrderAction';
import { useDispatch } from 'react-redux';
import { fetchBillDetailByEmployeeByCodeBill } from '../../../redux/action/billDetailByEmployeeAction';
import { updateBillDetailByEmployee } from '../../../redux/action/billDetailByEmployeeAction'
import { toast } from 'react-toastify';
import { getAccountLogin } from '../../../Service/ApiAccountService';
import { useNavigate } from 'react-router-dom';
import { fetchAllBills } from '../../../redux/action/billAction';
import { FaCheckCircle, FaTruck, FaBoxOpen, FaClipboardCheck, FaTimesCircle, FaTrash } from 'react-icons/fa';

const ModalDetailBill = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listBillDetailOrder = useSelector((state) => state.billDetailOrder.listBillDetailOrder);
    const { codeBill } = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [payBill, setPayBill] = useState([]);
    const [billSummary, setBillSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [billHistory, setBillHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState({
        status1: false,
        status2: false,
        status3: false,
        status4: false,
        status5: false, // New status property
    });

    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentProduct = [...listBillDetailOrder];
    const billtable = useSelector((state) => state.bill.listBill);

    console.log(billtable);



    const [filters, setFilters] = useState({
        searchCodeBill: '',
        type: '',
        deliveryDate: '',
        receiveDate: '',
        status: '',
        page: 0,
        size: 10,
    });
    useEffect(() => {
        dispatch(fetchAllBills(filters)); // Dispatch fetch action with filters
    }, [filters, dispatch]);

    const totalPages = Math.ceil(currentProduct.length / itemsPerPage);
    const handleShowHistoryModal = () => setShowHistoryModal(true);
    const handleCloseHistoryModal = () => setShowHistoryModal(false);
    const firstProduct = billDetail[0] || {};

    const totalAmount = firstProduct.totalAmount || 0;
    const priceDiscount = firstProduct.priceDiscount || 0;
    const totalMerchandise = firstProduct.totalMerchandise || 0;

    useEffect(() => {
        dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
    }, [dispatch, codeBill]);

    useEffect(() => {
        setCurrentPage(1)
    }, [listBillDetailOrder]);
    // Hàm làm tròn và định dạng số
    const formatCurrency = (value) => {
        // Làm tròn thành số nguyên
        const roundedValue = Math.round(value);
        // Định dạng số thành chuỗi với dấu phẩy phân cách hàng nghìn
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchBillDetailsAndPayBill = async () => {
        setLoading(true);
        try {
            const data = await fetchBillDetailsAndPayments(codeBill);
            setBillSummary(data.billSummary);
            setBillDetail(data.billDetails);
            console.log('dat2a', data.billDetails);



            setPayBill(data.payBill);
            setBillHistory(data.billHistory);
            // setTotalPages(data.totalPages);
            if (data.billSummary) {
                updateStatus(data.billSummary.status);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const [show, setShow] = useState(false);




    const handleAddProductSuccess = () => {
        try {
            if (selectedProductIds && selectedProductIds.length > 0) {
                dispatch(updateBillDetailByEmployee(codeBill, selectedProductIds))
                dispatch(fetchBillDetailByEmployeeByCodeBill(codeBill));
                setSelectedProductIds([])
                setShow(false);
            } else {
                toast.error("Vui lòng lựa chọn sản phẩm.");
            }
        } catch (error) {
            toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        }
    };

    const updateStatus = (billStatus) => {
        const statusMap = {
            'PENDING': { status1: true, status2: false, status3: false, status4: false, status5: false },
            'CONFIRMED': { status1: true, status2: true, status3: false, status4: false, status5: false },
            'WAITTING_FOR_SHIPPED': { status1: true, status2: true, status3: true, status4: false, status5: false },
            'SHIPPED': { status1: true, status2: true, status3: true, status4: true, status5: false },
            'COMPLETED': { status1: true, status2: true, status3: true, status4: true, status5: true },
            'CANCELLED': { status1: false, status2: false, status3: false, status4: false, status5: false },
            'FAILED': { status1: true, status2: true, status3: true, status4: false, status5: false }, // New mapping
        };
        setStatus(statusMap[billStatus] || { status1: false, status2: false, status3: false, status4: false, status5: false });
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
                                <span className={`badge text-bg-${item.type === 1 ? 'warning' : 'danger'}`}>
                                    {item.type === 1 ? 'Trả trước' : 'Trả sau'}
                                </span>
                            </td>

                            <td className='text-center'>{item.namePayment}</td>

                        </>
                    ) : (
                        <>

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
        <div className="main p-5">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <div className="progress-container">
                        <div className="card card-timeline px-2 border-none">
                            <ul className={`bs4-order-tracking ${status.status5 || !status.status1 ? "disabled-tracking" : ""}`}>
                                {billSummary?.status === 'CANCELLED' ? (
                                    <li className="step cancelled text-center">
                                        <div className="d-flex justify-content-center">
                                            <FaTimesCircle size={48} />
                                        </div>
                                        <span className="text-danger fw-bold">Hóa đơn đã bị hủy</span>
                                    </li>
                                ) : billSummary?.status === 'FAILED' ? (
                                    ['Chờ xác nhận', 'Xác nhận', 'Chờ giao hàng', 'Đang giao', 'Giao hàng thất bại'].map((label, i) => {
                                        const isActive = i < 4; // Mark the first four steps as active
                                        return (
                                            <li key={i} className={`step ${isActive ? "active" : "failed"}`}>
                                                <div>
                                                    {i === 4 ? <FaTimesCircle size={48} /> : <FaCheckCircle />}
                                                </div>
                                                {label}
                                            </li>
                                        );
                                    })
                                ) : (
                                    ['Chờ xác nhận', 'Xác nhận', 'Chờ giao hàng', 'Đang giao', 'Hoàn thành'].map((label, i) => {
                                        const isActive = status[`status${i + 1}`];
                                        return (
                                            <li key={i} className={`step ${isActive ? "active" : ""}`}>
                                                <div>
                                                    {[
                                                        <FaClipboardCheck />, // "Chờ xác nhận"
                                                        <FaCheckCircle />,    // "Xác nhận"
                                                        <FaBoxOpen />,        // "Chờ giao hàng"
                                                        <FaTruck />,          // "Đang giao"
                                                        <FaCheckCircle />,    // "Hoàn thành"
                                                    ][i]}
                                                </div>
                                                {label}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>

                           

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
                                <Button variant="secondary" onClick={handleCloseHistoryModal} >
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>



                    <div className="history-pay m-3">
                        <h4>Lịch sử thanh toán</h4>
                        <Table striped bordered hover size="sm text-center">
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
                        </div>




                        {listBillDetailOrder && listBillDetailOrder.length > 0 ? (
                            <TableCart codeBill={codeBill} />
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center p-2">
                                <Image
                                    src={imageCart}
                                    className="text-center"
                                    style={{ width: '300px', height: 'auto' }}
                                />
                                <p className="mt-3">Không có sản phẩm nào </p>
                            </div>
                        )}


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
                                    {priceDiscount ? `${formatCurrency(priceDiscount)} VND` : '0 VND'}
                                </h5>


                            </div>
                            <hr />
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                                <h5>{formatCurrency(totalAmount)} VND</h5>
                            </div>
                            <Button
                                className="btn float-end"
                                variant="primary"
                                onClick={() => window.location.href = '/profile'}
                            >
                                Quay lại
                            </Button>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalDetailBill;