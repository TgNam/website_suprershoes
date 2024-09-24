import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModalDetailBill.scss';
import { AiFillBank } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ModalUpdateCustomer from './ModalUpdateCustomer';
import ModalUpdateProduct from './ModalUpdateProduct';
import axios from 'axios';

const ModalDetailBill = () => {
    const { codeBill } = useParams();  // Extract codeBill from the URL

    const [billDetail, setBillDetail] = useState([]);
    const [payBill, setPayBill] = useState([]);  // New state to hold PayBill details
    const [billSummary, setBillSummary] = useState(null);  // State for bill summary data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); // For pagination
    const [size, setSize] = useState(10); // Items per page
    const [totalPages, setTotalPages] = useState(0); // Total pages for pagination

    const [status, setStatus] = useState({
        status1: false,
        status2: false,
        status3: false,
        status4: false
    });

    // Function to fetch Bill Details, Bill Summary and Payment History
    useEffect(() => {
        const fetchBillDetailsAndPayBill = async (page) => {
            const trimmedCodeBill = codeBill?.trim();
            if (!trimmedCodeBill) {
                setError("Code bill cannot be empty.");
                setLoading(false);
                return;
            }

            try {
                // Fetch Bill Summary
                const billSummaryResponse = await axios.get('http://localhost:8080/bill/list-bill-summaries', {
                    params: { codeBill: trimmedCodeBill }
                });

                // Set bill summary details
                if (billSummaryResponse.data && billSummaryResponse.data.content.length > 0) {
                    const billSummaryData = billSummaryResponse.data.content[0];
                    setBillSummary(billSummaryData);

                    // Update status based on summary data
                    const statusMap = {
                        "PENDING": { status1: true, status2: false, status3: false, status4: false },
                        "CONFIRMED": { status1: true, status2: true, status3: false, status4: false },
                        "SHIPPING": { status1: true, status2: true, status3: true, status4: false },
                        "COMPLETED": { status1: true, status2: true, status3: true, status4: true }
                    };

                    setStatus(statusMap[billSummaryData?.status] || {
                        status1: false,
                        status2: false,
                        status3: false,
                        status4: false
                    });
                }

                // Fetch Bill Details
                const billResponse = await axios.get('http://localhost:8080/bill-detail/list-bill-details', {
                    params: {
                        codeBill: trimmedCodeBill,
                        page: page,
                        size: size
                    }
                });

                // Fetch Pay Bill (Payment History)
                const payBillResponse = await axios.get('http://localhost:8080/pay-bill/list-pay-bills', {
                    params: {
                        codeBill: trimmedCodeBill
                    }
                });

                // Handle Bill Details
                if (billResponse.data && billResponse.data.content.length > 0) {
                    const bill = billResponse.data.content;
                    setBillDetail(bill);
                    setTotalPages(billResponse.data.totalPages);
                } else {
                    setError("No bill found with the given code.");
                }

                // Handle Pay Bill (Payment History)
                if (payBillResponse.data && payBillResponse.data.content.length > 0) {
                    const payBillData = payBillResponse.data.content; // Access the content array
                    setPayBill(payBillData); // Store the content array in your state
                } else {
                    setPayBill([]); // Set to an empty array if no data
                }
            } catch (error) {
                setError("Failed to fetch bill details or payment history.");
            } finally {
                setLoading(false);
            }
        };

        if (codeBill) {
            fetchBillDetailsAndPayBill(page); // Fetch with the current page
        }
    }, [codeBill, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="main">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Progress bar for the bill status */}
            <div className="progress-container">
                <div className="card card-timeline px-2 border-none">
                    <ul className="bs4-order-tracking">
                        <li className={status.status1 ? "step active" : "step"}>
                            <div><AiFillBank /></div>Chờ xác nhận
                        </li>
                        <li className={status.status2 ? "step active" : "step"}>
                            <div><AiFillBank /></div>Xác nhận
                        </li>
                        <li className={status.status3 ? "step active" : "step"}>
                            <div><AiFillBank /></div>Đang giao
                        </li>
                        <li className={status.status4 ? "step active" : "step"}>
                            <div><AiFillBank /></div>Hoàn thành
                        </li>
                    </ul>
                    <div className="bth m-3 text-center">
                        <Button variant="primary" className="m-3">Hoàn thành</Button>
                        <Button variant="danger" className="m-3">Hủy</Button>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="history-pay m-3">
                <h4>Lịch sử thanh toán</h4>
               
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Mã giao dịch</th>
                            <th className='text-center'>Số tiền</th>
                            <th className='text-center'>Trạng thái</th>
                            <th className='text-center'>Thời gian</th>
                            <th className='text-center'>Loại giao dịch</th>
                            <th className='text-center'>Phương thức thanh toán</th>
                            <th className='text-center'>Ghi chú</th>
                            <th className='text-center'>Người xác nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payBill.length > 0 ? (
                            payBill.map((payment, index) => (
                                <tr key={payment.tradingCode}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>{payment.tradingCode}</td>
                                    <td className='text-center'>{payment.amount} VND</td>
                                    <td className='text-center'>
                                        <h6>
                                            <span className={`badge ${payment.status === 'COMPLETED' ? 'text-bg-success' :
                                                    payment.status === 'FAILED' ? 'text-bg-danger' :
                                                        payment.status === 'PENDING' ? 'text-bg-warning' :
                                                            'text-bg-secondary'
                                                }`}>
                                                {payment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                    payment.status === 'FAILED' ? 'Thất bại' :
                                                        payment.status === 'PENDING' ? 'Đang chờ' :
                                                            'Đang chờ'}
                                            </span>
                                        </h6>
                                    </td>
                                    <td className='text-center'>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                    <td className='text-center'>
                                        <h6>
                                            <span className={`badge text-bg-${payment.type === "PREPAID" ? 'success' : 'danger'}`}>
                                                {payment.type === "PREPAID" ? 'Trả trước' : 'Trả sau'}
                                            </span>
                                        </h6>
                                    </td>

                                    <td className='text-center'>{payment.methodName}</td>
                                    <td className='text-center'>{payment.note}</td>
                                    <td className='text-center'>{payment.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className='text-center'>No payment history found for this bill.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Bill Information */}
            <div className="infBill m-3">
                <div className="d-flex justify-content-between">
                    <h4>Thông tin đơn hàng: {codeBill}</h4>
                    <ModalUpdateCustomer customerData={billSummary} />  {/* Pass billSummary as customerData */}
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Trạng thái:</h5>
                            <h5><span className={`badge text-bg-${status.status1 ? 'danger' : 'success'}`}>{status.status1 ? 'PENDING' : 'CONFIRMED'}</span></h5>
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Địa chỉ:</h5>
                            <h5>{billSummary?.address || 'Address info'}</h5> {/* Update with real address data */}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Tên khách hàng:</h5>
                            <h5>{billSummary?.nameCustomer || 'Customer Name'}</h5> {/* Update with real customer name */}
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>SDT:</h5>
                            <h5>{billSummary?.phoneNumber || 'Customer Phone'}</h5> {/* Update with real phone number */}
                        </div>
                        <div className='status d-flex flex-row mb-3'>
                            <h5 className='mx-3'>Ghi chú:</h5>
                            <h5>{billSummary?.note || 'No notes available'}</h5> {/* Update with real notes */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="history-product m-3">
                <div className="d-flex justify-content-between mb-3">
                    <h4>Thông tin sản phẩm đã mua</h4>
                    <ModalUpdateProduct />
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Ảnh sản phẩm</th>
                            <th className='text-center'>Thông tin sản phẩm</th>
                            <th className='text-center'>Màu sắc</th>
                            <th className='text-center'>Số lượng</th>
                            <th className='text-center'>Tổng tiền</th>
                            <th className='text-center'>Trạng thái</th>
                            <th className='text-center'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billDetail.map((product, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{product.imageByte}</td>
                                <td className='text-center'>{product.nameProduct}</td>
                                <td className='text-center'>{product.nameColor}</td>
                                <td className='text-center'>{product.quantity}</td>
                                <td className='text-center'>{product.totalAmount}</td>
                                <td className='text-center'>
                                    <h6>
                                        <span className={`badge ${product.status === 'COMPLETED' ? 'text-bg-success' :
                                            product.status === 'CANCELLED' ? 'text-bg-danger' :
                                                product.status === 'SHIPPED' ? 'text-bg-info' :
                                                    product.status === 'PENDING' ? 'text-bg-warning' :
                                                        'text-bg-secondary'}`}>
                                            {product.status === 'COMPLETED' ? 'Thành công' :
                                                product.status === 'CANCELLED' ? 'Đã hủy' :
                                                    product.status === 'SHIPPED' ? 'Đã giao hàng' :
                                                        product.status === 'PENDING' ? 'Đang chờ' :
                                                            'Hoạt động'}
                                        </span>
                                    </h6>
                                </td>
                                <td className=' text-center'><Button variant="danger"><MdDeleteOutline /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Pagination */}
                <div className='d-flex justify-content-end'>
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(0)} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
                        {[...Array(totalPages).keys()].map(p => (
                            <Pagination.Item key={p} active={p === page} onClick={() => handlePageChange(p)}>
                                {p + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailBill;
