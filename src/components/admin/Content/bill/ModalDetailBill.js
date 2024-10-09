import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ModalDetailBill.scss';
import { AiFillBank } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Table, Pagination, Alert } from 'react-bootstrap';
import ModalUpdateCustomer from './ModalUpdateCustomer';
import ModalUpdateProduct from './ModalUpdateProduct';

const ModalDetailBill = () => {
    const { codeBill } = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [payBill, setPayBill] = useState([]);
    const [billSummary, setBillSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [status, setStatus] = useState({ status1: false, status2: false, status3: false, status4: false });

    // Helper function to format currency in VND
    const formatCurrency = (amount) => `${amount.toLocaleString('vi-VN')} VND`;

    // Function to calculate total amounts
    const totalAmount = billDetail.reduce((acc, product) => acc + product.totalAmount, 0);
    const priceDiscount = billDetail.reduce((acc, product) => acc + product.priceDiscount, 0);

    // Fetch Bill, Bill Details, and Payment Details
    const fetchBillDetailsAndPayBill = async (currentPage) => {
        setLoading(true);
        const trimmedCodeBill = codeBill?.trim();

        if (!trimmedCodeBill) {
            setError("Code bill cannot be empty.");
            setLoading(false);
            return;
        }

        try {
            const [billSummaryResponse, billResponse, payBillResponse] = await Promise.all([
                axios.get('http://localhost:8080/bill/list-bill-summaries', { params: { codeBill: trimmedCodeBill } }),
                axios.get('http://localhost:8080/bill-detail/list-bill-details', { params: { codeBill: trimmedCodeBill, page: currentPage, size: 10 } }),
                axios.get('http://localhost:8080/pay-bill/list-pay-bills', { params: { codeBill: trimmedCodeBill } }),
            ]);

            if (billSummaryResponse.data?.content.length > 0) {
                const summaryData = billSummaryResponse.data.content[0];
                setBillSummary(summaryData);
                updateStatus(summaryData.status);
            }

            setBillDetail(billResponse.data?.content || []);
            setTotalPages(billResponse.data?.totalPages || 0);
            setPayBill(payBillResponse.data?.content || []);
        } catch {
            setError("Failed to fetch bill details or payment history.");
        } finally {
            setLoading(false);
        }
    };

    // Function to update status progress based on the bill's status
    const updateStatus = (billStatus) => {
        const statusMap = {
            'PENDING': { status1: true, status2: false, status3: false, status4: false },
            'CONFIRMED': { status1: true, status2: true, status3: false, status4: false },
            'SHIPPED': { status1: true, status2: true, status3: true, status4: false },
            'COMPLETED': { status1: true, status2: true, status3: true, status4: true },
        };
        setStatus(statusMap[billStatus] || { status1: false, status2: false, status3: false, status4: false });
    };

    useEffect(() => {
        if (codeBill) {
            fetchBillDetailsAndPayBill(page);
        }
    }, [codeBill, page]);

    // Handle deleting a product from the bill
    const handleDeleteProduct = async (productCode) => {
        if (!productCode || !window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await axios.delete('http://localhost:8080/bill-detail/delete-by-product-code', { params: { productCode } });
            if (response.status === 200) {
                alert("Product deleted successfully.");
                fetchBillDetailsAndPayBill(page);
            } else {
                alert("Failed to delete the product. Please try again.");
            }
        } catch {
            alert("An error occurred while deleting the product. Please try again.");
        }
    };

    // Render table rows for bill details or payment history
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
                                    item.status === 'FAILED' ? 'text-bg-danger' : 'text-bg-warning'}`}>
                                    {item.status === 'COMPLETED' ? 'Hoàn thành' : item.status === 'FAILED' ? 'Thất bại' : 'Đang chờ'}
                                </span>
                            </td>
                            <td className='text-center'>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className='text-center'>
                                <span className={`badge text-bg-${item.type === "PREPAID" ? 'success' : 'danger'}`}>
                                    {item.type === "PREPAID" ? 'Trả trước' : 'Trả sau'}
                                </span>
                            </td>
                            <td className='text-center'>{item.namePayment}</td>
                            <td className='text-center'>{item.note}</td>
                            <td className='text-center'>{item.nameEmployee}</td>
                        </>
                    ) : (
                        <>
                            <td className='text-center'>
                                <img src={`data:image/jpeg;base64,${item.imageByte}`} alt="Product" className="product-image" />
                            </td>
                            <td className='text-center'>{item.nameProduct}</td>
                            <td className='text-center'>{item.nameColor}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>{formatCurrency(item.totalAmount)}</td>
                            <td className='text-center'>
                                <span className={`badge ${item.status === 'ACTIVE' ? 'text-bg-success' :
                                    item.status === 'CANCELLED' ? 'text-bg-danger' : 'text-bg-secondary'}`}>
                                    {item.status === 'ACTIVE' ? 'Thành công' : 'Đã hủy'}
                                </span>
                            </td>
                            <td className='text-center'>
                                <Button variant="danger" onClick={() => handleDeleteProduct(item.productCode)}>
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
                    {/* Bill Status Progress */}
                    <div className="progress-container">
                        <div className="card card-timeline px-2 border-none">
                            <ul className="bs4-order-tracking">
                                {['Chờ xác nhận', 'Xác nhận', 'Đang giao', 'Hoàn thành'].map((label, i) => (
                                    <li key={i} className={`step ${status[`status${i + 1}`] ? "active" : ""}`}>
                                        <div><AiFillBank /></div>{label}
                                    </li>
                                ))}
                            </ul>
                            <div className="bth m-3 text-center">
                                <Button 
                                    variant="primary" 
                                    className="m-3"
                                    disabled={status.status4 || !status.status3} // Disable if already completed or shipping not done
                                >
                                    Hoàn thành
                                </Button>
                                <Button 
                                    variant="danger" 
                                    className="m-3"
                                    disabled={status.status4} // Disable if already completed
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="history-pay m-3">
                        <h4>Lịch sử thanh toán</h4>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th><th>Mã giao dịch</th><th>Số tiền</th><th>Trạng thái</th><th>Thời gian</th>
                                    <th>Loại giao dịch</th><th>Phương thức thanh toán</th><th>Ghi chú</th><th>Người xác nhận</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(payBill, "payment")}</tbody>
                        </Table>
                    </div>

                    {/* Bill Summary Information */}
                    <div className="infBill m-3">
                        <div className="d-flex justify-content-between">
                            <h4>Thông tin đơn hàng: {codeBill}</h4>
                            <ModalUpdateCustomer customerData={billSummary} onUpdate={() => fetchBillDetailsAndPayBill(page)} />
                        </div>
                        {billSummary && (
                            <div className='row'>
                                <div className='col'>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Trạng thái:</h5>
                                        <h5><span className={`badge text-bg-${billSummary.status === 'PENDING' ? 'warning' : 'success'}`}>{billSummary.status}</span></h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Địa chỉ:</h5>
                                        <h5>{billSummary.address || 'Customer Address'}</h5>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Tên khách hàng:</h5>
                                        <h5>{billSummary.nameCustomer || 'Customer Name'}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>SDT:</h5>
                                        <h5>{billSummary.phoneNumber || 'No Phone Number'}</h5>
                                    </div>
                                    <div className='status d-flex flex-row mb-3'>
                                        <h5 className='mx-3'>Ghi chú:</h5>
                                        <h5>{billSummary.note || 'No notes available'}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="history-product m-3">
                        <div className="d-flex justify-content-between mb-3">
                            <h4>Thông tin sản phẩm đã mua</h4>
                            <ModalUpdateProduct onAddProductSuccess={() => fetchBillDetailsAndPayBill(page)} />
                        </div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>STT</th><th>Ảnh sản phẩm</th><th>Thông tin sản phẩm</th><th>Màu sắc</th><th>Số lượng</th>
                                    <th>Tổng tiền</th><th>Trạng thái</th><th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(billDetail, "product")}</tbody>
                        </Table>

                        {/* Pagination */}
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

                    {/* Payment Summary */}
                    <div className='moneyPay d-flex justify-content-end m-5'>
                        <div className=''>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền hàng:</h5>
                                <h5 className='text-center'>{formatCurrency(totalAmount)}</h5>
                            </div>
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Voucher giảm giá:</h5>
                                <h5 className='text-center'>{formatCurrency(priceDiscount)}</h5>
                            </div>
                            <hr />
                            <div className='status d-flex flex-row mb-3'>
                                <h5 className='mx-3'>Tổng tiền thanh toán:</h5>
                                <h5>{formatCurrency(totalAmount - priceDiscount)}</h5>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalDetailBill;
